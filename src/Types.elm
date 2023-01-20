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
  | RegZ
  | Function
  | Context
  | Operator
  | VectorOperator
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
  | SaveY
  | SaveZ
  | Separator
  | Cast
  | BaseOperation -- the one at the start
  -- TODO: factor out UnknownData and UnknownOp
  | UnknownOp

type TasteType
  = TasteNumeric
  | TasteFunction
  | TasteBoolean
  | TasteString
  | TasteListSignal -- only used internally
  | TasteList TasteType
  
-- TREE
type InstructionLeaf
  = OpLeaf TasteOperation
  | DataLeaf TasteData
  | TypeLeaf TasteType
