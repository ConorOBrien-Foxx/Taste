module Atom exposing (..)

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