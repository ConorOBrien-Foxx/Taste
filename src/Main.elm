module Main exposing (..)

import Browser
import Html exposing (
  Html, button, div, text, textarea,
  h1, h2, h3, a, p
  )
-- ^ spaces required bc Elm gets "confused" otherwise

import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)

import Taste
import BrowserPorts
import Util exposing (debug)

-- MAIN
main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }
  
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
      , BrowserPorts.syncOutput ()
      )
    
    Receive str ->
      case str of
        "Execute" -> update Execute model

        _ ->
          Util.debug
            ("Could not handle action " ++ str)
            ( model
            , Cmd.none
            )

-- VIEW
blankLink : String -> String -> Html msg
blankLink link content =
  a [ href link, target "_blank" ] [ text content ]

-- TODO: make this look not like garbage
view : Model -> Html Msg
view model =
  div [ id "ElmApp" ]
    [ h1 [] [ blankLink "https://github.com/ConorOBrien-Foxx/Taste" "Taste" ]
    , h2 [] [ text "About" ]
    , p []
      [ text "Taste is an esoteric language with bit-level commands. Ostensibly also a golfing language, although it is more a proof of concept than intentional high-level golfing competitor. Once the language is more stable, I will add documentation. If you're interested in reading into the source for an idea of the operators, you could try "
      , blankLink "https://github.com/ConorOBrien-Foxx/Taste/blob/main/src/CodeTree.elm" "src/CodeTree.elm"
      , text "." 
      ]
    , h2 [] [ text "Interpreter" ]
    , h3 [] [ text "Code" ]
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
  -- Sub.none
  BrowserPorts.messageReceiver Receive
