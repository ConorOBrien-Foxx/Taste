# Taste

Taste is an esoteric language whose operators are defined on the bit scale.

* **TODO:** Limit all `exposing` imports to only necessary functions.

## Language Features

Taste comes with two interpreters which should function the same: [A webpage](./index.html) and a [REPL that runs in `node.js`](./taste.node.js).

As mentioned, the operators and data in Taste have representations in terms of bits, rather than characters. Taste programs are communicated using UTF-8 code strings (the "literate" form), and are later compiled down to the bit representations. Despite this, it is perfectly valid (albeit somewhat mind-bending) to write the raw bits yourself; the literate form is not necessary for the Taste interpreter to understand your intentions.

## Program Structure

Taste programs follow a simple structure: First, data is declared. This is the start of the program. Then, a series of operators follow the data, creating new values. If operators require data and/or types, all additional arguments are given after the command is specified.

For example, let's consider the following literate program which computes factorial:

```
iNr+{x+1}/{x*y}
```

Knowing that `i` correspond to input (which must take a type, in this case, `N` for numeric), `r` corresponds to range `[0, r)`, `+` corresponds to mapping in this case (overloaded form of addition), and `/` corresponds to folding in this case (overloaded form of division), we can "rewrite" this program in pseudocode to illustrate the pattern:

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

As a more complicated example, consider this code, which computes the `n`th Fibonacci number:

```
iN*{y+(zY)Z};z
```

This uses state-setting variables (`Y` and `Z`), the statement separator (`;`), and the fact that default value of the `y` register being `1`. This corresponds to the pseudocode:

```js
y = 1;
input(type = numeric)
  .multiply(() => {
    y
      .add(z.saveToY())
      .saveToZ()
  });
z
```

## Command Reference

As this language is unstable, the bit representations may not reflect current. (Last updated: 2/8/2025).

### Truthiness

To save on having comparison operations, a value `a` is truthy if (and only if):

 - `int a` or `float af`: `a` is positive (aka `a` is strictly greater than 0)
 - `bool a`: `a` is `True`
 - `list a` or `str a`: `a` has at least 1 element (the element can be truthy or falsey, does not matter)
 - `fn a`: All functions are truthy

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
| `x` | 2 | `00` | The `x` register (initially `0`) |
| `y` | 4 | `0100` | The `y` register (initially `1`) |
| `z` | 4 | `0101` | The `z` register (initially `0`) |
| `i` | 3+N | `011` + type representation | Accepts input of the specified type (see [Types](#Types) table) <br/> `iN`: Numeric input (e.g. `3425`, `-5.04`, or `_3`) <br/> `iS`: One line of string input (e.g. `Hello`) <br/> `iLN`: Space-separated of numbers (until end of line) (e.g. `3 4 5.2 6`)|
| `{` | 3+N | `100` + data-rooted bitstring | Function literal; terminated by `}` |
| `(` | 3+N | `101` + data-rooted bitstring | Group expression; creates new data rooted bitstring with trailing data; terminated by `)` <br/> Whereas `3+4*5` evaluates to 35 (`(3+4)*5`), `3+(4*5)` evaluates to 23 (`3+(4*5)`), as one might expect |
| `o` | 7+N | `1111000` + operator representation | Equivalent to the function literal `{x op y}` |
| `v` | 7 | `1111001` | UNIMPLEMENTED - `v`, but applies `o` between cell elements? |

### Operators

Arity includes the initial piece of data; for example, `+` (add) has an Arity of `2`, despite only taking one additional argument. Floating point operations are not currently supported.

| Literate | Bit cost | Bit representation | Arity | Meaning |
| -------- | -------- | ------------------ | ----- | ------- |
| `Y` | 3 | `000` | 1 | `any v`: Saves value `v` to the `y` register |
| `Z` | 3 | `001` | 1 | `any v`: Saves value `v` to the `z` register |
| `+` | 3 | `010` | 2 | `int a`, `int b`: Integer addition <br/> `str a`, `str b`: String concatenation <br/> `list a`, `fn b`: Map function `b` over each element in `a` <br/> `list a`, `list b`: List concatenation <br/> `list a`, `any b`: Append `b` to the end of `a` |
| `}` or `)` | 3 | `011` | - | Terminates whatever function or grouped expression is open |
| `*` | 3 | `100` | 2 | `int a`, `int b`: Integer multiplication <br/> `fn a`, `int b`: Apply function `a` a total of `b` times; e.g., `3*{z+2Z};z` produces `6` <br/> `bool a`, `int b` or `int a`, `bool b`: Returns the integer if the bool is `True`, `0` otherwise <br/> `bool a`, `bool b`: Boolean conjunction/AND |
| `/` | 4 | `1010` | 2 | `int a`, `int b`: Integer division <br/> `list a`, `int b`: Divide `a` into `b` consecutive sublists <br/> `list a`, `fn b`: Folds (reduces) the elements of `a` using the function `b` (returns `0` if `a` is empty) |
| `r` | 4 | `1011` | 1 | `int a`: Range from `0` to `a - 1`, inclusive on both ends <br /> `list a` or `str a`: Reverse elements |
| `%` | 5 | `11001` | 2 | `int a`, `int b`: Integer modulo. Currently not specified which behavior, although `a%0` is currently defined as `0` |
| `#` | 5 | `11001` | 1 | `int a`: Increment `a` aka `a + 1` <br/> `list a` or `str a`: Number of elements | 
| `=` | 4 | `1110` | 2 | `int a`, `int b`: Integer equality <br/> Currently not defined on other types |
| `;` | 4 | `1111` | 2 | `any a`, `any b`: Computes `a` then `b`, and has the value of `b` |
| `?` | 6 | `110110` | 3 | `any a`, `fn b`, `fn c`: If `a` is [**truthy**](#Truthiness), execute `b`, otherwise `c` (both supplied with register `x` defined to `a`). <br/> **TODO:** Save the value before `=` to use for `x`? `iN0=?{}{}` does not have a useful value of `x` |

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
