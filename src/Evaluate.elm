module Evaluate exposing (..)

import Atom exposing (..)
import Decode exposing (..)
import Literate exposing (Token)
import CodeTree exposing (invertInstruction)
import Types exposing (..)
import Util

type alias TasteState =
  { stack : List Atom
  , typeStack : List TasteType
  , input : String
  , x : Atom
  , y : Atom
  }

defaultState : String -> TasteState
defaultState input =
  { stack = []
  , typeStack = []
  , input = input
  , x = TypeInteger 0
  , y = TypeInteger 100
  }

-- permutes into stack-friendly order
type alias PermuteState =
  { focusOp : Maybe TasteOperation
  , needsType : Maybe InstructionLeaf
  , build : List InstructionLeaf
  , leaves : List InstructionLeaf
  }

permuteHelper : PermuteState -> PermuteState
permuteHelper state =
  case state.leaves of
    [] -> case (state.focusOp, state.needsType) of
      (Just x, Just y) -> { state | build = state.build ++ [ y, OpLeaf x ], needsType = Nothing }
      (Just x, Nothing) -> { state | build = state.build ++ [ OpLeaf x ] }
      (Nothing, Just y) -> { state | build = state.build ++ [ y ], needsType = Nothing }
      (Nothing, Nothing) -> state
    ins :: rest ->
      if ins == OpLeaf Terminate then
        -- TODO: terminate may leave trailing needsType
        let
          nextState = permuteHelper { state | leaves = [] }
        in
        { nextState | leaves = rest }
      else
      let
        stateRest = case state.needsType of
          Just typeIns ->
            case ins of
              TypeLeaf _ -> { state | leaves = rest }
              _ -> { state | leaves = rest, build = state.build ++ [ typeIns ], needsType = Nothing }
          Nothing -> { state | leaves = rest }
        nextState = case ins of
          OpLeaf op -> case stateRest.focusOp of
            Just x ->  { stateRest | focusOp = Just op, build = stateRest.build ++ [ OpLeaf x ] }
            Nothing -> { stateRest | focusOp = Just op }
          DataLeaf Input -> { stateRest | needsType = Just ins }
          DataLeaf Function ->
            let
              subState = permuteHelper { focusOp = Nothing, needsType = Nothing, build = [], leaves = rest }
            in
            { stateRest
            | build = stateRest.build ++ [ ins ] ++ subState.build ++ [ OpLeaf Terminate ]
            , leaves = subState.leaves
            }
          _ -> { stateRest | build = stateRest.build ++ [ ins ] }
      in
      permuteHelper nextState

permute : List InstructionLeaf -> List InstructionLeaf
permute leaves =
  permuteHelper { focusOp = Nothing, needsType = Nothing, build = [], leaves = leaves }
  |> .build


newStateWithX : TasteState -> Atom -> TasteState
newStateWithX state x =
  { stack = [], typeStack = [], input = state.input, x = x, y = state.y }

newStateWithXY : TasteState -> Atom -> Atom -> TasteState
newStateWithXY state x y =
  { stack = [], typeStack = [], input = state.input, x = x, y = y }

atomHead : List Atom -> Atom
atomHead stack =
  case stack of
    [] -> Error "Function evaluated to empty stack"
    a :: _ -> a

evaluateAt : List InstructionLeaf -> TasteState -> Atom -> (TasteState, Atom)
evaluateAt fn state el =
  newStateWithX state el |> evaluateToAtom fn

evaluateAt2 : List InstructionLeaf -> TasteState -> Atom -> Atom -> (TasteState, Atom)
evaluateAt2 fn state x y =
  newStateWithXY state x y |> evaluateToAtom fn

evaluateToAtom : List InstructionLeaf -> TasteState -> (TasteState, Atom)
evaluateToAtom fn state = 
  let
    nextState = evaluateStep fn state
  in
  (nextState, atomHead nextState.stack)

pushType : TasteType -> TasteState -> TasteState
pushType tasteType state =
  { state
  | typeStack = [ tasteType ] ++ state.typeStack
  }

-- TODO: finish
popType : TasteState -> (Maybe TasteType, TasteState)
popType state =
  let
    (tasteType, typeStack) = case state.typeStack of
      [] -> (Nothing, state.typeStack)
      TasteList :: rest -> (Nothing, state.typeStack)
      head :: rest -> (Just head, rest)
  in
  Util.debug "popped:" (tasteType, { state | typeStack = typeStack })

parseInput : TasteType -> String -> (Atom, String)
parseInput tasteType input =
  case Util.debug "input type:" tasteType of
    TasteNumeric ->
      let (digits, mid, rest) = Util.splitWhereString (not << Char.isDigit) input
      in
      ( TypeInteger (digits |> String.toInt |> Maybe.withDefault 0)
      , String.trimLeft (mid ++ rest)
      )
    TasteString ->
      let (line, mid, rest) = Util.splitWhereString (\ch -> ch == '\n') input
      in
      ( TypeString line
      , rest
      )
    -- TODO
    -- TasteList -> ...
    _ -> (Error "could not parse input", input)

evaluateInstruction : TasteState -> InstructionLeaf -> TasteState
evaluateInstruction state op =
  case op of
    TypeLeaf typ  -> pushType typ state
    DataLeaf Zero  -> { state | stack = [ TypeInteger  0 ] ++ state.stack }
    DataLeaf One   -> { state | stack = [ TypeInteger  1 ] ++ state.stack }
    DataLeaf Two   -> { state | stack = [ TypeInteger  2 ] ++ state.stack }
    DataLeaf Three -> { state | stack = [ TypeInteger  3 ] ++ state.stack }
    DataLeaf Four  -> { state | stack = [ TypeInteger  4 ] ++ state.stack }
    DataLeaf Five  -> { state | stack = [ TypeInteger  5 ] ++ state.stack }
    DataLeaf Ten   -> { state | stack = [ TypeInteger 10 ] ++ state.stack }
    DataLeaf RegX  -> { state | stack = [ state.x ] ++ state.stack }
    DataLeaf RegY  -> { state | stack = [ state.y ] ++ state.stack }
    DataLeaf Input ->
      let
        (tasteType, nextState) = popType state
        finalType = Maybe.withDefault TasteNumeric tasteType
        (element, nextInput) = parseInput finalType nextState.input
      in
        { nextState
        | input = nextInput
        , stack = [ element ] ++ state.stack
        }
    OpLeaf Add ->
      let
        (nextState, nextStack) = case state.stack of
          [] ->
            (state, [])
          Error a :: rest ->
            (state, state.stack)
          [a] ->
            (state, [ Error "Insufficient Arguments" ])
          TypeInteger b :: TypeInteger a :: rest ->
            (state, [ TypeInteger (a + b) ] ++ rest)
          TypeString b :: TypeString a :: rest ->
            (state, [ TypeString (a ++ b) ] ++ rest)
          -- map
          TypeFunction fn :: TypeList v :: rest ->
            let
              (returnState, mapped) = List.foldl
                (\el (inner, build) ->
                  let (nextInner, atom) = evaluateAt fn inner el
                  in (nextInner, build ++ [ atom ])
                )
                (state, [])
                v
            in
            (returnState, [ TypeList mapped ] ++ rest)
          -- append
          any :: TypeList arr :: rest ->
            (state, [ TypeList (arr ++ [ any ]) ] ++ rest)
          b :: a :: rest ->
            (state, [ Error "Unrecognized Types (Add)" ] ++ rest)
      in
        { nextState
        | stack = nextStack
        }
    OpLeaf Multiply ->
      { state
      | stack = case state.stack of
        [] -> []
        Error a :: rest -> state.stack
        [a] -> [ Error "Insufficient Arguments" ]
        -- TypeFunction fn :: TypeInteger n :: rest ->
          -- let
            -- mapped = n - 1
              -- |> List.range 0
              -- |> List.map TypeInteger
              -- |> List.map (evaluateAt fn state)
          -- in [ TypeList mapped ] ++ rest
        TypeInteger b :: TypeInteger a :: rest ->
          [ TypeInteger (a * b) ] ++ rest
        b :: a :: rest -> [ Error "Unrecognized Types (Multiply)" ] ++ rest
      }
    OpLeaf Divide ->
      { state
      | stack = case state.stack of
        [] -> []
        Error a :: rest -> state.stack
        [a] -> [ Error "Insufficient Arguments" ]
        TypeInteger b :: TypeInteger a :: rest ->
          -- TODO: Regular float division and auto casting arguments.
          [ TypeInteger (a // b) ] ++ rest
        -- TypeFunction fn :: TypeList v :: rest ->
          -- -- TODO: seed
          -- let folded = List.foldl (evaluateAt2 fn state) (TypeInteger 0) v
          -- in [ folded ] ++ rest
        b :: a :: rest -> [ Error "Unrecognized Types (Divide)" ] ++ rest
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
readFunction : List InstructionLeaf -> (List InstructionLeaf, List InstructionLeaf, List InstructionLeaf)
readFunction =
  Util.splitWhereMap
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
        (fn, term, next) = readFunction rest
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
    |> (\x -> (x, x))
    |> Tuple.mapFirst (
      List.map CodeTree.invertInstruction
      >> List.map (List.map Debug.toString >> String.join "")
      >> String.join "│"
      >> (\x -> x
        ++ " (" ++ String.fromInt (String.length x) ++ " bits, "
        ++ String.fromFloat (toFloat (String.length x) / 8.0) ++ " bytes)")
      )
    |> Tuple.mapSecond (\x -> x
      |> List.concatMap CodeTree.invertInstruction
      |> Util.debug "Before decode\n"
      |> Decode.decode
      |> Util.debug "Before permute\n"
      |> permute
      |> Util.debug "Before evaluation\n"
      |> (\tokens -> evaluateStep tokens (defaultState input))
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
