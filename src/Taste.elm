module Taste exposing (..)

import Atom exposing (..)
import Decode exposing (..)
import Evaluate exposing (..)

evaluate : String -> String -> String
evaluate code input =
  case Evaluate.evaluate code input of 
    Evaluation str -> str
    InstructionNotFound msg -> "Something went wrong: " ++ msg
    TokenizationError msg -> "Something went wrong while tokenizing: " ++ msg
