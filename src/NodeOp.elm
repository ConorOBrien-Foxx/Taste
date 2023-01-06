module NodeOp exposing (..)

-- Headless boilerplate
import Platform exposing (worker)

nodeProgram : a -> Program () () ()

nodeProgram _ =
  worker
    { init = \flags -> ( (), Cmd.none )
    , update = \() -> \() -> ( (), Cmd.none )
    , subscriptions = \() -> Sub.none
    }

-- Code


-- Headless main boilerplate
main : Program () () ()
main =
  nodeProgram (
    Debug.log "Hi" 2
  )
