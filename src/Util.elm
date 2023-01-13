module Util exposing (..)

debugThen : b -> a -> a
debugThen message value =
  Tuple.second ( (
    Debug.log "Debugging:" message,
    value
  ) )

debug : String -> a -> a
debug msg value =
  Tuple.second ( (
    Debug.log msg value,
    value
  ) )

splitWhere : (b -> Bool) -> (a -> b -> b) -> b -> List a -> (List a, List a)
splitWhere cond fld seed vec =
  vec
  |> List.foldl
      (\v state ->
        if state.done
        then { state | tail = state.tail ++ [v] }
        else
          let
            nextFocus = fld v state.focus
          in
          { state
          | head = state.head ++ [v]
          , focus = nextFocus
          , done = cond nextFocus
          }
        )
      { done = False, head = [], tail = [], focus = seed }
  |> (\x -> (x.head, x.tail))

dropLast : Int -> List a -> List a
dropLast n vec =
  vec |> List.take (List.length vec - n)


takeLast : Int -> List a -> List a
takeLast n vec =
  vec |> List.drop (List.length vec - n)
