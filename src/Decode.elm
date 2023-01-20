module Decode exposing (..)

import Types exposing (..)
import CodeTree exposing (..)
import Util exposing (lastElement)

type alias ParseState =
  { target : CodeTree
  , result : List InstructionLeaf
  , bits : List Int
  , op : TasteOperation
  , argList : List TasteType
  , typeStack : List TasteType
  }

newParseState : CodeTree -> List Int -> ParseState
newParseState tree bits =
  { target = tree
  , result = []
  , bits = bits
  , op = BaseOperation
  , argList = []
  , typeStack = []
  }

-- the number of TOTAL arguments an operation takes
arityOf : TasteOperation -> Int
arityOf op =
  case op of
    Range -> 1
    Add -> 2
    Subtract -> 2
    Multiply -> 2
    Divide -> 2
    Modulo -> 2
    Separator -> 2
    Cast -> 1
    Equality -> 2
    SaveY -> 1
    SaveZ -> 1
    BaseOperation -> 1
    Terminate -> 0
    UnknownOp -> 0

isDone : TasteOperation -> List TasteType -> Bool
isDone op types =
  case (op, types) of
    -- Overrides
    -- (Input, [ TasteFunction ]) -> False
    -- (Input, [ TasteFunction, _ ]) -> True
    -- Default
    _ ->
      let currentArity = List.length ( Util.debug "Check if done (types)" types )
      in currentArity == arityOf op

returnType : TasteOperation -> List TasteType -> TasteType
returnType op types =
  -- TODO: fill
  case (op, types) of
    (BaseOperation, [ x ]) -> x
    -- TODO: get return type of inner function???
    (Multiply, [ TasteNumeric, TasteFunction ]) -> TasteList TasteNumeric
    _ -> TasteNumeric

-- TODO: store some states internally (e.g. registers)
getDataType : ParseState -> TasteData -> TasteType
getDataType state dat =
  case dat of
    RegX -> TasteNumeric -- TODO: variable type
    RegY -> TasteNumeric -- TODO: variable type
    RegZ -> TasteNumeric -- TODO: variable type
    Zero -> TasteNumeric
    One -> TasteNumeric
    Two -> TasteNumeric
    Three -> TasteNumeric
    Four -> TasteNumeric
    Five -> TasteNumeric
    Ten -> TasteNumeric
    Function -> TasteFunction
    Context -> TasteNumeric -- TOOD: variable type
    Operator -> TasteFunction
    VectorOperator -> TasteFunction
    Input ->
      state.typeStack
      |> Util.lastElement
      |> Maybe.withDefault TasteNumeric
    UnknownData -> TasteNumeric -- TODO: unknown/maybe type

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
    Leaf (OpLeaf Terminate) -> state
    Leaf (TypeLeaf tasteType) ->
      case Util.debug "@##@#@#@# leaf taste type" tasteType of
        TasteListSignal ->
          let
            subStep = decodeStep (newParseState typeTree state.bits)
            subType = case subStep.result of
              (TypeLeaf a) :: rest -> a
              _ -> TasteNumeric
          in
            { state
            | bits = subStep.bits
            , result = state.result ++ [ TypeLeaf (TasteList subType) ]
            -- , argList = argList
            }
        _ ->
          { state
          | typeStack = state.typeStack ++ [ tasteType ]
          , result = state.result ++ [ TypeLeaf tasteType ]
          }
    Leaf leaf ->
      let
        augmented = case Util.debug "leaf" leaf of
          TypeLeaf _ -> state -- handled above
          OpLeaf op -> { state | op = op }
          DataLeaf td -> { state | argList = state.argList ++ [ getDataType state td ] }
        
        nextState = if isDone augmented.op (Util.debug "-- arg list --" augmented.argList)
          then
            { augmented
            | target = opTree
            , argList = [ returnType augmented.op augmented.argList ]
            , typeStack = []
            }
          else
            { augmented | target = dataTree }
        
      in
      -- Reiterate with...
      decodeStep (
      -- Special Case: Function starts a new chain
      if leaf == DataLeaf Function || leaf == DataLeaf Context
      then
        let
          subStep = 
            let a = Util.debug "before function sub-step" 0
            in Util.debug "function sub-step!!!!" (decodeStep (newParseState dataTree state.bits))
        in
          { nextState
          | bits = subStep.bits
          , result = nextState.result ++ [ leaf ] ++ subStep.result ++ [ OpLeaf Terminate ]
          }
      -- Special Case: Accept Type
      else if leaf == DataLeaf Input || leaf == OpLeaf Cast
      then
        let
          subStep = decodeStep (newParseState typeTree state.bits)
        in
          { nextState
          | bits = subStep.bits
          , result = nextState.result ++ [ leaf ] ++ subStep.result
          , argList =
            (Util.dropLast 1 nextState.argList) ++
            List.filterMap
              (\x -> case x of
                TypeLeaf tasteType -> Just tasteType
                _ -> Nothing
              )
              subStep.result
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
