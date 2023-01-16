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
  | Input
  | UnknownData

type TasteOperation
  = Add
  | Subtract
  | Multiply
  | Divide
  | Modulo
  | Range
  | Equality
  | Terminate
  -- TODO: factor out UnknownData and UnknownOp
  | UnknownOp

type TasteType
  = TasteNumeric
  | TasteFunction
  | TasteBoolean
  | TasteString
  | TasteList
  
-- TREE
type InstructionLeaf
  = OpLeaf TasteOperation
  | DataLeaf TasteData
  | TypeLeaf TasteType
