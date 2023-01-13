module Evaluate exposing (..)

import Atom exposing (..)
import Decode exposing (..)
import Literate exposing (Token)
import CodeTree exposing (invertInstruction)
import Types exposing (..)
import Util

type alias TasteState =
  { stack : List Atom
  , input : String
  , x : Atom
  , y : Atom
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
    DataLeaf Zero  -> { state | stack = [ TypeInteger  0 ] ++ state.stack }
    DataLeaf One   -> { state | stack = [ TypeInteger  1 ] ++ state.stack }
    DataLeaf Two   -> { state | stack = [ TypeInteger  2 ] ++ state.stack }
    DataLeaf Three -> { state | stack = [ TypeInteger  3 ] ++ state.stack }
    DataLeaf Four  -> { state | stack = [ TypeInteger  4 ] ++ state.stack }
    DataLeaf Five  -> { state | stack = [ TypeInteger  5 ] ++ state.stack }
    DataLeaf Ten   -> { state | stack = [ TypeInteger 10 ] ++ state.stack }
    DataLeaf RegX  -> { state | stack = [ state.x ] ++ state.stack }
    DataLeaf RegY  -> { state | stack = [ state.y ] ++ state.stack }
    OpLeaf Add ->
      { state
      | stack = case state.stack of
        [] -> []
        Error a :: rest -> state.stack
        [a] -> [ Error "Insufficient Arguments" ]
        TypeInteger b :: TypeInteger a :: rest ->
          [ TypeInteger (a + b) ] ++ rest
        TypeFunction fn :: TypeList v :: rest ->
          let
            mapped = List.map
              (\el ->
                let
                  step = evaluateStep fn { stack = [], input = state.input, x = el, y = state.y }
                in
                case step.stack of
                  [] -> Error "Evaluated to empty stack (Map)"
                  a :: _ -> a
              )
              v
          in
          [ TypeList mapped ] ++ rest
        a :: b :: rest -> [ Error "Unrecognized Types (Add)" ] ++ rest
      }
    OpLeaf Multiply ->
      { state
      | stack = case state.stack of
        [] -> []
        Error a :: rest -> state.stack
        [a] -> [ Error "Insufficient Arguments" ]
        TypeInteger a :: TypeInteger b :: rest ->
          [ TypeInteger (b * a) ] ++ rest
        a :: b :: rest -> [ Error "Unrecognized Types (Multiply)" ] ++ rest
      }
    OpLeaf Range ->
      { state
      | stack = case state.stack of
        [] -> []
        Error a :: rest -> state.stack
        TypeInteger a :: rest ->
          [ TypeList (List.map TypeInteger (List.range 0 a)) ] ++ rest
        a :: rest -> [ Error "Unrecognized Type (Range)" ] ++ rest
      }
    -- UnknownOp -> state
    _ -> { state | stack = [ Error ("Unrecognized operator " ++ Debug.toString op) ] ++ state.stack }

-- takes a list of instructions starting with the first character in the body
readFunction : List InstructionLeaf -> (List InstructionLeaf, List InstructionLeaf)
readFunction =
  Util.splitWhere
    (\depth -> depth == 0)
    (\op depth -> case op of
      DataLeaf Function -> depth + 1
      OpLeaf Terminate -> depth - 1
      _ -> depth
      )
    1

evaluateStep : List InstructionLeaf -> TasteState -> TasteState
evaluateStep ops state =
  case ops of
    [] -> state
    DataLeaf Function :: rest ->
      let
        (baseFn, next) = Util.debug "rfn" (readFunction rest)
        -- exclude Termination character
        fn = Util.dropLast 1 baseFn
      in
      evaluateStep next { state | stack = [ TypeFunction fn ] ++ state.stack }
    op :: rest ->
      evaluateInstruction state op
        |> evaluateStep rest

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
      >> (\x -> x
        ++ " (" ++ String.fromInt (String.length x) ++ " bits, "
        ++ String.fromFloat (toFloat (String.length x) / 8.0) ++ " bytes)")
      )
    |> Tuple.mapSecond (\x -> x
      |> permute
      |> (\tokens -> evaluateStep tokens { stack = [], input = input, x = TypeInteger 0, y = TypeInteger 100 })
      |> .stack
      |> List.map (\y -> atomToString y ++ "\n" ++ Debug.toString y)
      |> String.join "\n--------------\n")
    |> (\x -> Tuple.first x ++ "\n==============\n" ++ Tuple.second x)
    {-
    |> Tuple.mapSecond (
      permute
      >> List.map Debug.toString
      >> String.join "\n"
    )
    -}
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
