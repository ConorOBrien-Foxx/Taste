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
  | OperatorSignal
  | Operator TasteOperation
  | VectorOperatorSignal
  | VectorOperator TasteOperation
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
  | TernaryCondition
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

leafToString : InstructionLeaf -> String
leafToString leaf =
  case leaf of
    DataLeaf data ->
      case data of 
        Zero -> "0"
        One -> "1"
        Two -> "2"
        Three -> "3"
        Four -> "4"
        Five -> "5"
        Ten -> "10"
        RegX -> "x"
        RegY -> "y"
        RegZ -> "z"
        Function -> "{"
        Context -> "("
        OperatorSignal -> "o?"
        Operator (op) -> "o" ++ leafToString (OpLeaf op)
        VectorOperatorSignal -> "v?"
        VectorOperator (op) -> "v" ++ leafToString (OpLeaf op)
        Input -> "i?"
        UnknownData -> "(UnknownData)"
    OpLeaf op ->
      case op of
        Add -> "+"
        Subtract -> "-"
        Multiply -> "*"
        Divide -> "/"
        Modulo -> "%"
        Range -> "r"
        Equality -> "="
        Terminate -> "}"
        SaveY -> "Y"
        SaveZ -> "Z"
        Separator -> ";"
        Cast -> "c"
        TernaryCondition -> "?"
        BaseOperation -> "(BaseOperation)"
        UnknownOp -> "(UnknownOp)"
    TypeLeaf typ ->
      case typ of
        TasteNumeric -> "N"
        TasteFunction -> "F"
        TasteBoolean -> "B"
        TasteString -> "S"
        TasteListSignal -> "L"
        TasteList _ -> "L[" ++ leafToString (TypeLeaf typ) ++ "]"
