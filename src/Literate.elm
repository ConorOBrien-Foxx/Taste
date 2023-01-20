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
    "i" -> DataLeaf Input
    -- TODO: more constants
    "x" -> DataLeaf RegX
    "y" -> DataLeaf RegY
    "z" -> DataLeaf RegZ
    "{" -> DataLeaf Function
    "(" -> DataLeaf Context
    "o" -> DataLeaf Operator
    -- TODO: this probably shouldn't be here (rather, should be operator forms)
    "v" -> DataLeaf VectorOperator
    "Y" -> OpLeaf SaveY
    "Z" -> OpLeaf SaveZ
    "r" -> OpLeaf Range
    "+" -> OpLeaf Add
    "-" -> OpLeaf Subtract
    "/" -> OpLeaf Divide
    "*" -> OpLeaf Multiply
    "%" -> OpLeaf Modulo
    "=" -> OpLeaf Equality
    "c" -> OpLeaf Cast
    "}" -> OpLeaf Terminate
    ")" -> OpLeaf Terminate
    ";" -> OpLeaf Separator
    "N" -> TypeLeaf TasteNumeric
    "B" -> TypeLeaf TasteBoolean
    "F" -> TypeLeaf TasteFunction
    "S" -> TypeLeaf TasteString
    "L" -> TypeLeaf TasteListSignal
    
    _ -> OpLeaf UnknownOp

tokenize : String -> List Token
tokenize code =
  code
    |> String.toList
    |> List.map String.fromChar
    |> List.map (\x -> { raw = x, ins = getInstruction x })
    |> List.filter (\tok -> tok.ins /= OpLeaf UnknownOp)
