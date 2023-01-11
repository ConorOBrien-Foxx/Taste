module Decode exposing (..)

-- TYPES
type TasteData
  = Zero
  | One
  | RegX
  | RegY
  | Function
  | UnknownData

type TasteOperation
  = Add
  | Subtract
  | Multiply
  | Divide
  | Modulo
  | Input
  | Equality
  | Terminate
  | UnknownOp

type TasteType
  = TasteNumeric
  | TasteFunction
  | TasteBoolean
  | TasteList
  
-- TREE
type InstructionLeaf
  = OpLeaf TasteOperation
  | DataLeaf TasteData
  | TypeLeaf TasteType

type CodeTree
  = Leaf InstructionLeaf
  | Tree (CodeTree, CodeTree)

type alias ParseState =
  { target : CodeTree
  , result : List InstructionLeaf
  , bits : List Int
  , op : TasteOperation
  , argList : List TasteType
  , typeArgs : List TasteType
  }

newParseState : CodeTree -> List Int -> ParseState
newParseState tree bits =
  { target = tree
  , result = []
  , bits = bits
  , op = UnknownOp
  , argList = []
  , typeArgs = []
  }

-- the number of ADDITIONAL arguments an operation takes
arityOf : TasteOperation -> Int
arityOf op =
  case op of
    Input -> 0
    Add -> 1
    Subtract -> 1
    Multiply -> 1
    Divide -> 1
    Modulo -> 1
    Equality -> 1
    Terminate -> 0
    UnknownOp -> 0

isDone : TasteOperation -> List TasteType -> Bool
isDone op types =
  case (op, types) of
    -- Overrides
    (Input, [ TasteFunction ]) -> False
    (Input, [ TasteFunction, _ ]) -> True
    -- Default
    _ -> arityOf op <= List.length types

-- TODO: store some states internally (e.g. registers)
getDataType : ParseState -> TasteData -> TasteType
getDataType state dat =
  case dat of
    RegX -> TasteNumeric -- TODO: variable type
    RegY -> TasteNumeric -- TODO: variable type
    Zero -> TasteNumeric
    One -> TasteNumeric
    Function -> TasteFunction
    UnknownData -> TasteNumeric -- TODO: unknown/maybe type

{-
debug message value =
  Tuple.second ( (
    Debug.log message value,
    value
  ) )
-}

decodeStep : ParseState -> ParseState
decodeStep state =
  case state.target of
    -- continue traversing down the binary tree
    Tree tree ->
      case state.bits of
        [] -> state
        head :: rest ->
          decodeStep
            { state
            | target = if head == 0
              then Tuple.first tree
              else Tuple.second tree
            , bits = rest
            }
    -- we've hit a terminal point
    Leaf leaf ->
      if leaf == OpLeaf Terminate
      then state
      else
      let
        augmented = case leaf of
          TypeLeaf _ -> state
          OpLeaf op -> { state | op = op }
          DataLeaf td -> { state | argList = state.argList ++ [ getDataType state td ] }
        
        nextState = if isDone augmented.op augmented.argList
          then
            { augmented | target = opTree, argList = [], typeArgs = [] }
          else
            { augmented | target = dataTree }
        
      in
      -- Reiterate with...
      decodeStep (
      -- Special Case: Function starts a new chain
      if leaf == DataLeaf Function
      then
        let
          subStep = decodeStep (newParseState dataTree state.bits)
        in
          { nextState
          | bits = subStep.bits
          , result = nextState.result ++ [ leaf ] ++ subStep.result ++ [ OpLeaf Terminate ]
          }
      -- Special Case: Accept Type
      else if leaf == OpLeaf Input || leaf == TypeLeaf TasteList
      then
        let
          subStep = decodeStep (newParseState typeTree state.bits)
        in
          { nextState
          | bits = subStep.bits
          , result = nextState.result ++ [ leaf ] ++ subStep.result
          }
      -- Normal Case: Append the leaf
      else
          { nextState
          | result = nextState.result ++ [ leaf ]
          }
      )

decode : List Int -> List InstructionLeaf
decode bits =
  newParseState dataTree bits
  |> decodeStep
  |> .result

-- TREE DATA
typeTree : CodeTree
typeTree =
  Tree (
    --0
    Leaf (TypeLeaf TasteNumeric),
    --1
    Tree (
      --10
      Leaf (TypeLeaf TasteList),
      --11
      Tree (
        --110
        Leaf (TypeLeaf TasteFunction),
        --111
        Leaf (TypeLeaf TasteBoolean)
      )
    )
  )

opTree : CodeTree
opTree =
  Tree (
    --0
    Tree (
      --00
      Leaf (OpLeaf Input),
      --01
      Tree (
        --010
        Leaf (OpLeaf Add),
        --011
        Leaf (OpLeaf Terminate)
      )
    ),
    --1
    Tree (
      --10
      Tree (
        --100
        Leaf (OpLeaf Multiply),
        --101
        Tree (
          --1010
          Leaf (OpLeaf Divide),
          --1011
          Leaf (OpLeaf UnknownOp)
        )
      ),
      --11
      Tree (
        --110
        Leaf (OpLeaf Modulo),
        --111
        Tree (
          --1110
          Leaf (OpLeaf Equality),
          --1111
          Leaf (OpLeaf UnknownOp)
        )
      )
    )
  )

dataTree : CodeTree
dataTree =
  Tree (
    --0
    Tree (
      --00
      Leaf (DataLeaf RegX),
      --01
      Leaf (DataLeaf RegY)
    ),
    --1
    Tree (
      --10
      Leaf (DataLeaf Function),
      --11
      Tree (
        --110
        Tree (
          --1100
          Leaf (DataLeaf Zero),
          --1101
          Leaf (DataLeaf One)
        ),
        --111
        Leaf (DataLeaf UnknownData)
      )
    )
  )