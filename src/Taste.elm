module Taste exposing (..)

import Atom exposing (..)
import Decode exposing (..)
import Evaluate exposing (..)

evaluate : String -> String -> String
evaluate = Evaluate.evaluate
