module Taste exposing (..)

import Dict exposing (Dict)

-- ATOM TYPE

type Atom
  = TypeInteger Int
  | TypeFloat Float
  | TypeBoolean Bool
  | TypeString String
  | TypeList (List Atom)
  | Error

pair : Atom -> Atom -> List Atom
pair a b = [ a, b ]

atomToString : Atom -> String
atomToString atom =
  case atom of
    TypeInteger i ->
      String.fromInt i
    
    TypeFloat f ->
      String.fromFloat f
      
    TypeBoolean b ->
      if b then "true" else "false"
    
    TypeString s ->
      s
    
    TypeList l ->
      List.map atomToString l
        |> String.join " "
    
    Error ->
      "err"

-- TOKENIZE

type alias Token =
  { raw : String
  , op : TasteOperation
  }

getOperation : String -> TasteOperation
getOperation op =
  case op of
    "+" -> Add
    "-" -> Subtract
    _ -> UnknownOp

tokenize : String -> List Token
tokenize code =
  code
    |> String.toList
    |> List.map String.fromChar
    |> List.map (\x -> { raw = x, op = getOperation x })

-- TREE

type InstructionLeaf
  = OpLeaf TasteOperation
  | DataLeaf TasteData
  | TypeLeaf TasteType

type CodeTree
  = Leaf InstructionLeaf
  | Tree (CodeTree, CodeTree)

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

type alias ParseState =
  { arity : Int
  , target : CodeTree
  , result : List InstructionLeaf
  , bits : List Int
  }

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
        nextState = case leaf of
          OpLeaf op ->
            -- propagate arity
            let
              nextArity = arityOf op
            in
            { state
            | target = if nextArity == 0 then opTree else dataTree
            , arity = nextArity
            }
          DataLeaf td -> 
            -- subtract arity
            { state
            | target = if state.arity == 1 then opTree else dataTree
            , arity = state.arity - 1
            }
          TypeLeaf tasteType ->
            -- continue
            { state | target = dataTree }
      in
      decodeStep (
      if leaf == DataLeaf Function
      then
        let
          subStep = decodeStep {
            arity = 1, target = dataTree, result = [], bits = state.bits
            }
        in
          { nextState
          | bits = subStep.bits
          , result = nextState.result ++ [ leaf ] ++ subStep.result ++ [ OpLeaf Terminate ]
          }
      else
          { nextState
          | result = nextState.result ++ [ leaf ]
          }
      )
      

decode : List Int -> List InstructionLeaf
decode bits =
  decodeStep { arity = 1, target = dataTree, result = [], bits = bits }
  |> .result

-- EVALUATE

type alias TasteState =
  { accumulator : Atom
  }

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

performOperation : TasteState -> TasteOperation -> TasteState
performOperation state op =
  case op of
    Add -> { state | accumulator = TypeInteger 5 }
    Subtract -> { state | accumulator = TypeInteger 3 }
    UnknownOp -> state
    _ -> state

evaluateStep : List Token -> String -> TasteState -> TasteState
evaluateStep tokens input state =
  case tokens of
    [] -> state
    op :: rest ->
      performOperation state op.op
        |> evaluateStep rest input

evaluate : String -> String -> String
evaluate code input =
  code
    |> String.toList
    |> List.map String.fromChar
    |> List.filter (\x -> x == "0" || x == "1" )
    |> List.map ((Maybe.withDefault 0) << String.toInt)
    |> decode
    |> List.map Debug.toString
    |> String.join "\n"
    -- |> List.map (\x -> "\"" ++ x ++ "\"")
    -- |> String.join " "
{-
evaluate : String -> String -> String
evaluate code input =
  let
    startState =
      { accumulator = TypeInteger 0
      }
    
    tokens = tokenize code
  in
  evaluateStep tokens input startState
    |> .accumulator
    |> atomToString
-}
