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

-- from https://www.reddit.com/r/elm/comments/4j2fg6/comment/d33g6ae/
lastElement : List a -> Maybe a
lastElement =
  List.foldl (Just >> always) Nothing

splitSlicesHelper : Int -> List a -> List a -> List (List a)
splitSlicesHelper by vec build =
  if List.length build < by
  then
    case vec of
      [] -> if List.isEmpty build then [] else [ build ]
      head :: rest -> splitSlicesHelper by rest (build ++ [ head ])
  else
    build :: splitSlicesHelper by vec []

splitSlices : Int -> List a -> List (List a)
splitSlices by vec =
  splitSlicesHelper by vec []

splitChunk : Int -> List a -> List (List a)
splitChunk into vec =
  let
    size = List.length vec
    eachChunk = ceiling (toFloat size / toFloat into)
  in 
  splitSlices eachChunk vec

replaceLast : (a -> a) -> List a -> List a
replaceLast fn vec =
  case vec of
    [] -> []
    [a] -> [fn a]
    head :: rest -> head :: replaceLast fn rest

mapTupleSame3 : (a -> b) -> (a, a, a) -> (b, b, b)
mapTupleSame3 fn (q, w, e) = (fn q, fn w, fn e)

flatten : List (List a) -> List a
flatten = List.concatMap (\x -> x)

{-
  splits a list into three parts based on two functions
  =====================================================
  given a seed of type b, the function determines a split based on
  updating an iterator that moves from left to right over the list
  with the second function, fld, which takes left argument, say, el,
  for each element in the list, and right argument, initially seed,
  and represents the last return value from fld.
  
  then, the split is determined based on these continually updated
  values from fld, and when it returns true, the split is made.
  yields a tuple of 3 lists: the head, mid, and tail.
   1) head is the run of entries before the split.
   2) mid is the singleton list consisting of where the split was made.
   3) tail is the rest of hte list after mid.
  
  Example:
    [ [1, 2, 3], [9, 2, 0], [], [1], [9, 10, 11], [12] ]
    |> splitWhereMap
      -- stop condition
      (\amount -> amount > 6)
      -- update fold
      (\sublist amount ->
        amount + List.length sublist
      )
      -- initial seed
      0
  
  This will accumulate sublists until their total length exceeds 6.
  In this case:
    ( [ [ 1, 2, 3 ], [ 9, 2, 0 ], [] ]
    , [ [ 1 ] ]
    , [ [ 9, 10, 11 ], [ 12 ] ] 
    )
  The reason that mid is returned separately is to allow the programmer
  to choose what to do with the split element, which will vary.
-}
splitWhereMap : (b -> Bool) -> (a -> b -> b) -> b -> List a -> (List a, List a, List a)
splitWhereMap cond fld seed =
  List.foldl
    (\v state ->
      if state.done
      then { state | tail = state.tail ++ [ v ] }
      else
        let
          nextFocus = fld v state.focus
          isDone = cond nextFocus
        in
        if isDone
        then
          { state
          | focus = nextFocus
          , mid = [ v ]
          , done = isDone
          }
        else
          { state
          | head = state.head ++ [ v ]
          , focus = nextFocus
          , done = isDone
          }
      )
    { done = False, head = [], mid = [], tail = [], focus = seed }
  >> (\x -> (x.head, x.mid, x.tail))

splitWhereMapString : (b -> Bool) -> (Char -> b -> b) -> b -> String -> (String, String, String)
splitWhereMapString cond fld seed =
  String.toList >> splitWhereMap cond fld seed >> mapTupleSame3 String.fromList

-- simplified version of splitWhereMap
-- here, there is no fld function, and the elements of the list
-- are used instead to determine the split
splitWhere : (a -> Bool) -> List a -> (List a, List a, List a)
splitWhere cond vec =
  case vec of
    [] -> ([], [], [])
    [k] -> if cond k then ([], [k], []) else ([k], [], [])
    head :: _ ->
      splitWhereMap cond (\a _ -> a) head vec

splitWhereString : (Char -> Bool) -> String -> (String, String, String)
splitWhereString cond =
  String.toList >> splitWhere cond >> mapTupleSame3 String.fromList

dropLast : Int -> List a -> List a
dropLast n vec =
  vec |> List.take (List.length vec - n)

takeLast : Int -> List a -> List a
takeLast n vec =
  vec |> List.drop (List.length vec - n)
