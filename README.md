# Taste

Taste is an esoteric language whose operators are defined on the bit scale.

Types:

- Numeric
- Boolean
- List
- Function


```
Data = Operator [...Data] Operator ...

## n reversed n
input (number) 0 toString reverse toInteger multiply input (number) 0

## sum
x  | input[list(number)] | fold | func ( |
"fold" assigns signature to func: since `x` is a list of numbers,
func will set registers `x` and `y` to the accumulator and current
value respectively, i.e., both ints
x  | add | y
)

# sum of divisors
0/x | input[list(number)] | range | fold  | func ( |
DAT | OP(0)               | OP(0) | OP(1) | DAT(N)
RECALL: x=accumulator, y=current value
0   | input[number] | %     | y   | ==    | 0   | *     | y   | +     | x   | .     |
DAT | OP(0)         | OP(1) | DAT | OP(1) | DAT | OP(1) | DAT | OP(1) | DAT | OP(-) |

0i#R / { x + (0i#%y==0)*y }
0i#R / { (0i#%y==0)*y+x }

x │input[number]│range|fold│fn│0   │input(number)│%  │y │==  │0   │*  │y │+  │x │.  │
d │x0           │x0   │x1  │d~│d   │x0           │x1 │d │x1  │d   │x1 │d │x1 │d │x- │
00│00    0      │011  │100 │10│1100│00    0      │110│10│1110│1100│100│01│100│00│010│

Type(t):
0       Numeric
10t     List of type t
110     Function
111     Boolean

Data(d):
00      register x (initially 0)
01      register y (initially 1)
10      function
1100    0
1101    1

Operators (Variadic)
00t     input of type t at input position 
010     integer integer -> add
        list function -> map
011     terminate function
100     integer integer -> multiply
        list function -> fold
101     integer integer -> divide
110     integer integer -> modulo
1110    any any -> equality
 
```