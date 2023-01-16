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
    Range -> 0
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
    -- (Input, [ TasteFunction ]) -> False
    -- (Input, [ TasteFunction, _ ]) -> True
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
    Two -> TasteNumeric
    Three -> TasteNumeric
    Four -> TasteNumeric
    Five -> TasteNumeric
    Ten -> TasteNumeric
    Function -> TasteFunction
    Input ->
      state.typeArgs
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
      -- TODO: handle recursive types
      { state
      | typeArgs = state.typeArgs ++ [ tasteType ]
      , result = state.result ++ [ TypeLeaf tasteType ]
      }
    Leaf leaf ->
      let
        augmented = case leaf of
          TypeLeaf _ -> state -- handled above
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
          subStep = 
            let a = Util.debug "before function sub-step" 0
            in Util.debug "function sub-step!!!!" (decodeStep (newParseState dataTree state.bits))
        in
          { nextState
          | bits = subStep.bits
          , result = nextState.result ++ [ leaf ] ++ subStep.result ++ [ OpLeaf Terminate ]
          }
      -- Special Case: Accept Type
      else if leaf == DataLeaf Input
      then
        let
          subStep = decodeStep (newParseState typeTree state.bits)
        in
          { nextState
          | bits = subStep.bits
          , result = nextState.result ++ [ leaf ] ++ subStep.result
          , argList = if leaf == DataLeaf Input
            then
              (Util.dropLast 1 nextState.argList) ++
              List.filterMap
                (\x -> case x of
                  TypeLeaf tasteType -> Just tasteType
                  _ -> Nothing
                )
                subStep.result
            else
              nextState.argList
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
