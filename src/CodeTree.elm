module CodeTree exposing (..)

import Dict exposing (Dict)
import Types exposing (..)

type CodeTree
  = Leaf InstructionLeaf
  | Tree (CodeTree, CodeTree)

type alias InverseCodeTree
  = List ((List Int), InstructionLeaf)

invertCodeTreeHelper : List Int -> CodeTree -> InverseCodeTree
invertCodeTreeHelper path ct =
  case ct of
    Leaf leaf -> [(path, leaf)]
    Tree tup ->
      (invertCodeTreeHelper (path ++ [0]) (Tuple.first tup))
      ++ (invertCodeTreeHelper (path ++ [1]) (Tuple.second tup))

invertFind : InverseCodeTree -> InstructionLeaf -> Maybe (List Int)
invertFind ict leaf =
  ict
    |> List.filter (\x -> Tuple.second x == leaf)
    |> List.head
    |> Maybe.map Tuple.first

invertCodeTree : CodeTree -> InverseCodeTree
invertCodeTree ct =
  invertCodeTreeHelper [] ct

inverseTypeTree : InverseCodeTree
inverseTypeTree = invertCodeTree typeTree

inverseOpTree : InverseCodeTree
inverseOpTree = invertCodeTree opTree

inverseDataTree : InverseCodeTree
inverseDataTree = invertCodeTree dataTree

-- TODO: convert into hard-coded data structure
invertInstruction : InstructionLeaf -> List Int
invertInstruction ins =
  let
    tree = case ins of
      TypeLeaf _ -> inverseTypeTree
      OpLeaf   _ -> inverseOpTree
      DataLeaf _ -> inverseDataTree
  in
    invertFind tree ins
      |> Maybe.withDefault [0,0,0,0,0,0,0,0,0,0,0,0,0,0] -- TODO: better validation

-- TREE DATA
typeTree : CodeTree
typeTree =
  Tree (
    --0
    Leaf (TypeLeaf TasteNumeric),
    --1
    Tree (
      --10
      Leaf (TypeLeaf TasteList),
      --11
      Tree (
        --110
        Leaf (TypeLeaf TasteFunction),
        --111
        Leaf (TypeLeaf TasteBoolean)
      )
    )
  )

opTree : CodeTree
opTree =
  Tree (
    --0
    Tree (
      --00
      Leaf (OpLeaf Input),
      --01
      Tree (
        --010
        Leaf (OpLeaf Add),
        --011
        Leaf (OpLeaf Terminate)
      )
    ),
    --1
    Tree (
      --10
      Tree (
        --100
        Leaf (OpLeaf Multiply),
        --101
        Tree (
          --1010
          Leaf (OpLeaf Divide),
          --1011
          Leaf (OpLeaf Range)
        )
      ),
      --11
      Tree (
        --110
        Leaf (OpLeaf Modulo),
        --111
        Tree (
          --1110
          Leaf (OpLeaf Equality),
          --1111
          Leaf (OpLeaf UnknownOp)
        )
      )
    )
  )

dataTree : CodeTree
dataTree =
  Tree (
    --0
    Tree (
      --00
      Leaf (DataLeaf RegX),
      --01
      Leaf (DataLeaf RegY)
    ),
    --1
    Tree (
      --10
      Leaf (DataLeaf Function),
      --11
      Tree (
        --110
        Tree (
          --1100
          Leaf (DataLeaf Zero),
          --1101
          Leaf (DataLeaf One)
        ),
        --111
        Leaf (DataLeaf UnknownData)
      )
    )
  )