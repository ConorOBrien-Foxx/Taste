port module BrowserPorts exposing (..)

port storeCode : String -> Cmd msg
port storeInput : String -> Cmd msg

port syncOutput : () -> Cmd msg

port messageReceiver : (String -> msg) -> Sub msg
