module Literate exposing (..)

import Atom exposing (..)
import Decode exposing (..)
import Types exposing (..)

type alias Token =
  { raw : String
  , ins : InstructionLeaf
  }

getInstruction : String -> InstructionLeaf
getInstruction op =
  case op of
    "0" -> DataLeaf Zero
    "1" -> DataLeaf One
    "2" -> DataLeaf Two
    "3" -> DataLeaf Three
    "4" -> DataLeaf Four
    "5" -> DataLeaf Five
    "t" -> DataLeaf Ten
    -- TODO: more constants
    "x" -> DataLeaf RegX
    "y" -> DataLeaf RegY
    "{" -> DataLeaf Function
    "r" -> OpLeaf Range
    "+" -> OpLeaf Add
    "-" -> OpLeaf Subtract
    "/" -> OpLeaf Divide
    "*" -> OpLeaf Multiply
    "%" -> OpLeaf Modulo
    "i" -> OpLeaf Input
    "=" -> OpLeaf Equality
    "}" -> OpLeaf Terminate
    "N" -> TypeLeaf TasteNumeric
    "B" -> TypeLeaf TasteBoolean
    "F" -> TypeLeaf TasteFunction
    "L" -> TypeLeaf TasteList
    
    _ -> OpLeaf UnknownOp

tokenize : String -> List Token
tokenize code =
  code
    |> String.toList
    |> List.map String.fromChar
    |> List.map (\x -> { raw = x, ins = getInstruction x })
    -- |> List.filter (.op == UnknownOp)
