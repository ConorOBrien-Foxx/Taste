module Literate exposing (..)

import Atom exposing (..)
import Decode exposing (..)

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
