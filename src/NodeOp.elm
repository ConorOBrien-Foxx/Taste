-- modified from https://github.com/jxxcarlson/elm-platform-worker-example
port module NodeOp exposing (main)

import Platform exposing (Program)
import Taste exposing (..)

type alias Input = String
type alias Output = String

port get : (Input -> msg) -> Sub msg
port put : Output -> Cmd msg


main : Program Flags Model Msg
main =
  Platform.worker
    { init = init
    , update = update
    , subscriptions = subscriptions
    }

type alias Model
  = ()

type Msg
  = Input String

type alias Flags
  = ()

init : Flags -> ( Model, Cmd Msg )
init _ =
  ( (), Cmd.none )

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Input input ->
      ( model, put (Taste.evaluate input "dummy input"))

subscriptions : Model -> Sub Msg
subscriptions _ =
  get Input
