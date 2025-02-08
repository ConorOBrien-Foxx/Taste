module Evaluate exposing (..)

import Atom exposing (..)
import Decode exposing (..)
import Literate exposing (..)
import CodeTree exposing (..)
import Types exposing (..)
import Util

type alias TasteState =
  { stack : List Atom
  , typeStack : List TasteType
  , input : String
  , x : Atom
  , y : Atom
  , z : Atom
  }

defaultState : String -> TasteState
defaultState input =
  { stack = []
  , typeStack = []
  , input = input
  , x = TypeInteger 0
  , y = TypeInteger 1
  , z = TypeInteger 0
  }

-- permutes into stack-friendly order
type alias PermuteState =
  { focusOp : Maybe TasteOperation
  , needsType : Maybe InstructionLeaf
  , build : List InstructionLeaf
  , leaves : List InstructionLeaf
  }

subStepPermute : InstructionLeaf -> List InstructionLeaf -> PermuteState -> PermuteState
subStepPermute ins rest stateRest =
  let
    subState = permuteHelper { focusOp = Nothing, needsType = Nothing, build = [], leaves = rest }
  in
  { stateRest
  | build = stateRest.build ++ ins :: subState.build ++ [ OpLeaf Terminate ]
  , leaves = subState.leaves
  }

permuteHelper : PermuteState -> PermuteState
permuteHelper state =
  case (Util.debug "---------------------\nPERMUTE HELPER STATE\n\n" state) |> .leaves of
    [] -> case (state.focusOp, state.needsType) of
      (Just x, Just (OpLeaf y)) -> { state | build = state.build ++ [ OpLeaf x, OpLeaf y ], needsType = Nothing }
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
          DataLeaf Input -> { stateRest | needsType = Just ins }
          DataLeaf Function -> subStepPermute ins rest stateRest
          DataLeaf Context -> subStepPermute ins rest stateRest
          OpLeaf Cast -> case stateRest.focusOp of
            Just x ->
              { stateRest
              | needsType = Just ins
              , focusOp = Nothing
              , build = stateRest.build ++ [ OpLeaf x ]
              }
            Nothing -> { stateRest | needsType = Just ins }
          OpLeaf op -> case stateRest.focusOp of
            Just x ->  { stateRest | focusOp = Just op, build = stateRest.build ++ [ OpLeaf x ] }
            Nothing -> { stateRest | focusOp = Just op }
          _ -> { stateRest | build = stateRest.build ++ [ ins ] }
      in
      permuteHelper nextState

permute : List InstructionLeaf -> List InstructionLeaf
permute leaves =
  permuteHelper { focusOp = Nothing, needsType = Nothing, build = [], leaves = leaves }
  |> .build


newStateWithX : TasteState -> Atom -> TasteState
newStateWithX state x =
  { stack = [], typeStack = [], input = state.input, x = x, y = state.y, z = state.z }

newStateWithXY : TasteState -> Atom -> Atom -> TasteState
newStateWithXY state x y =
  { stack = [], typeStack = [], input = state.input, x = x, y = y, z = state.z }

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


transformDepth : InstructionLeaf -> Int -> Int
transformDepth op depth =
  case op of
    DataLeaf Function -> depth + 1
    DataLeaf Context -> depth + 1
    OpLeaf Terminate -> depth - 1
    _ -> depth

-- takes a list of instructions starting with the first character in the body
readBalanced : List InstructionLeaf -> (List InstructionLeaf, List InstructionLeaf, List InstructionLeaf)
readBalanced =
  Util.splitWhereMap
    ((==) 0)
    transformDepth
    1 -- initial depth

evaluateStep : List InstructionLeaf -> TasteState -> TasteState
evaluateStep ops state =
  case ops of
    [] -> state
    DataLeaf Function :: rest ->
      let
        (fn, _, next) = readBalanced rest
      in
      evaluateStep next { state | stack = TypeFunction fn :: state.stack }
    DataLeaf Context :: rest ->
      let
        (fn, _, next) = readBalanced rest
        innerState = evaluateStep fn state
      in
      evaluateStep next { innerState | stack = innerState.stack }
    op :: rest ->
      evaluateInstruction state op
        |> evaluateStep rest

evaluateToAtom : List InstructionLeaf -> TasteState -> (TasteState, Atom)
evaluateToAtom fn state = 
  let
    nextState = evaluateStep fn state
  in
  (nextState, atomHead nextState.stack)

pushType : TasteType -> TasteState -> TasteState
pushType tasteType state =
  { state
  | typeStack = tasteType :: state.typeStack
  }

popType : TasteState -> (Maybe TasteType, TasteState)
popType state =
  let
    (tasteType, typeStack) = case state.typeStack of
      [] -> (Nothing, state.typeStack)
      head :: rest -> (Just head, rest)
  in
  Util.debug "popped:" (tasteType, { state | typeStack = typeStack })

inputError : String -> (Atom, String)
inputError input =
  (Error "could not parse input", input)

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
      let (line, _, rest) = Util.splitWhereString (\ch -> ch == '\n') input
      in
      ( TypeString line
      , rest
      )
    -- TODO: other list types
    TasteList (TasteNumeric) ->
      let
        (line, _, rest) = Util.splitWhereString (\ch -> ch == '\n') input
        nums = line
          |> String.split " "
          |> List.filterMap String.toInt
          |> List.map TypeInteger
          |> TypeList
      in
      (nums, rest)
    _ -> inputError input

stateMap : List InstructionLeaf -> TasteState -> List Atom -> (TasteState, List Atom)
stateMap fn state =
  List.foldl
    (\el (inner, build) ->
      let (nextInner, atom) = evaluateAt fn inner el
      in (nextInner, build ++ [ atom ])
    )
    (state, [])

stateFoldl : List InstructionLeaf -> TasteState -> Atom -> List Atom -> (TasteState, Atom)
stateFoldl fn state seed vec =
  let
    (trueSeed, trueList) = case vec of
      head :: rest -> (head, rest)
      _ -> (seed, vec)
  in
    List.foldl
      (\el (inner, folding) ->
        let (nextInner, atom) = evaluateAt2 fn inner folding el
        in (nextInner, atom)
      )
      (state, trueSeed)
      trueList

applyStack : (TasteState, List Atom) -> TasteState
applyStack (state, stack) =
  { state | stack = stack }

mismatchError : String -> List Atom -> Atom
mismatchError op operands =
  Error (
    "Error { Mismatched types for " ++ op ++ ": "
    ++ (String.join "; " <| List.map atomToString operands)
    ++ "}"
  )

evaluateInstruction : TasteState -> InstructionLeaf -> TasteState
evaluateInstruction state op =
  case op of
    TypeLeaf typ  -> pushType typ state
    DataLeaf Zero  -> { state | stack = TypeInteger  0 :: state.stack }
    DataLeaf One   -> { state | stack = TypeInteger  1 :: state.stack }
    DataLeaf Two   -> { state | stack = TypeInteger  2 :: state.stack }
    DataLeaf Three -> { state | stack = TypeInteger  3 :: state.stack }
    DataLeaf Four  -> { state | stack = TypeInteger  4 :: state.stack }
    DataLeaf Five  -> { state | stack = TypeInteger  5 :: state.stack }
    DataLeaf Ten   -> { state | stack = TypeInteger 10 :: state.stack }
    DataLeaf RegX  -> { state | stack = state.x :: state.stack }
    DataLeaf RegY  -> { state | stack = state.y :: state.stack }
    DataLeaf RegZ  -> { state | stack = state.z :: state.stack }
    DataLeaf Input ->
      let
        (tasteType, nextState) = popType state
        finalType = Maybe.withDefault TasteNumeric tasteType
        (element, nextInput) = parseInput finalType nextState.input
      in
      { nextState
      | input = nextInput
      , stack = element :: state.stack
      }
    OpLeaf Cast ->
      let
        (tasteType, nextState) = popType state
        finalType = Maybe.withDefault TasteNumeric tasteType
      in
      case nextState.stack of
        [] -> nextState
        a :: rest ->
          { nextState
          | stack = convertTo finalType a :: rest
          }
    OpLeaf SaveY ->
      case state.stack of
        [] -> state
        a :: _ -> { state | y = a }
    OpLeaf SaveZ ->
      case state.stack of
        [] -> state
        a :: _ -> { state | z = a }
    OpLeaf Add ->
      applyStack <| case state.stack of
        [] ->
          (state, [])
        Error _ :: _ ->
          (state, state.stack)
        [_] ->
          (state, [ Error "Insufficient Arguments" ])
        TypeInteger b :: TypeInteger a :: rest ->
          (state, TypeInteger (a + b) :: rest)
        TypeString b :: TypeString a :: rest ->
          (state, TypeString (a ++ b) :: rest)
        -- map
        TypeFunction fn :: TypeList v :: rest ->
          let
            (returnState, mapped) = stateMap fn state v
          in
          (returnState, TypeList mapped :: rest)
        -- concat
        TypeList b :: TypeList a :: rest ->
          (state, TypeList (a ++ b) :: rest)
        -- append
        any :: TypeList arr :: rest ->
          (state, TypeList (arr ++ [ any ]) :: rest)
        b :: a :: rest ->
          (state, mismatchError "Add" [a, b] :: rest)
    OpLeaf Multiply ->
      applyStack <| case state.stack of
        [] ->
          (state, [])
        Error _ :: _ ->
          (state, state.stack)
        [_] ->
          (state, [ Error "Insufficient Arguments" ])
        -- apply N times
        TypeFunction fn :: TypeInteger n :: rest ->
          let
            (returnState, mapped) =
              List.range 1 n
                |> List.map TypeInteger
                |> List.foldl
                  (\_ (inner, build) ->
                    let (nextInner, atom) = evaluateToAtom fn inner
                    in (nextInner, build ++ [ atom ])
                  )
                  (state, [])
          in
          (returnState, TypeList mapped :: rest)
        second :: first :: rest ->
          let
            value = case (first, second) of
              (TypeInteger a, TypeInteger b) -> TypeInteger (a * b)
              (TypeInteger a, TypeBoolean b) -> TypeInteger (if b then a else 0)
              (TypeBoolean a, TypeInteger b) -> TypeInteger (if a then b else 0)
              (TypeBoolean a, TypeBoolean b) -> TypeBoolean (a && b)
              (a, b) -> mismatchError "Multiply" [a, b]
          in
          (state, value :: rest)
    OpLeaf Divide ->
      applyStack <| case state.stack of
        [] ->
          (state, [])
        Error _ :: _ ->
          (state, state.stack)
        [_] ->
          (state, [ Error "Insufficient Arguments" ])
        TypeInteger b :: TypeInteger a :: rest ->
          -- TODO: Regular float division and auto casting arguments.
          (state, TypeInteger (a // b) :: rest)
        TypeInteger n :: TypeList vec :: rest ->
          (state, (vec |> Util.splitChunk n |> List.map TypeList |> TypeList) :: rest)
        TypeFunction fn :: TypeList vec :: rest ->
          let
            (returnState, folded) = 
              stateFoldl fn state (TypeInteger 0) vec
          in
          (returnState, folded :: rest)
        b :: a :: rest ->
          (state, mismatchError "Divide" [a, b] :: rest)
    OpLeaf Modulo ->
      applyStack <| case state.stack of
        [] ->
          (state, [])
        Error _ :: _ ->
          (state, state.stack)
        [_] ->
          (state, [ Error "Insufficient Arguments" ])
        TypeInteger b :: TypeInteger a :: rest ->
          (state, TypeInteger (if b == 0 then 0 else modBy b a) :: rest)
        b :: a :: rest ->
          (state, mismatchError "Modulo" [a, b] :: rest)
    OpLeaf Equality ->
      applyStack <| case state.stack of
        [] ->
          (state, [])
        Error _ :: _ ->
          (state, state.stack)
        [_] ->
          (state, [ Error "Insufficient Arguments" ])
        TypeInteger b :: TypeInteger a :: rest ->
          (state, TypeBoolean (a == b) :: rest)
        b :: a :: rest ->
          (state, mismatchError "Equality" [a, b] :: rest)
    OpLeaf Separator ->
      applyStack <| case state.stack of
        [] ->
          (state, [])
        Error _ :: _ ->
          (state, state.stack)
        [_] ->
          (state, state.stack)
        b :: _ :: rest ->
          (state, b :: rest)
    OpLeaf Range ->
      { state
      | stack = case state.stack of
        [] -> []
        Error _ :: _ -> state.stack
        TypeInteger a :: rest ->
          TypeList (List.map TypeInteger (List.range 0 (a - 1) )) :: rest
        TypeList v :: rest ->
          TypeList (List.reverse v) :: rest
        TypeString s :: rest ->
          TypeString (String.reverse s) :: rest
        _ :: rest -> Error "Unrecognized Type (Range)" :: rest
      }
    -- UnknownOp -> state
    _ -> { state | stack = Error ("Unrecognized operator " ++ Debug.toString op) :: state.stack }

showDiagnosticForBits : (List (List Int)) -> String
showDiagnosticForBits bits =
  let bitCount = List.length <| Util.flatten bits
    in
    -- TODO: Remove Debug.toString, as this is not available in production
    (bits |> List.map (List.map Debug.toString >> String.join "") |> String.join "│")
    ++ " (" ++ String.fromInt bitCount ++ " bit(s), "
    ++ String.fromFloat (toFloat bitCount / 8.0) ++ " byte(s))"

evaluateBits : (List Int) -> String -> String
evaluateBits bits input =
  bits
  |> Util.debug "Before decode\n"
  |> Decode.decode
  |> Util.debug "Before permute\n"
  |> permute
  |> Util.debug "Before evaluation\n"
  |> (\tokens -> evaluateStep tokens (defaultState input))
  |> .stack
  -- TODO: Remove Debug.toString / join for release?
  |> List.map (\y -> atomToString y ++ "\n" ++ Debug.toString y)
  |> String.join "\n--------------\n"

type EvaluationResult
  = Evaluation String
  | InstructionNotFound String

showCodeResult : String -> (List (List Int)) -> EvaluationResult
showCodeResult input bits =
  Evaluation (showDiagnosticForBits bits ++ "\n==============\n" ++ evaluateBits (Util.flatten bits) input)

handleInstructions : (String) -> (List Token) -> EvaluationResult
handleInstructions input tokens =
  case Util.coalesceMap (CodeTree.invertInstruction << (\token -> token.ins)) tokens of
    Util.Coalesced bitRepresentations ->
      showCodeResult input bitRepresentations
    Util.Offenders offenders ->
      InstructionNotFound ("Not all tokens were given bit representations: " ++ (
        String.join
          ", "
          (List.map (\token -> "'" ++ token.raw ++ "'") offenders)
      ))

evaluate : String -> String -> EvaluationResult
evaluate code input =
  code
    |> Literate.tokenize
    |> List.filter (\x -> x.raw /= " ")
    |> handleInstructions input
