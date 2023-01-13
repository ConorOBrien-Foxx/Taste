module Evaluate exposing (..)

import Atom exposing (..)
import Decode exposing (..)
import Literate exposing (Token)
import CodeTree exposing (invertInstruction)
import Types exposing (..)

type alias TasteState =
  { accumulator : Atom
  }

-- permutes into stack-friendly order
type alias PermuteState =
  { focusOp : Maybe TasteOperation
  , build : List InstructionLeaf
  , leaves : List InstructionLeaf
  }

-- TODO: maintain function order
permuteHelper : PermuteState -> PermuteState
permuteHelper state =
  case state.leaves of
    [] -> case state.focusOp of
      Just x -> { state | build = state.build ++ [ OpLeaf x ] }
      Nothing -> state
    ins :: rest ->
      if ins == OpLeaf Terminate then
        let
          nextState = permuteHelper { state | leaves = [] }
        in
        { nextState | leaves = rest }
      else
      let
        nextState = case ins of
          OpLeaf op -> case state.focusOp of
            Just x ->  { state | focusOp = Just op, leaves = rest, build = state.build ++ [ OpLeaf x ] }
            Nothing -> { state | focusOp = Just op, leaves = rest }
          DataLeaf Function ->
            let
              subState = permuteHelper { focusOp = Nothing, build = [], leaves = rest }
            in
            { state
            | build = state.build ++ [ ins ] ++ subState.build ++ [ OpLeaf Terminate ]
            , leaves = subState.leaves
            }
          _ -> { state | build = state.build ++ [ ins ], leaves = rest }
      in
      permuteHelper nextState

permute : List InstructionLeaf -> List InstructionLeaf
permute leaves =
  permuteHelper { focusOp = Nothing, build = [], leaves = leaves }
  |> .build

evaluateInstruction : TasteState -> InstructionLeaf -> TasteState
evaluateInstruction state op =
  case op of
    OpLeaf Add -> { state | accumulator = TypeInteger 5 }
    OpLeaf Subtract -> { state | accumulator = TypeInteger 3 }
    -- UnknownOp -> state
    _ -> state

evaluateStep : List Token -> String -> TasteState -> TasteState
evaluateStep tokens input state =
  case tokens of
    [] -> state
    op :: rest ->
      evaluateInstruction state op.ins
        |> evaluateStep rest input

evaluate : String -> String -> String
evaluate code input =
  code
    |> Literate.tokenize
    |> List.filter (\x -> x.raw /= " ")
    |> List.map .ins
    |> List.concatMap CodeTree.invertInstruction
    |> (\x -> (x, Decode.decode x))
    |> Tuple.mapFirst (
      List.map Debug.toString
      >> String.join ""
      >> (\x -> x ++ " (" ++ String.fromInt (String.length x) ++ " bits)")
      )
    |> Tuple.mapSecond (
      permute
      >> List.map Debug.toString
      >> String.join "\n"
    )
    |> (\x -> Tuple.first x ++ "\n-------\n" ++ Tuple.second x)
    -- |> tuplemap2 (List.map Debug.toString)
    -- |> String.toList
    -- |> List.map String.fromChar
    -- |> List.filter (\x -> x == "0" || x == "1" )
    -- |> List.map ((Maybe.withDefault 0) << String.toInt)
    -- |> decode
    -- |> List.map Debug.toString
    -- |> String.join "\n"
    
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
