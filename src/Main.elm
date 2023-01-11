module Main exposing (..)

import Browser
import Html exposing (
  Html, button, div, text, textarea,
  h1, h2, h3
  )
-- ^ spaces required bc Elm gets "confused" otherwise

import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)

import Taste

-- MAIN
main =
  Browser.sandbox { init = init, update = update, view = view }

-- MODEL
type alias Model =
  { code : String
  , input : String
  , output : String
  }

init : Model
init =
  { code = "x+1*y"
  , input = ""
  , output = ""
  }

-- UPDATE

type Msg
  = CodeChange String
  | ChangeInput String
  | Execute

debug message value =
  Tuple.second ( (
    Debug.log "Debugging:" message,
    value
  ) )

update : Msg -> Model -> Model
update msg model =
  case msg of
    CodeChange newCode ->
      { model | code = newCode }
    
    ChangeInput newInput ->
      { model | input = newInput }
    
    Execute ->
      { model | output = Taste.evaluate model.code model.input }

-- VIEW
view : Model -> Html Msg
view model =
  div [ id "ElmApp" ]
    [ h1 [] [ text "Taste" ]
    , h3 [ ] [ text "Code" ]
    , textarea [ id "code", value model.code, onInput CodeChange ] [ ]
    , h3 [] [ text "Input" ]
    , textarea [ id "input", value model.input, onInput ChangeInput ] [ ]
    , button [ id "execute", onClick Execute ] [ text "Execute" ]
    , h3 [] [ text "Output" ]
    , textarea [ readonly True, id "output", value model.output ] [ ]
    ]