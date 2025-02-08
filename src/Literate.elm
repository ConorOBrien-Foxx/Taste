module Literate exposing (..)

import Atom exposing (..)
import Decode exposing (..)
import Types exposing (..)
import Util

type alias Token =
  { raw : String
  , ins : InstructionLeaf
  }

-- TODO: Return Maybe (InstructionLeaf)
getInstruction : String -> (Maybe InstructionLeaf)
getInstruction op =
  case op of
    "0" -> Just (DataLeaf Zero)
    "1" -> Just (DataLeaf One)
    "2" -> Just (DataLeaf Two)
    "3" -> Just (DataLeaf Three)
    "4" -> Just (DataLeaf Four)
    "5" -> Just (DataLeaf Five)
    "t" -> Just (DataLeaf Ten)
    "i" -> Just (DataLeaf Input)
    -- TODO: more constants
    "x" -> Just (DataLeaf RegX)
    "y" -> Just (DataLeaf RegY)
    "z" -> Just (DataLeaf RegZ)
    "{" -> Just (DataLeaf Function)
    "(" -> Just (DataLeaf Context)
    "o" -> Just (DataLeaf OperatorSignal)
    -- TODO: this probably shouldn't be here (rather, should be operator forms)
    "v" -> Just (DataLeaf VectorOperatorSignal)
    "Y" -> Just (OpLeaf SaveY)
    "Z" -> Just (OpLeaf SaveZ)
    "r" -> Just (OpLeaf Range)
    "+" -> Just (OpLeaf Add)
    "-" -> Just (OpLeaf Subtract)
    "/" -> Just (OpLeaf Divide)
    "*" -> Just (OpLeaf Multiply)
    "%" -> Just (OpLeaf Modulo)
    "=" -> Just (OpLeaf Equality)
    "c" -> Just (OpLeaf Cast)
    "?" -> Just (OpLeaf TernaryCondition)
    "}" -> Just (OpLeaf Terminate)
    ")" -> Just (OpLeaf Terminate)
    ";" -> Just (OpLeaf Separator)
    "N" -> Just (TypeLeaf TasteNumeric)
    "B" -> Just (TypeLeaf TasteBoolean)
    "F" -> Just (TypeLeaf TasteFunction)
    "S" -> Just (TypeLeaf TasteString)
    "L" -> Just (TypeLeaf TasteListSignal)
    _ -> Nothing

tokenFor : String -> Maybe Token
tokenFor raw =
  Maybe.map (Token raw) (getInstruction raw)

type TokenizationResult
  = Tokens (List Token)
  | UnknownToken (String)
tokenize : String -> TokenizationResult
tokenize code =
  let
    tokens = code
      |> String.toList
      |> List.map String.fromChar
      |> Util.coalesceMap tokenFor
  in
    case tokens of
      Util.Coalesced coalesced -> Tokens coalesced
      Util.Offenders offenders -> UnknownToken (Maybe.withDefault "(no tokens found)" (List.head offenders))

