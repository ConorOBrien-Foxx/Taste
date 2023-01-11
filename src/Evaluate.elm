module Evaluate exposing (..)

import Atom exposing (..)
import Decode exposing (..)
import Literate exposing (..)

type alias TasteState =
  { accumulator : Atom
  }

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
