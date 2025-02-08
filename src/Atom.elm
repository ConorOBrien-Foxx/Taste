module Atom exposing (..)

import Types exposing (TasteType, InstructionLeaf)

type Atom
  = TypeInteger Int
  | TypeFloat Float
  | TypeBoolean Bool
  | TypeString String
  | TypeList (List Atom)
  | TypeFunction (List InstructionLeaf)
  | Error String

-- pair : Atom -> Atom -> List Atom
-- pair a b = [ a, b ]

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
      "[" ++ (
        List.map atomToString l |> String.join " "
      ) ++ "]"
    
    -- TODO: better function representation?
    TypeFunction _ ->
      "{ ... }"
    
    Error s ->
      "Error: " ++ s

convertTo : TasteType -> Atom -> Atom
convertTo target atom =
  case (target, atom) of
    (Types.TasteString, TypeString _) -> atom
    (Types.TasteNumeric, TypeInteger _) -> atom
    (Types.TasteNumeric, TypeFloat _) -> atom
    (Types.TasteBoolean, TypeBoolean _) -> atom
    (Types.TasteFunction, TypeFunction _) -> atom
    -- TODO: lists
    (Types.TasteNumeric, TypeString str) ->
      TypeInteger (String.toInt str |> Maybe.withDefault 0)
    (Types.TasteString, TypeInteger int) ->
      TypeString (String.fromInt int)
    (a, b) -> Error ("Cannot perform conversion " ++ (Debug.toString b) ++ " -> " ++ (Debug.toString a))
