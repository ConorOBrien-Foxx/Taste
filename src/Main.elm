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
import BrowserPorts

-- MAIN
main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }


debug message value =
  Tuple.second ( (
    Debug.log "Debugging:" message,
    value
  ) )
  
-- MODEL
type alias Model =
  { code : String
  , input : String
  , output : String
  }

type alias SavedModel =
  { code : String
  , input : String
  }

init : SavedModel -> (Model, Cmd Msg)
init flags =
  (
    { code = flags.code
    , input = flags.input
    , output = ""
    }
  , Cmd.none
  )

-- UPDATE

type Msg
  = CodeChange String
  | ChangeInput String
  | Execute
  | Receive String

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    CodeChange newCode ->
      ( { model | code = newCode }
      , BrowserPorts.storeCode newCode
      )
    
    ChangeInput newInput ->
      ( { model | input = newInput }
      , BrowserPorts.storeInput newInput
      )
    
    Execute ->
      ( { model | output = Taste.evaluate model.code model.input }
      , Cmd.none
      )
    
    Receive str ->
      ( model
      , Cmd.none
      )

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

-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none
  -- BrowserPorts.messageReceiver Receive