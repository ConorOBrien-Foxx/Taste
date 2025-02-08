# Taste

Taste is an esoteric language whose operators are defined on the bit scale.

## Language Features

Taste comes with two interpreters which should function the same: [A webpage](./index.html) and a [REPL that runs in `node.js`](./taste.node.js).

As mentioned, the operators and data in Taste have representations in terms of bits, rather than characters. Taste programs are communicated using UTF-8 code strings (the "literate" form), and are later compiled down to the bit representations. Despite this, it is perfectly valid (albeit somewhat mind-bending) to write the raw bits yourself; the literate form is not necessary for the Taste interpreter to understand your intentions.

## Program Structure

Taste programs follow a simple structure: First, data is declared. This is the start of the program. Then, a series of operators follow the data, creating new values. If operators require data and/or types, all additional arguments are given after the command is specified.

For example, let's consider the following literate program:

```
iNr+{x+1}/{x*y}
```

Knowing that `i` correspond to input (which must take a type, in this case, `N` for numeric), `r` corresponds to range `[0, r)`, `+` corresponds to mapping in this case (overloaded form of addition), and `/` corresponds to folding in this case (overloaded form of division), we can "rewrite" this program in psuedocode to illustrate the pattern:

```js
input(type = numeric)
  .range()
  .add(x =>
    x.add(1)
  )
  .divide((x, y) =>
    x.multiply(y)
  )
```

## Command Reference

As this language is unstable, the bit representations may not be updated. (Last updated: 2/8/2025).

### Data

| Literate | Bit cost | Bit representation | Meaning |
| -------- | -------- | ------------------ | ------- |
| `0` | 4 |  `1100` | The constant `0` |
| `1` | 4 | `1101` | The constant `1` |
| `2` | 4 | `1110` | The constant `2` |
| `3` | 7 | `1111010` | The constant `3` |
| `4` | 7 | `1111011` | The constant `4` |
| `5` | 6 | `111110` | The constant `5` |
| `t` | 6 | `111111` | The constant `10` |
| `x` | 2 | `00` | The `x` register |
| `y` | 4 | `0100` | The `y` register |
| `z` | 4 | `0101` | The `z` register |
| `i` | 3+N | `011` + type representation | Accepts input of the specified type; see [Types](#Types) table |
| `{` | 3+N | `100` + data-rooted bitstring | Function literal |
| `(` | 3+? | `101` + ? | Context?????? Paired with `)`, idk |
| `o` | 7 | `1111000` | UNUSED - presumably, Operator literal? |
| `v` | 7 | `1111001` | UNUSED - presumably, Vectorized operator literal? |

### Operators

Arity includes the initial piece of data; for example, `+` (add) has an Arity of `2`, despite only taking one additional argument.

| Literate | Bit cost | Bit representation | Arity | Meaning |
| -------- | -------- | ------------------ | ----- | ------- |
| `Y` | 3 | `000` | 1 | `any v`: Saves value `v` to the `y` register |
| `Z` | 3 | `001` | 1 | `any v`: Saves value `v` to the `z` register |
| `+` | 3 | `010` | 2 | `int a`, `int b`: Integer addition <br/> `str a`, `str b`: String concatenation <br/> `list a`, `fn b`: Map function `b` over each element in `a` <br/> `list a`, `list b`: List concatenation <br/> `list a`, `any b`: Append `b` to the end of `a` |

### Types

| Literate | Bit cost | Bit representation | Meaning |
| -------- | -------- | ------------------ | ------- |
| `N` | 1 | `0` | Numeric |
| `L` | 2+N | `10` + type representation | List of specified type |
| `F` | 4 | `1100` | Function |
| `B` | 4 | `1101` | Boolean |
| `S` | 3 | `111` | String |


# Compilation

To compile Taste, you need the [Elm compiler](https://guide.elm-lang.org/install/elm.html). Then, you can run [`./compile.bat`](./compile.bat) (for Windows) or [`./compile.sh`](./compile.sh) (for most other systems).
