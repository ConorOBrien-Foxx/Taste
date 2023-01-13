module Types exposing (..)

-- TYPES
type TasteData
  = Zero
  | One
  | Two
  | Three
  | Four
  | Five
  | Ten
  | RegX
  | RegY
  | Function
  | UnknownData

type TasteOperation
  = Add
  | Subtract
  | Multiply
  | Divide
  | Modulo
  | Input
  | Range
  | Equality
  | Terminate
  -- TODO: factor out UnknownData and UnknownOp
  | UnknownOp

type TasteType
  = TasteNumeric
  | TasteFunction
  | TasteBoolean
  | TasteList
  
-- TREE
type InstructionLeaf
  = OpLeaf TasteOperation
  | DataLeaf TasteData
  | TypeLeaf TasteType
