(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function (flags) {
	return _Utils_Tuple2(
		{code: flags.code, input: flags.input, output: ''},
		$elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$Receive = function (a) {
	return {$: 'Receive', a: a};
};
var $author$project$BrowserPorts$messageReceiver = _Platform_incomingPort('messageReceiver', $elm$json$Json$Decode$string);
var $author$project$Main$subscriptions = function (_v0) {
	return $author$project$BrowserPorts$messageReceiver($author$project$Main$Receive);
};
var $author$project$Main$Execute = {$: 'Execute'};
var $elm$core$Debug$log = _Debug_log;
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Util$debug = F2(
	function (msg, value) {
		return _Utils_Tuple2(
			A2($elm$core$Debug$log, msg, value),
			value).b;
	});
var $author$project$Evaluate$TokenizationError = function (a) {
	return {$: 'TokenizationError', a: a};
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Evaluate$InstructionNotFound = function (a) {
	return {$: 'InstructionNotFound', a: a};
};
var $author$project$Util$Coalesced = function (a) {
	return {$: 'Coalesced', a: a};
};
var $author$project$Util$Offenders = function (a) {
	return {$: 'Offenders', a: a};
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$Util$keepIfNothing = F2(
	function (b, a) {
		if (a.$ === 'Nothing') {
			return $elm$core$Maybe$Just(b);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Util$noteOffenders = F2(
	function (maybes, original) {
		return A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			A3($elm$core$List$map2, $author$project$Util$keepIfNothing, original, maybes));
	});
var $author$project$Util$coalesceMaybe = F2(
	function (maybes, original) {
		var justs = A2($elm$core$List$filterMap, $elm$core$Basics$identity, maybes);
		return _Utils_eq(
			$elm$core$List$length(justs),
			$elm$core$List$length(original)) ? $author$project$Util$Coalesced(justs) : $author$project$Util$Offenders(
			A2($author$project$Util$noteOffenders, maybes, original));
	});
var $author$project$Util$coalesceMap = F2(
	function (fn, list) {
		return A2(
			$author$project$Util$coalesceMaybe,
			A2($elm$core$List$map, fn, list),
			list);
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $author$project$Types$Context = {$: 'Context'};
var $author$project$Types$DataLeaf = function (a) {
	return {$: 'DataLeaf', a: a};
};
var $author$project$Types$Five = {$: 'Five'};
var $author$project$Types$Four = {$: 'Four'};
var $author$project$Types$Function = {$: 'Function'};
var $author$project$Types$Input = {$: 'Input'};
var $author$project$CodeTree$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $author$project$Types$One = {$: 'One'};
var $author$project$Types$OperatorSignal = {$: 'OperatorSignal'};
var $author$project$Types$RegX = {$: 'RegX'};
var $author$project$Types$RegY = {$: 'RegY'};
var $author$project$Types$RegZ = {$: 'RegZ'};
var $author$project$Types$Ten = {$: 'Ten'};
var $author$project$Types$Three = {$: 'Three'};
var $author$project$CodeTree$Tree = function (a) {
	return {$: 'Tree', a: a};
};
var $author$project$Types$Two = {$: 'Two'};
var $author$project$Types$VectorOperatorSignal = {$: 'VectorOperatorSignal'};
var $author$project$Types$Zero = {$: 'Zero'};
var $author$project$CodeTree$dataTree = $author$project$CodeTree$Tree(
	_Utils_Tuple2(
		$author$project$CodeTree$Tree(
			_Utils_Tuple2(
				$author$project$CodeTree$Leaf(
					$author$project$Types$DataLeaf($author$project$Types$RegX)),
				$author$project$CodeTree$Tree(
					_Utils_Tuple2(
						$author$project$CodeTree$Tree(
							_Utils_Tuple2(
								$author$project$CodeTree$Leaf(
									$author$project$Types$DataLeaf($author$project$Types$RegY)),
								$author$project$CodeTree$Leaf(
									$author$project$Types$DataLeaf($author$project$Types$RegZ)))),
						$author$project$CodeTree$Leaf(
							$author$project$Types$DataLeaf($author$project$Types$Input)))))),
		$author$project$CodeTree$Tree(
			_Utils_Tuple2(
				$author$project$CodeTree$Tree(
					_Utils_Tuple2(
						$author$project$CodeTree$Leaf(
							$author$project$Types$DataLeaf($author$project$Types$Function)),
						$author$project$CodeTree$Leaf(
							$author$project$Types$DataLeaf($author$project$Types$Context)))),
				$author$project$CodeTree$Tree(
					_Utils_Tuple2(
						$author$project$CodeTree$Tree(
							_Utils_Tuple2(
								$author$project$CodeTree$Leaf(
									$author$project$Types$DataLeaf($author$project$Types$Zero)),
								$author$project$CodeTree$Leaf(
									$author$project$Types$DataLeaf($author$project$Types$One)))),
						$author$project$CodeTree$Tree(
							_Utils_Tuple2(
								$author$project$CodeTree$Leaf(
									$author$project$Types$DataLeaf($author$project$Types$Two)),
								$author$project$CodeTree$Tree(
									_Utils_Tuple2(
										$author$project$CodeTree$Tree(
											_Utils_Tuple2(
												$author$project$CodeTree$Tree(
													_Utils_Tuple2(
														$author$project$CodeTree$Leaf(
															$author$project$Types$DataLeaf($author$project$Types$OperatorSignal)),
														$author$project$CodeTree$Leaf(
															$author$project$Types$DataLeaf($author$project$Types$VectorOperatorSignal)))),
												$author$project$CodeTree$Tree(
													_Utils_Tuple2(
														$author$project$CodeTree$Leaf(
															$author$project$Types$DataLeaf($author$project$Types$Three)),
														$author$project$CodeTree$Leaf(
															$author$project$Types$DataLeaf($author$project$Types$Four)))))),
										$author$project$CodeTree$Tree(
											_Utils_Tuple2(
												$author$project$CodeTree$Leaf(
													$author$project$Types$DataLeaf($author$project$Types$Five)),
												$author$project$CodeTree$Leaf(
													$author$project$Types$DataLeaf($author$project$Types$Ten))))))))))))));
var $author$project$CodeTree$invertCodeTreeHelper = F2(
	function (path, ct) {
		if (ct.$ === 'Leaf') {
			var leaf = ct.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(path, leaf)
				]);
		} else {
			var tup = ct.a;
			return _Utils_ap(
				A2(
					$author$project$CodeTree$invertCodeTreeHelper,
					_Utils_ap(
						path,
						_List_fromArray(
							[0])),
					tup.a),
				A2(
					$author$project$CodeTree$invertCodeTreeHelper,
					_Utils_ap(
						path,
						_List_fromArray(
							[1])),
					tup.b));
		}
	});
var $author$project$CodeTree$invertCodeTree = function (ct) {
	return A2($author$project$CodeTree$invertCodeTreeHelper, _List_Nil, ct);
};
var $author$project$CodeTree$inverseDataTree = $author$project$CodeTree$invertCodeTree($author$project$CodeTree$dataTree);
var $author$project$Types$Add = {$: 'Add'};
var $author$project$Types$Cast = {$: 'Cast'};
var $author$project$Types$Divide = {$: 'Divide'};
var $author$project$Types$Equality = {$: 'Equality'};
var $author$project$Types$Increment = {$: 'Increment'};
var $author$project$Types$Modulo = {$: 'Modulo'};
var $author$project$Types$Multiply = {$: 'Multiply'};
var $author$project$Types$OpLeaf = function (a) {
	return {$: 'OpLeaf', a: a};
};
var $author$project$Types$Range = {$: 'Range'};
var $author$project$Types$SaveY = {$: 'SaveY'};
var $author$project$Types$SaveZ = {$: 'SaveZ'};
var $author$project$Types$Separator = {$: 'Separator'};
var $author$project$Types$Subtract = {$: 'Subtract'};
var $author$project$Types$Terminate = {$: 'Terminate'};
var $author$project$Types$TernaryCondition = {$: 'TernaryCondition'};
var $author$project$CodeTree$opTree = $author$project$CodeTree$Tree(
	_Utils_Tuple2(
		$author$project$CodeTree$Tree(
			_Utils_Tuple2(
				$author$project$CodeTree$Tree(
					_Utils_Tuple2(
						$author$project$CodeTree$Leaf(
							$author$project$Types$OpLeaf($author$project$Types$SaveY)),
						$author$project$CodeTree$Leaf(
							$author$project$Types$OpLeaf($author$project$Types$SaveZ)))),
				$author$project$CodeTree$Tree(
					_Utils_Tuple2(
						$author$project$CodeTree$Leaf(
							$author$project$Types$OpLeaf($author$project$Types$Add)),
						$author$project$CodeTree$Leaf(
							$author$project$Types$OpLeaf($author$project$Types$Terminate)))))),
		$author$project$CodeTree$Tree(
			_Utils_Tuple2(
				$author$project$CodeTree$Tree(
					_Utils_Tuple2(
						$author$project$CodeTree$Leaf(
							$author$project$Types$OpLeaf($author$project$Types$Multiply)),
						$author$project$CodeTree$Tree(
							_Utils_Tuple2(
								$author$project$CodeTree$Leaf(
									$author$project$Types$OpLeaf($author$project$Types$Divide)),
								$author$project$CodeTree$Leaf(
									$author$project$Types$OpLeaf($author$project$Types$Range)))))),
				$author$project$CodeTree$Tree(
					_Utils_Tuple2(
						$author$project$CodeTree$Tree(
							_Utils_Tuple2(
								$author$project$CodeTree$Tree(
									_Utils_Tuple2(
										$author$project$CodeTree$Leaf(
											$author$project$Types$OpLeaf($author$project$Types$Modulo)),
										$author$project$CodeTree$Leaf(
											$author$project$Types$OpLeaf($author$project$Types$Increment)))),
								$author$project$CodeTree$Tree(
									_Utils_Tuple2(
										$author$project$CodeTree$Leaf(
											$author$project$Types$OpLeaf($author$project$Types$Subtract)),
										$author$project$CodeTree$Tree(
											_Utils_Tuple2(
												$author$project$CodeTree$Leaf(
													$author$project$Types$OpLeaf($author$project$Types$TernaryCondition)),
												$author$project$CodeTree$Leaf(
													$author$project$Types$OpLeaf($author$project$Types$Cast)))))))),
						$author$project$CodeTree$Tree(
							_Utils_Tuple2(
								$author$project$CodeTree$Leaf(
									$author$project$Types$OpLeaf($author$project$Types$Equality)),
								$author$project$CodeTree$Leaf(
									$author$project$Types$OpLeaf($author$project$Types$Separator))))))))));
var $author$project$CodeTree$inverseOpTree = $author$project$CodeTree$invertCodeTree($author$project$CodeTree$opTree);
var $author$project$Types$TasteBoolean = {$: 'TasteBoolean'};
var $author$project$Types$TasteFunction = {$: 'TasteFunction'};
var $author$project$Types$TasteListSignal = {$: 'TasteListSignal'};
var $author$project$Types$TasteNumeric = {$: 'TasteNumeric'};
var $author$project$Types$TasteString = {$: 'TasteString'};
var $author$project$Types$TypeLeaf = function (a) {
	return {$: 'TypeLeaf', a: a};
};
var $author$project$CodeTree$typeTree = $author$project$CodeTree$Tree(
	_Utils_Tuple2(
		$author$project$CodeTree$Leaf(
			$author$project$Types$TypeLeaf($author$project$Types$TasteNumeric)),
		$author$project$CodeTree$Tree(
			_Utils_Tuple2(
				$author$project$CodeTree$Leaf(
					$author$project$Types$TypeLeaf($author$project$Types$TasteListSignal)),
				$author$project$CodeTree$Tree(
					_Utils_Tuple2(
						$author$project$CodeTree$Tree(
							_Utils_Tuple2(
								$author$project$CodeTree$Leaf(
									$author$project$Types$TypeLeaf($author$project$Types$TasteFunction)),
								$author$project$CodeTree$Leaf(
									$author$project$Types$TypeLeaf($author$project$Types$TasteBoolean)))),
						$author$project$CodeTree$Leaf(
							$author$project$Types$TypeLeaf($author$project$Types$TasteString))))))));
var $author$project$CodeTree$inverseTypeTree = $author$project$CodeTree$invertCodeTree($author$project$CodeTree$typeTree);
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$CodeTree$invertFind = F2(
	function (ict, leaf) {
		return A2(
			$elm$core$Maybe$map,
			$elm$core$Tuple$first,
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (x) {
						return _Utils_eq(x.b, leaf);
					},
					ict)));
	});
var $author$project$CodeTree$invertInstruction = function (ins) {
	var tree = function () {
		switch (ins.$) {
			case 'TypeLeaf':
				return $author$project$CodeTree$inverseTypeTree;
			case 'OpLeaf':
				return $author$project$CodeTree$inverseOpTree;
			default:
				return $author$project$CodeTree$inverseDataTree;
		}
	}();
	return A2($author$project$CodeTree$invertFind, tree, ins);
};
var $author$project$Evaluate$Evaluation = function (a) {
	return {$: 'Evaluation', a: a};
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Types$leafToString = function (leaf) {
	switch (leaf.$) {
		case 'DataLeaf':
			var data = leaf.a;
			switch (data.$) {
				case 'Zero':
					return '0';
				case 'One':
					return '1';
				case 'Two':
					return '2';
				case 'Three':
					return '3';
				case 'Four':
					return '4';
				case 'Five':
					return '5';
				case 'Ten':
					return '10';
				case 'RegX':
					return 'x';
				case 'RegY':
					return 'y';
				case 'RegZ':
					return 'z';
				case 'Function':
					return '{';
				case 'Context':
					return '(';
				case 'OperatorSignal':
					return 'o?';
				case 'Operator':
					var op = data.a;
					return 'o' + $author$project$Types$leafToString(
						$author$project$Types$OpLeaf(op));
				case 'VectorOperatorSignal':
					return 'v?';
				case 'VectorOperator':
					var op = data.a;
					return 'v' + $author$project$Types$leafToString(
						$author$project$Types$OpLeaf(op));
				default:
					return 'i?';
			}
		case 'OpLeaf':
			var op = leaf.a;
			switch (op.$) {
				case 'Add':
					return '+';
				case 'Subtract':
					return '-';
				case 'Multiply':
					return '*';
				case 'Divide':
					return '/';
				case 'Modulo':
					return '%';
				case 'Increment':
					return '#';
				case 'Range':
					return 'r';
				case 'Equality':
					return '=';
				case 'Terminate':
					return '}';
				case 'SaveY':
					return 'Y';
				case 'SaveZ':
					return 'Z';
				case 'Separator':
					return ';';
				case 'Cast':
					return 'c';
				case 'TernaryCondition':
					return '?';
				default:
					return '(BaseOperation)';
			}
		default:
			var typ = leaf.a;
			switch (typ.$) {
				case 'TasteNumeric':
					return 'N';
				case 'TasteFunction':
					return 'F';
				case 'TasteBoolean':
					return 'B';
				case 'TasteString':
					return 'S';
				case 'TasteListSignal':
					return 'L';
				default:
					return 'L[' + ($author$project$Types$leafToString(
						$author$project$Types$TypeLeaf(typ)) + ']');
			}
	}
};
var $author$project$Atom$atomToString = function (atom) {
	switch (atom.$) {
		case 'TypeInteger':
			var i = atom.a;
			return $elm$core$String$fromInt(i);
		case 'TypeFloat':
			var f = atom.a;
			return $elm$core$String$fromFloat(f);
		case 'TypeBoolean':
			var b = atom.a;
			return b ? 'true' : 'false';
		case 'TypeString':
			var s = atom.a;
			return s;
		case 'TypeList':
			var l = atom.a;
			return '[' + (A2(
				$elm$core$String$join,
				' ',
				A2($elm$core$List$map, $author$project$Atom$atomToString, l)) + ']');
		case 'TypeFunction':
			var fn = atom.a;
			return '{ ' + (A2(
				$elm$core$String$join,
				' ',
				A2($elm$core$List$map, $author$project$Types$leafToString, fn)) + ' }');
		default:
			var s = atom.a;
			return 'Error: ' + s;
	}
};
var $author$project$Types$Operator = function (a) {
	return {$: 'Operator', a: a};
};
var $author$project$Types$TasteList = function (a) {
	return {$: 'TasteList', a: a};
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Util$dropLast = F2(
	function (n, vec) {
		return A2(
			$elm$core$List$take,
			$elm$core$List$length(vec) - n,
			vec);
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$Util$lastElement = A2(
	$elm$core$List$foldl,
	A2($elm$core$Basics$composeR, $elm$core$Maybe$Just, $elm$core$Basics$always),
	$elm$core$Maybe$Nothing);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Decode$getDataType = F2(
	function (state, dat) {
		switch (dat.$) {
			case 'RegX':
				return $author$project$Types$TasteNumeric;
			case 'RegY':
				return $author$project$Types$TasteNumeric;
			case 'RegZ':
				return $author$project$Types$TasteNumeric;
			case 'Zero':
				return $author$project$Types$TasteNumeric;
			case 'One':
				return $author$project$Types$TasteNumeric;
			case 'Two':
				return $author$project$Types$TasteNumeric;
			case 'Three':
				return $author$project$Types$TasteNumeric;
			case 'Four':
				return $author$project$Types$TasteNumeric;
			case 'Five':
				return $author$project$Types$TasteNumeric;
			case 'Ten':
				return $author$project$Types$TasteNumeric;
			case 'Function':
				return $author$project$Types$TasteFunction;
			case 'Context':
				return $author$project$Types$TasteNumeric;
			case 'OperatorSignal':
				return $author$project$Types$TasteFunction;
			case 'VectorOperatorSignal':
				return $author$project$Types$TasteFunction;
			case 'Operator':
				return $author$project$Types$TasteFunction;
			case 'VectorOperator':
				return $author$project$Types$TasteFunction;
			default:
				return A2(
					$elm$core$Maybe$withDefault,
					$author$project$Types$TasteNumeric,
					$author$project$Util$lastElement(state.typeStack));
		}
	});
var $author$project$Decode$arityOf = function (op) {
	switch (op.$) {
		case 'Range':
			return 1;
		case 'Increment':
			return 1;
		case 'Add':
			return 2;
		case 'Subtract':
			return 2;
		case 'Multiply':
			return 2;
		case 'Divide':
			return 2;
		case 'Modulo':
			return 2;
		case 'Separator':
			return 2;
		case 'Cast':
			return 1;
		case 'Equality':
			return 2;
		case 'SaveY':
			return 1;
		case 'SaveZ':
			return 1;
		case 'TernaryCondition':
			return 3;
		case 'BaseOperation':
			return 1;
		default:
			return 0;
	}
};
var $author$project$Decode$isDone = F2(
	function (op, types) {
		var _v0 = _Utils_Tuple2(op, types);
		var currentArity = $elm$core$List$length(
			A2($author$project$Util$debug, 'Check if done (types)', types));
		return _Utils_eq(
			currentArity,
			$author$project$Decode$arityOf(op));
	});
var $author$project$Types$BaseOperation = {$: 'BaseOperation'};
var $author$project$Decode$newParseState = F2(
	function (tree, bits) {
		return {argList: _List_Nil, bits: bits, endOnFirst: false, op: $author$project$Types$BaseOperation, result: _List_Nil, target: tree, typeStack: _List_Nil};
	});
var $author$project$Decode$returnType = F2(
	function (op, types) {
		var _v0 = _Utils_Tuple2(op, types);
		_v0$2:
		while (true) {
			if (_v0.b.b) {
				if (!_v0.b.b.b) {
					if (_v0.a.$ === 'BaseOperation') {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						var x = _v2.a;
						return x;
					} else {
						break _v0$2;
					}
				} else {
					if ((((_v0.a.$ === 'Multiply') && (_v0.b.a.$ === 'TasteNumeric')) && (_v0.b.b.a.$ === 'TasteFunction')) && (!_v0.b.b.b.b)) {
						var _v3 = _v0.a;
						var _v4 = _v0.b;
						var _v5 = _v4.a;
						var _v6 = _v4.b;
						var _v7 = _v6.a;
						return $author$project$Types$TasteList($author$project$Types$TasteNumeric);
					} else {
						break _v0$2;
					}
				}
			} else {
				break _v0$2;
			}
		}
		return $author$project$Types$TasteNumeric;
	});
var $author$project$Decode$decodeLeaf = F2(
	function (state, leaf) {
		var augmented = function () {
			var _v7 = A2($author$project$Util$debug, 'leaf', leaf);
			switch (_v7.$) {
				case 'TypeLeaf':
					return state;
				case 'OpLeaf':
					var op = _v7.a;
					return _Utils_update(
						state,
						{op: op});
				default:
					var td = _v7.a;
					return _Utils_update(
						state,
						{
							argList: _Utils_ap(
								state.argList,
								_List_fromArray(
									[
										A2($author$project$Decode$getDataType, state, td)
									]))
						});
			}
		}();
		var nextState = A2(
			$author$project$Decode$isDone,
			augmented.op,
			A2($author$project$Util$debug, '-- arg list --', augmented.argList)) ? _Utils_update(
			augmented,
			{
				argList: _List_fromArray(
					[
						A2($author$project$Decode$returnType, augmented.op, augmented.argList)
					]),
				target: $author$project$CodeTree$opTree,
				typeStack: _List_Nil
			}) : _Utils_update(
			augmented,
			{target: $author$project$CodeTree$dataTree});
		if (_Utils_eq(
			leaf,
			$author$project$Types$DataLeaf($author$project$Types$Function)) || _Utils_eq(
			leaf,
			$author$project$Types$DataLeaf($author$project$Types$Context))) {
			var subStep = function () {
				var _v5 = A2($author$project$Util$debug, 'before function sub-step', 0);
				return A2(
					$author$project$Util$debug,
					'function sub-step!!!!',
					$author$project$Decode$decodeStep(
						A2($author$project$Decode$newParseState, $author$project$CodeTree$dataTree, state.bits)));
			}();
			return _Utils_update(
				nextState,
				{
					bits: subStep.bits,
					result: _Utils_ap(
						nextState.result,
						A2(
							$elm$core$List$cons,
							leaf,
							_Utils_ap(
								subStep.result,
								_List_fromArray(
									[
										$author$project$Types$OpLeaf($author$project$Types$Terminate)
									]))))
				});
		} else {
			if (_Utils_eq(
				leaf,
				$author$project$Types$DataLeaf($author$project$Types$Input)) || _Utils_eq(
				leaf,
				$author$project$Types$OpLeaf($author$project$Types$Cast))) {
				var subStep = $author$project$Decode$decodeStep(
					A2($author$project$Decode$newParseState, $author$project$CodeTree$typeTree, state.bits));
				return _Utils_update(
					nextState,
					{
						argList: _Utils_ap(
							A2($author$project$Util$dropLast, 1, nextState.argList),
							A2(
								$elm$core$List$filterMap,
								function (x) {
									if (x.$ === 'TypeLeaf') {
										var tasteType = x.a;
										return $elm$core$Maybe$Just(tasteType);
									} else {
										return $elm$core$Maybe$Nothing;
									}
								},
								subStep.result)),
						bits: subStep.bits,
						result: _Utils_ap(
							nextState.result,
							A2($elm$core$List$cons, leaf, subStep.result))
					});
			} else {
				if (_Utils_eq(
					leaf,
					$author$project$Types$DataLeaf($author$project$Types$OperatorSignal))) {
					var subState = A2($author$project$Decode$newParseState, $author$project$CodeTree$opTree, state.bits);
					var subStep = $author$project$Decode$decodeStep(
						_Utils_update(
							subState,
							{endOnFirst: true}));
					return _Utils_update(
						nextState,
						{
							bits: subStep.bits,
							result: _Utils_ap(
								nextState.result,
								_List_fromArray(
									[
										$author$project$Types$DataLeaf(
										$author$project$Types$Operator(subStep.op))
									]))
						});
				} else {
					return _Utils_update(
						nextState,
						{
							result: _Utils_ap(
								nextState.result,
								_List_fromArray(
									[leaf]))
						});
				}
			}
		}
	});
var $author$project$Decode$decodeStep = function (state) {
	decodeStep:
	while (true) {
		var _v0 = state.target;
		_v0$3:
		while (true) {
			if (_v0.$ === 'Tree') {
				var tree = _v0.a;
				var _v1 = state.bits;
				if (!_v1.b) {
					return state;
				} else {
					var head = _v1.a;
					var rest = _v1.b;
					var $temp$state = _Utils_update(
						state,
						{
							bits: rest,
							target: (!head) ? tree.a : tree.b
						});
					state = $temp$state;
					continue decodeStep;
				}
			} else {
				switch (_v0.a.$) {
					case 'OpLeaf':
						if (_v0.a.a.$ === 'Terminate') {
							var _v2 = _v0.a.a;
							return state;
						} else {
							break _v0$3;
						}
					case 'TypeLeaf':
						var tasteType = _v0.a.a;
						var _v3 = A2($author$project$Util$debug, '@##@#@#@# leaf taste type', tasteType);
						if (_v3.$ === 'TasteListSignal') {
							var subStep = $author$project$Decode$decodeStep(
								A2($author$project$Decode$newParseState, $author$project$CodeTree$typeTree, state.bits));
							var subType = function () {
								var _v4 = subStep.result;
								if (_v4.b && (_v4.a.$ === 'TypeLeaf')) {
									var a = _v4.a.a;
									return a;
								} else {
									return $author$project$Types$TasteNumeric;
								}
							}();
							return _Utils_update(
								state,
								{
									bits: subStep.bits,
									result: _Utils_ap(
										state.result,
										_List_fromArray(
											[
												$author$project$Types$TypeLeaf(
												$author$project$Types$TasteList(subType))
											]))
								});
						} else {
							return _Utils_update(
								state,
								{
									result: _Utils_ap(
										state.result,
										_List_fromArray(
											[
												$author$project$Types$TypeLeaf(tasteType)
											])),
									typeStack: _Utils_ap(
										state.typeStack,
										_List_fromArray(
											[tasteType]))
								});
						}
					default:
						break _v0$3;
				}
			}
		}
		var leaf = _v0.a;
		var decoded = A2($author$project$Decode$decodeLeaf, state, leaf);
		if (state.endOnFirst) {
			return decoded;
		} else {
			var $temp$state = decoded;
			state = $temp$state;
			continue decodeStep;
		}
	}
};
var $author$project$Decode$decode = function (bits) {
	return $author$project$Decode$decodeStep(
		A2($author$project$Decode$newParseState, $author$project$CodeTree$dataTree, bits)).result;
};
var $author$project$Atom$TypeInteger = function (a) {
	return {$: 'TypeInteger', a: a};
};
var $author$project$Evaluate$defaultState = function (input) {
	return {
		input: input,
		stack: _List_Nil,
		typeStack: _List_Nil,
		x: $author$project$Atom$TypeInteger(0),
		y: $author$project$Atom$TypeInteger(1),
		z: $author$project$Atom$TypeInteger(0)
	};
};
var $author$project$Atom$Error = function (a) {
	return {$: 'Error', a: a};
};
var $author$project$Atom$TypeBoolean = function (a) {
	return {$: 'TypeBoolean', a: a};
};
var $author$project$Atom$TypeFunction = function (a) {
	return {$: 'TypeFunction', a: a};
};
var $author$project$Atom$TypeList = function (a) {
	return {$: 'TypeList', a: a};
};
var $author$project$Atom$TypeString = function (a) {
	return {$: 'TypeString', a: a};
};
var $author$project$Evaluate$applyStack = function (_v0) {
	var state = _v0.a;
	var stack = _v0.b;
	return _Utils_update(
		state,
		{stack: stack});
};
var $author$project$Evaluate$atomHead = function (stack) {
	if (!stack.b) {
		return $author$project$Atom$Error('Function evaluated to empty stack');
	} else {
		var a = stack.a;
		return a;
	}
};
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$Atom$convertTo = F2(
	function (target, atom) {
		var _v0 = _Utils_Tuple2(target, atom);
		_v0$7:
		while (true) {
			switch (_v0.a.$) {
				case 'TasteBoolean':
					if (_v0.b.$ === 'TypeBoolean') {
						var _v4 = _v0.a;
						return atom;
					} else {
						break _v0$7;
					}
				case 'TasteFunction':
					if (_v0.b.$ === 'TypeFunction') {
						var _v5 = _v0.a;
						return atom;
					} else {
						break _v0$7;
					}
				case 'TasteNumeric':
					switch (_v0.b.$) {
						case 'TypeInteger':
							var _v2 = _v0.a;
							return atom;
						case 'TypeFloat':
							var _v3 = _v0.a;
							return atom;
						case 'TypeString':
							var _v6 = _v0.a;
							var str = _v0.b.a;
							return $author$project$Atom$TypeInteger(
								A2(
									$elm$core$Maybe$withDefault,
									0,
									$elm$core$String$toInt(str)));
						default:
							break _v0$7;
					}
				case 'TasteString':
					switch (_v0.b.$) {
						case 'TypeString':
							var _v1 = _v0.a;
							return atom;
						case 'TypeInteger':
							var _v7 = _v0.a;
							var _int = _v0.b.a;
							return $author$project$Atom$TypeString(
								$elm$core$String$fromInt(_int));
						default:
							break _v0$7;
					}
				default:
					break _v0$7;
			}
		}
		var a = _v0.a;
		var b = _v0.b;
		return $author$project$Atom$Error(
			'Cannot perform conversion ' + ($elm$core$Debug$toString(b) + (' -> ' + $elm$core$Debug$toString(a))));
	});
var $author$project$Evaluate$mismatchError = F2(
	function (op, operands) {
		return $author$project$Atom$Error(
			'Error { Mismatched types for ' + (op + (': ' + (A2(
				$elm$core$String$join,
				'; ',
				A2($elm$core$List$map, $author$project$Atom$atomToString, operands)) + '}'))));
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Evaluate$newStateWithX = F2(
	function (state, x) {
		return {input: state.input, stack: _List_Nil, typeStack: _List_Nil, x: x, y: state.y, z: state.z};
	});
var $author$project$Evaluate$newStateWithXY = F3(
	function (state, x, y) {
		return {input: state.input, stack: _List_Nil, typeStack: _List_Nil, x: x, y: y, z: state.z};
	});
var $author$project$Atom$TypeFloat = function (a) {
	return {$: 'TypeFloat', a: a};
};
var $author$project$Evaluate$inputError = function (input) {
	return _Utils_Tuple2(
		$author$project$Atom$Error('could not parse input'),
		input);
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$not = _Basics_not;
var $elm$core$String$fromList = _String_fromList;
var $author$project$Util$mapTupleSame3 = F2(
	function (fn, _v0) {
		var q = _v0.a;
		var w = _v0.b;
		var e = _v0.c;
		return _Utils_Tuple3(
			fn(q),
			fn(w),
			fn(e));
	});
var $author$project$Util$splitWhereMap = F3(
	function (cond, fld, seed) {
		return A2(
			$elm$core$Basics$composeR,
			A2(
				$elm$core$List$foldl,
				F2(
					function (v, state) {
						if (state.done) {
							return _Utils_update(
								state,
								{
									tail: _Utils_ap(
										state.tail,
										_List_fromArray(
											[v]))
								});
						} else {
							var nextFocus = A2(fld, v, state.focus);
							var isDone = cond(nextFocus);
							return isDone ? _Utils_update(
								state,
								{
									done: isDone,
									focus: nextFocus,
									mid: _List_fromArray(
										[v])
								}) : _Utils_update(
								state,
								{
									done: isDone,
									focus: nextFocus,
									head: _Utils_ap(
										state.head,
										_List_fromArray(
											[v]))
								});
						}
					}),
				{done: false, focus: seed, head: _List_Nil, mid: _List_Nil, tail: _List_Nil}),
			function (x) {
				return _Utils_Tuple3(x.head, x.mid, x.tail);
			});
	});
var $author$project$Util$splitWhere = F2(
	function (cond, vec) {
		if (!vec.b) {
			return _Utils_Tuple3(_List_Nil, _List_Nil, _List_Nil);
		} else {
			if (!vec.b.b) {
				var k = vec.a;
				return cond(k) ? _Utils_Tuple3(
					_List_Nil,
					_List_fromArray(
						[k]),
					_List_Nil) : _Utils_Tuple3(
					_List_fromArray(
						[k]),
					_List_Nil,
					_List_Nil);
			} else {
				var head = vec.a;
				return A4(
					$author$project$Util$splitWhereMap,
					cond,
					F2(
						function (a, _v1) {
							return a;
						}),
					head,
					vec);
			}
		}
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$Util$splitWhereString = function (cond) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$String$toList,
		A2(
			$elm$core$Basics$composeR,
			$author$project$Util$splitWhere(cond),
			$author$project$Util$mapTupleSame3($elm$core$String$fromList)));
};
var $elm$core$String$toFloat = _String_toFloat;
var $elm$core$String$trimLeft = _String_trimLeft;
var $author$project$Evaluate$parseNumeric = function (input) {
	var isNegative = A2($elm$core$String$startsWith, '-', input) || A2($elm$core$String$startsWith, '_', input);
	var sign = isNegative ? (-1) : 1;
	var _v0 = A2(
		$author$project$Util$splitWhereString,
		A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$Char$isDigit),
		isNegative ? A2($elm$core$String$dropLeft, 1, input) : input);
	var digits = _v0.a;
	var mid = _v0.b;
	var rest = _v0.c;
	var trueRest = _Utils_ap(mid, rest);
	var isDecimal = A2($elm$core$String$startsWith, '.', trueRest);
	if (isDecimal) {
		var _v1 = A2(
			$author$project$Util$splitWhereString,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$Char$isDigit),
			A2($elm$core$String$dropLeft, 1, trueRest));
		var decimalDigits = _v1.a;
		var midAfterDecimal = _v1.b;
		var restAfterDecimal = _v1.c;
		return _Utils_Tuple2(
			$author$project$Atom$TypeFloat(
				sign * A2(
					$elm$core$Maybe$withDefault,
					0.0,
					$elm$core$String$toFloat(digits + ('.' + decimalDigits)))),
			_Utils_ap(
				$elm$core$String$trimLeft(midAfterDecimal),
				restAfterDecimal));
	} else {
		return _Utils_Tuple2(
			$author$project$Atom$TypeInteger(
				sign * A2(
					$elm$core$Maybe$withDefault,
					0,
					$elm$core$String$toInt(digits))),
			$elm$core$String$trimLeft(trueRest));
	}
};
var $author$project$Evaluate$parseInput = F2(
	function (tasteType, input) {
		var _v0 = A2($author$project$Util$debug, 'input type:', tasteType);
		_v0$3:
		while (true) {
			switch (_v0.$) {
				case 'TasteNumeric':
					return $author$project$Evaluate$parseNumeric(input);
				case 'TasteString':
					var _v1 = A2(
						$author$project$Util$splitWhereString,
						function (ch) {
							return _Utils_eq(
								ch,
								_Utils_chr('\n'));
						},
						input);
					var line = _v1.a;
					var rest = _v1.c;
					return _Utils_Tuple2(
						$author$project$Atom$TypeString(line),
						rest);
				case 'TasteList':
					if (_v0.a.$ === 'TasteNumeric') {
						var _v2 = _v0.a;
						var _v3 = A2(
							$author$project$Util$splitWhereString,
							function (ch) {
								return _Utils_eq(
									ch,
									_Utils_chr('\n'));
							},
							input);
						var line = _v3.a;
						var rest = _v3.c;
						var nums = $author$project$Atom$TypeList(
							A2(
								$elm$core$List$map,
								function (n) {
									return _Utils_eq(
										$elm$core$Basics$ceiling(n),
										$elm$core$Basics$floor(n)) ? $author$project$Atom$TypeInteger(
										$elm$core$Basics$floor(n)) : $author$project$Atom$TypeFloat(n);
								},
								A2(
									$elm$core$List$filterMap,
									$elm$core$String$toFloat,
									A2($elm$core$String$split, ' ', line))));
						return _Utils_Tuple2(nums, rest);
					} else {
						break _v0$3;
					}
				default:
					break _v0$3;
			}
		}
		return $author$project$Evaluate$inputError(input);
	});
var $author$project$Evaluate$popType = function (state) {
	var _v0 = function () {
		var _v1 = state.typeStack;
		if (!_v1.b) {
			return _Utils_Tuple2($elm$core$Maybe$Nothing, state.typeStack);
		} else {
			var head = _v1.a;
			var rest = _v1.b;
			return _Utils_Tuple2(
				$elm$core$Maybe$Just(head),
				rest);
		}
	}();
	var tasteType = _v0.a;
	var typeStack = _v0.b;
	return A2(
		$author$project$Util$debug,
		'popped:',
		_Utils_Tuple2(
			tasteType,
			_Utils_update(
				state,
				{typeStack: typeStack})));
};
var $author$project$Evaluate$pushType = F2(
	function (tasteType, state) {
		return _Utils_update(
			state,
			{
				typeStack: A2($elm$core$List$cons, tasteType, state.typeStack)
			});
	});
var $author$project$Evaluate$transformDepth = F2(
	function (op, depth) {
		_v0$3:
		while (true) {
			switch (op.$) {
				case 'DataLeaf':
					switch (op.a.$) {
						case 'Function':
							var _v1 = op.a;
							return depth + 1;
						case 'Context':
							var _v2 = op.a;
							return depth + 1;
						default:
							break _v0$3;
					}
				case 'OpLeaf':
					if (op.a.$ === 'Terminate') {
						var _v3 = op.a;
						return depth - 1;
					} else {
						break _v0$3;
					}
				default:
					break _v0$3;
			}
		}
		return depth;
	});
var $author$project$Evaluate$readBalanced = A3(
	$author$project$Util$splitWhereMap,
	$elm$core$Basics$eq(0),
	$author$project$Evaluate$transformDepth,
	1);
var $elm$core$String$reverse = _String_reverse;
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Util$splitSlicesHelper = F3(
	function (by, vec, build) {
		splitSlicesHelper:
		while (true) {
			if (_Utils_cmp(
				$elm$core$List$length(build),
				by) < 0) {
				if (!vec.b) {
					return $elm$core$List$isEmpty(build) ? _List_Nil : _List_fromArray(
						[build]);
				} else {
					var head = vec.a;
					var rest = vec.b;
					var $temp$by = by,
						$temp$vec = rest,
						$temp$build = _Utils_ap(
						build,
						_List_fromArray(
							[head]));
					by = $temp$by;
					vec = $temp$vec;
					build = $temp$build;
					continue splitSlicesHelper;
				}
			} else {
				return A2(
					$elm$core$List$cons,
					build,
					A3($author$project$Util$splitSlicesHelper, by, vec, _List_Nil));
			}
		}
	});
var $author$project$Util$splitSlices = F2(
	function (by, vec) {
		return A3($author$project$Util$splitSlicesHelper, by, vec, _List_Nil);
	});
var $author$project$Util$splitChunk = F2(
	function (into, vec) {
		var size = $elm$core$List$length(vec);
		var eachChunk = $elm$core$Basics$ceiling(size / into);
		return A2($author$project$Util$splitSlices, eachChunk, vec);
	});
var $author$project$Atom$truthiness = function (atom) {
	switch (atom.$) {
		case 'TypeInteger':
			var i = atom.a;
			return $author$project$Atom$TypeBoolean(i > 0);
		case 'TypeFloat':
			var f = atom.a;
			return $author$project$Atom$TypeBoolean(f > 0);
		case 'TypeBoolean':
			var b = atom.a;
			return $author$project$Atom$TypeBoolean(b);
		case 'TypeString':
			var s = atom.a;
			return $author$project$Atom$TypeBoolean(
				$elm$core$String$length(s) > 0);
		case 'TypeList':
			var l = atom.a;
			return $author$project$Atom$TypeBoolean(
				$elm$core$List$length(l) > 0);
		case 'TypeFunction':
			return $author$project$Atom$TypeBoolean(true);
		default:
			return atom;
	}
};
var $author$project$Evaluate$evaluateAt = F3(
	function (fn, state, el) {
		return A2(
			$author$project$Evaluate$evaluateToAtom,
			fn,
			A2($author$project$Evaluate$newStateWithX, state, el));
	});
var $author$project$Evaluate$evaluateAt2 = F4(
	function (fn, state, x, y) {
		return A2(
			$author$project$Evaluate$evaluateToAtom,
			fn,
			A3($author$project$Evaluate$newStateWithXY, state, x, y));
	});
var $author$project$Evaluate$evaluateInstruction = F2(
	function (state, op) {
		_v11$26:
		while (true) {
			switch (op.$) {
				case 'TypeLeaf':
					var typ = op.a;
					return A2($author$project$Evaluate$pushType, typ, state);
				case 'DataLeaf':
					switch (op.a.$) {
						case 'Zero':
							var _v12 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2(
										$elm$core$List$cons,
										$author$project$Atom$TypeInteger(0),
										state.stack)
								});
						case 'One':
							var _v13 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2(
										$elm$core$List$cons,
										$author$project$Atom$TypeInteger(1),
										state.stack)
								});
						case 'Two':
							var _v14 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2(
										$elm$core$List$cons,
										$author$project$Atom$TypeInteger(2),
										state.stack)
								});
						case 'Three':
							var _v15 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2(
										$elm$core$List$cons,
										$author$project$Atom$TypeInteger(3),
										state.stack)
								});
						case 'Four':
							var _v16 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2(
										$elm$core$List$cons,
										$author$project$Atom$TypeInteger(4),
										state.stack)
								});
						case 'Five':
							var _v17 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2(
										$elm$core$List$cons,
										$author$project$Atom$TypeInteger(5),
										state.stack)
								});
						case 'Ten':
							var _v18 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2(
										$elm$core$List$cons,
										$author$project$Atom$TypeInteger(10),
										state.stack)
								});
						case 'RegX':
							var _v19 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2($elm$core$List$cons, state.x, state.stack)
								});
						case 'RegY':
							var _v20 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2($elm$core$List$cons, state.y, state.stack)
								});
						case 'RegZ':
							var _v21 = op.a;
							return _Utils_update(
								state,
								{
									stack: A2($elm$core$List$cons, state.z, state.stack)
								});
						case 'Input':
							var _v22 = op.a;
							var _v23 = $author$project$Evaluate$popType(state);
							var tasteType = _v23.a;
							var nextState = _v23.b;
							var finalType = A2($elm$core$Maybe$withDefault, $author$project$Types$TasteNumeric, tasteType);
							var _v24 = A2($author$project$Evaluate$parseInput, finalType, nextState.input);
							var element = _v24.a;
							var nextInput = _v24.b;
							return _Utils_update(
								nextState,
								{
									input: nextInput,
									stack: A2($elm$core$List$cons, element, state.stack)
								});
						case 'Operator':
							var innerOp = op.a.a;
							return _Utils_update(
								state,
								{
									stack: function () {
										var _v25 = $author$project$Decode$arityOf(innerOp);
										switch (_v25) {
											case 1:
												return A2(
													$elm$core$List$cons,
													$author$project$Atom$TypeFunction(
														_List_fromArray(
															[
																$author$project$Types$DataLeaf($author$project$Types$RegX),
																$author$project$Types$OpLeaf(innerOp)
															])),
													state.stack);
											case 2:
												return A2(
													$elm$core$List$cons,
													$author$project$Atom$TypeFunction(
														_List_fromArray(
															[
																$author$project$Types$DataLeaf($author$project$Types$RegX),
																$author$project$Types$DataLeaf($author$project$Types$RegY),
																$author$project$Types$OpLeaf(innerOp)
															])),
													state.stack);
											default:
												var arity = _v25;
												return A2(
													$elm$core$List$cons,
													$author$project$Atom$Error(
														'Cannot have `o` with operator arity ' + $elm$core$String$fromInt(arity)),
													state.stack);
										}
									}()
								});
						default:
							break _v11$26;
					}
				default:
					switch (op.a.$) {
						case 'Cast':
							var _v26 = op.a;
							var _v27 = $author$project$Evaluate$popType(state);
							var tasteType = _v27.a;
							var nextState = _v27.b;
							var finalType = A2($elm$core$Maybe$withDefault, $author$project$Types$TasteNumeric, tasteType);
							var _v28 = nextState.stack;
							if (!_v28.b) {
								return nextState;
							} else {
								var a = _v28.a;
								var rest = _v28.b;
								return _Utils_update(
									nextState,
									{
										stack: A2(
											$elm$core$List$cons,
											A2($author$project$Atom$convertTo, finalType, a),
											rest)
									});
							}
						case 'SaveY':
							var _v29 = op.a;
							var _v30 = state.stack;
							if (!_v30.b) {
								return state;
							} else {
								var a = _v30.a;
								return _Utils_update(
									state,
									{y: a});
							}
						case 'SaveZ':
							var _v31 = op.a;
							var _v32 = state.stack;
							if (!_v32.b) {
								return state;
							} else {
								var a = _v32.a;
								return _Utils_update(
									state,
									{z: a});
							}
						case 'Add':
							var _v33 = op.a;
							return $author$project$Evaluate$applyStack(
								function () {
									var _v34 = state.stack;
									_v34$1:
									while (true) {
										_v34$8:
										while (true) {
											if (!_v34.b) {
												return _Utils_Tuple2(state, _List_Nil);
											} else {
												if (!_v34.b.b) {
													if (_v34.a.$ === 'Error') {
														break _v34$1;
													} else {
														return _Utils_Tuple2(
															state,
															_List_fromArray(
																[
																	$author$project$Atom$Error('Insufficient Arguments')
																]));
													}
												} else {
													switch (_v34.b.a.$) {
														case 'TypeInteger':
															switch (_v34.a.$) {
																case 'Error':
																	break _v34$1;
																case 'TypeInteger':
																	var b = _v34.a.a;
																	var _v35 = _v34.b;
																	var a = _v35.a.a;
																	var rest = _v35.b;
																	return _Utils_Tuple2(
																		state,
																		A2(
																			$elm$core$List$cons,
																			$author$project$Atom$TypeInteger(a + b),
																			rest));
																default:
																	break _v34$8;
															}
														case 'TypeString':
															switch (_v34.a.$) {
																case 'Error':
																	break _v34$1;
																case 'TypeString':
																	var b = _v34.a.a;
																	var _v36 = _v34.b;
																	var a = _v36.a.a;
																	var rest = _v36.b;
																	return _Utils_Tuple2(
																		state,
																		A2(
																			$elm$core$List$cons,
																			$author$project$Atom$TypeString(
																				_Utils_ap(a, b)),
																			rest));
																default:
																	break _v34$8;
															}
														case 'TypeList':
															switch (_v34.a.$) {
																case 'Error':
																	break _v34$1;
																case 'TypeFunction':
																	var fn = _v34.a.a;
																	var _v37 = _v34.b;
																	var v = _v37.a.a;
																	var rest = _v37.b;
																	var _v38 = A3($author$project$Evaluate$stateMap, fn, state, v);
																	var returnState = _v38.a;
																	var mapped = _v38.b;
																	return _Utils_Tuple2(
																		returnState,
																		A2(
																			$elm$core$List$cons,
																			$author$project$Atom$TypeList(mapped),
																			rest));
																case 'TypeList':
																	var b = _v34.a.a;
																	var _v39 = _v34.b;
																	var a = _v39.a.a;
																	var rest = _v39.b;
																	return _Utils_Tuple2(
																		state,
																		A2(
																			$elm$core$List$cons,
																			$author$project$Atom$TypeList(
																				_Utils_ap(a, b)),
																			rest));
																default:
																	var any = _v34.a;
																	var _v40 = _v34.b;
																	var arr = _v40.a.a;
																	var rest = _v40.b;
																	return _Utils_Tuple2(
																		state,
																		A2(
																			$elm$core$List$cons,
																			$author$project$Atom$TypeList(
																				_Utils_ap(
																					arr,
																					_List_fromArray(
																						[any]))),
																			rest));
															}
														default:
															if (_v34.a.$ === 'Error') {
																break _v34$1;
															} else {
																break _v34$8;
															}
													}
												}
											}
										}
										var b = _v34.a;
										var _v41 = _v34.b;
										var a = _v41.a;
										var rest = _v41.b;
										return _Utils_Tuple2(
											state,
											A2(
												$elm$core$List$cons,
												A2(
													$author$project$Evaluate$mismatchError,
													'Add',
													_List_fromArray(
														[a, b])),
												rest));
									}
									return _Utils_Tuple2(state, state.stack);
								}());
						case 'Subtract':
							var _v42 = op.a;
							return $author$project$Evaluate$applyStack(
								function () {
									var _v43 = state.stack;
									_v43$1:
									while (true) {
										_v43$4:
										while (true) {
											if (!_v43.b) {
												return _Utils_Tuple2(state, _List_Nil);
											} else {
												if (!_v43.b.b) {
													if (_v43.a.$ === 'Error') {
														break _v43$1;
													} else {
														return _Utils_Tuple2(
															state,
															_List_fromArray(
																[
																	$author$project$Atom$Error('Insufficient Arguments')
																]));
													}
												} else {
													switch (_v43.a.$) {
														case 'Error':
															break _v43$1;
														case 'TypeInteger':
															if (_v43.b.a.$ === 'TypeInteger') {
																var b = _v43.a.a;
																var _v44 = _v43.b;
																var a = _v44.a.a;
																var rest = _v44.b;
																return _Utils_Tuple2(
																	state,
																	A2(
																		$elm$core$List$cons,
																		$author$project$Atom$TypeInteger(a - b),
																		rest));
															} else {
																break _v43$4;
															}
														default:
															break _v43$4;
													}
												}
											}
										}
										var b = _v43.a;
										var _v45 = _v43.b;
										var a = _v45.a;
										var rest = _v45.b;
										return _Utils_Tuple2(
											state,
											A2(
												$elm$core$List$cons,
												A2(
													$author$project$Evaluate$mismatchError,
													'Subtract',
													_List_fromArray(
														[a, b])),
												rest));
									}
									return _Utils_Tuple2(state, state.stack);
								}());
						case 'Multiply':
							var _v46 = op.a;
							return $author$project$Evaluate$applyStack(
								function () {
									var _v47 = state.stack;
									_v47$1:
									while (true) {
										_v47$4:
										while (true) {
											if (!_v47.b) {
												return _Utils_Tuple2(state, _List_Nil);
											} else {
												if (!_v47.b.b) {
													if (_v47.a.$ === 'Error') {
														break _v47$1;
													} else {
														return _Utils_Tuple2(
															state,
															_List_fromArray(
																[
																	$author$project$Atom$Error('Insufficient Arguments')
																]));
													}
												} else {
													switch (_v47.a.$) {
														case 'Error':
															break _v47$1;
														case 'TypeFunction':
															if (_v47.b.a.$ === 'TypeInteger') {
																var fn = _v47.a.a;
																var _v48 = _v47.b;
																var n = _v48.a.a;
																var rest = _v48.b;
																var _v49 = A3(
																	$elm$core$List$foldl,
																	F2(
																		function (_v50, _v51) {
																			var innerState = _v51.a;
																			var build = _v51.b;
																			var _v52 = A2($author$project$Evaluate$evaluateToAtom, fn, innerState);
																			var nextInnerState = _v52.a;
																			var atom = _v52.b;
																			return _Utils_Tuple2(
																				nextInnerState,
																				_Utils_ap(
																					build,
																					_List_fromArray(
																						[atom])));
																		}),
																	_Utils_Tuple2(state, _List_Nil),
																	A2(
																		$elm$core$List$map,
																		$author$project$Atom$TypeInteger,
																		A2($elm$core$List$range, 1, n)));
																var returnState = _v49.a;
																var mapped = _v49.b;
																return _Utils_Tuple2(
																	returnState,
																	A2(
																		$elm$core$List$cons,
																		$author$project$Atom$TypeList(mapped),
																		rest));
															} else {
																break _v47$4;
															}
														default:
															break _v47$4;
													}
												}
											}
										}
										var second = _v47.a;
										var _v53 = _v47.b;
										var first = _v53.a;
										var rest = _v53.b;
										var value = function () {
											var _v54 = _Utils_Tuple2(first, second);
											_v54$4:
											while (true) {
												switch (_v54.a.$) {
													case 'TypeInteger':
														switch (_v54.b.$) {
															case 'TypeInteger':
																var a = _v54.a.a;
																var b = _v54.b.a;
																return $author$project$Atom$TypeInteger(a * b);
															case 'TypeBoolean':
																var a = _v54.a.a;
																var b = _v54.b.a;
																return $author$project$Atom$TypeInteger(
																	b ? a : 0);
															default:
																break _v54$4;
														}
													case 'TypeBoolean':
														switch (_v54.b.$) {
															case 'TypeInteger':
																var a = _v54.a.a;
																var b = _v54.b.a;
																return $author$project$Atom$TypeInteger(
																	a ? b : 0);
															case 'TypeBoolean':
																var a = _v54.a.a;
																var b = _v54.b.a;
																return $author$project$Atom$TypeBoolean(a && b);
															default:
																break _v54$4;
														}
													default:
														break _v54$4;
												}
											}
											var a = _v54.a;
											var b = _v54.b;
											return A2(
												$author$project$Evaluate$mismatchError,
												'Multiply',
												_List_fromArray(
													[a, b]));
										}();
										return _Utils_Tuple2(
											state,
											A2($elm$core$List$cons, value, rest));
									}
									return _Utils_Tuple2(state, state.stack);
								}());
						case 'Divide':
							var _v55 = op.a;
							return $author$project$Evaluate$applyStack(
								function () {
									var _v56 = state.stack;
									_v56$1:
									while (true) {
										_v56$6:
										while (true) {
											if (!_v56.b) {
												return _Utils_Tuple2(state, _List_Nil);
											} else {
												if (!_v56.b.b) {
													if (_v56.a.$ === 'Error') {
														break _v56$1;
													} else {
														return _Utils_Tuple2(
															state,
															_List_fromArray(
																[
																	$author$project$Atom$Error('Insufficient Arguments')
																]));
													}
												} else {
													switch (_v56.a.$) {
														case 'Error':
															break _v56$1;
														case 'TypeInteger':
															switch (_v56.b.a.$) {
																case 'TypeInteger':
																	var b = _v56.a.a;
																	var _v57 = _v56.b;
																	var a = _v57.a.a;
																	var rest = _v57.b;
																	return _Utils_Tuple2(
																		state,
																		A2(
																			$elm$core$List$cons,
																			$author$project$Atom$TypeInteger((a / b) | 0),
																			rest));
																case 'TypeList':
																	var n = _v56.a.a;
																	var _v58 = _v56.b;
																	var vec = _v58.a.a;
																	var rest = _v58.b;
																	return _Utils_Tuple2(
																		state,
																		A2(
																			$elm$core$List$cons,
																			$author$project$Atom$TypeList(
																				A2(
																					$elm$core$List$map,
																					$author$project$Atom$TypeList,
																					A2($author$project$Util$splitChunk, n, vec))),
																			rest));
																default:
																	break _v56$6;
															}
														case 'TypeFunction':
															if (_v56.b.a.$ === 'TypeList') {
																var fn = _v56.a.a;
																var _v59 = _v56.b;
																var vec = _v59.a.a;
																var rest = _v59.b;
																var _v60 = A4(
																	$author$project$Evaluate$stateFoldl,
																	fn,
																	state,
																	$author$project$Atom$TypeInteger(0),
																	vec);
																var returnState = _v60.a;
																var folded = _v60.b;
																return _Utils_Tuple2(
																	returnState,
																	A2($elm$core$List$cons, folded, rest));
															} else {
																break _v56$6;
															}
														default:
															break _v56$6;
													}
												}
											}
										}
										var b = _v56.a;
										var _v61 = _v56.b;
										var a = _v61.a;
										var rest = _v61.b;
										return _Utils_Tuple2(
											state,
											A2(
												$elm$core$List$cons,
												A2(
													$author$project$Evaluate$mismatchError,
													'Divide',
													_List_fromArray(
														[a, b])),
												rest));
									}
									return _Utils_Tuple2(state, state.stack);
								}());
						case 'Modulo':
							var _v62 = op.a;
							return $author$project$Evaluate$applyStack(
								function () {
									var _v63 = state.stack;
									_v63$1:
									while (true) {
										_v63$4:
										while (true) {
											if (!_v63.b) {
												return _Utils_Tuple2(state, _List_Nil);
											} else {
												if (!_v63.b.b) {
													if (_v63.a.$ === 'Error') {
														break _v63$1;
													} else {
														return _Utils_Tuple2(
															state,
															_List_fromArray(
																[
																	$author$project$Atom$Error('Insufficient Arguments')
																]));
													}
												} else {
													switch (_v63.a.$) {
														case 'Error':
															break _v63$1;
														case 'TypeInteger':
															if (_v63.b.a.$ === 'TypeInteger') {
																var b = _v63.a.a;
																var _v64 = _v63.b;
																var a = _v64.a.a;
																var rest = _v64.b;
																return _Utils_Tuple2(
																	state,
																	A2(
																		$elm$core$List$cons,
																		$author$project$Atom$TypeInteger(
																			(!b) ? 0 : A2($elm$core$Basics$modBy, b, a)),
																		rest));
															} else {
																break _v63$4;
															}
														default:
															break _v63$4;
													}
												}
											}
										}
										var b = _v63.a;
										var _v65 = _v63.b;
										var a = _v65.a;
										var rest = _v65.b;
										return _Utils_Tuple2(
											state,
											A2(
												$elm$core$List$cons,
												A2(
													$author$project$Evaluate$mismatchError,
													'Modulo',
													_List_fromArray(
														[a, b])),
												rest));
									}
									return _Utils_Tuple2(state, state.stack);
								}());
						case 'Equality':
							var _v66 = op.a;
							return $author$project$Evaluate$applyStack(
								function () {
									var _v67 = state.stack;
									_v67$1:
									while (true) {
										_v67$4:
										while (true) {
											if (!_v67.b) {
												return _Utils_Tuple2(state, _List_Nil);
											} else {
												if (!_v67.b.b) {
													if (_v67.a.$ === 'Error') {
														break _v67$1;
													} else {
														return _Utils_Tuple2(
															state,
															_List_fromArray(
																[
																	$author$project$Atom$Error('Insufficient Arguments')
																]));
													}
												} else {
													switch (_v67.a.$) {
														case 'Error':
															break _v67$1;
														case 'TypeInteger':
															if (_v67.b.a.$ === 'TypeInteger') {
																var b = _v67.a.a;
																var _v68 = _v67.b;
																var a = _v68.a.a;
																var rest = _v68.b;
																return _Utils_Tuple2(
																	state,
																	A2(
																		$elm$core$List$cons,
																		$author$project$Atom$TypeBoolean(
																			_Utils_eq(a, b)),
																		rest));
															} else {
																break _v67$4;
															}
														default:
															break _v67$4;
													}
												}
											}
										}
										var b = _v67.a;
										var _v69 = _v67.b;
										var a = _v69.a;
										var rest = _v69.b;
										return _Utils_Tuple2(
											state,
											A2(
												$elm$core$List$cons,
												A2(
													$author$project$Evaluate$mismatchError,
													'Equality',
													_List_fromArray(
														[a, b])),
												rest));
									}
									return _Utils_Tuple2(state, state.stack);
								}());
						case 'Separator':
							var _v70 = op.a;
							return $author$project$Evaluate$applyStack(
								function () {
									var _v71 = state.stack;
									_v71$1:
									while (true) {
										if (!_v71.b) {
											return _Utils_Tuple2(state, _List_Nil);
										} else {
											if (!_v71.b.b) {
												if (_v71.a.$ === 'Error') {
													break _v71$1;
												} else {
													return _Utils_Tuple2(state, state.stack);
												}
											} else {
												if (_v71.a.$ === 'Error') {
													break _v71$1;
												} else {
													var b = _v71.a;
													var _v72 = _v71.b;
													var rest = _v72.b;
													return _Utils_Tuple2(
														state,
														A2($elm$core$List$cons, b, rest));
												}
											}
										}
									}
									return _Utils_Tuple2(state, state.stack);
								}());
						case 'Increment':
							var _v73 = op.a;
							return _Utils_update(
								state,
								{
									stack: function () {
										var _v74 = state.stack;
										if (!_v74.b) {
											return _List_Nil;
										} else {
											switch (_v74.a.$) {
												case 'Error':
													return state.stack;
												case 'TypeInteger':
													var a = _v74.a.a;
													var rest = _v74.b;
													return A2(
														$elm$core$List$cons,
														$author$project$Atom$TypeInteger(a + 1),
														rest);
												case 'TypeList':
													var v = _v74.a.a;
													var rest = _v74.b;
													return A2(
														$elm$core$List$cons,
														$author$project$Atom$TypeInteger(
															$elm$core$List$length(v)),
														rest);
												case 'TypeString':
													var s = _v74.a.a;
													var rest = _v74.b;
													return A2(
														$elm$core$List$cons,
														$author$project$Atom$TypeInteger(
															$elm$core$String$length(s)),
														rest);
												default:
													var a = _v74.a;
													var rest = _v74.b;
													return A2(
														$elm$core$List$cons,
														A2(
															$author$project$Evaluate$mismatchError,
															'Increment',
															_List_fromArray(
																[a])),
														rest);
											}
										}
									}()
								});
						case 'Range':
							var _v75 = op.a;
							return _Utils_update(
								state,
								{
									stack: function () {
										var _v76 = state.stack;
										if (!_v76.b) {
											return _List_Nil;
										} else {
											switch (_v76.a.$) {
												case 'Error':
													return state.stack;
												case 'TypeInteger':
													var a = _v76.a.a;
													var rest = _v76.b;
													return A2(
														$elm$core$List$cons,
														$author$project$Atom$TypeList(
															A2(
																$elm$core$List$map,
																$author$project$Atom$TypeInteger,
																A2($elm$core$List$range, 0, a - 1))),
														rest);
												case 'TypeList':
													var v = _v76.a.a;
													var rest = _v76.b;
													return A2(
														$elm$core$List$cons,
														$author$project$Atom$TypeList(
															$elm$core$List$reverse(v)),
														rest);
												case 'TypeString':
													var s = _v76.a.a;
													var rest = _v76.b;
													return A2(
														$elm$core$List$cons,
														$author$project$Atom$TypeString(
															$elm$core$String$reverse(s)),
														rest);
												default:
													var rest = _v76.b;
													return A2(
														$elm$core$List$cons,
														$author$project$Atom$Error('Unrecognized Type (Range)'),
														rest);
											}
										}
									}()
								});
						case 'TernaryCondition':
							var _v77 = op.a;
							return $author$project$Evaluate$applyStack(
								function () {
									var _v78 = state.stack;
									_v78$1:
									while (true) {
										_v78$5:
										while (true) {
											if (!_v78.b) {
												return _Utils_Tuple2(state, _List_Nil);
											} else {
												if (!_v78.b.b) {
													if (_v78.a.$ === 'Error') {
														break _v78$1;
													} else {
														return _Utils_Tuple2(
															state,
															_List_fromArray(
																[
																	$author$project$Atom$Error('Insufficient Arguments')
																]));
													}
												} else {
													if (!_v78.b.b.b) {
														if (_v78.a.$ === 'Error') {
															break _v78$1;
														} else {
															var _v79 = _v78.b;
															return _Utils_Tuple2(
																state,
																_List_fromArray(
																	[
																		$author$project$Atom$Error('Insufficient Arguments')
																	]));
														}
													} else {
														switch (_v78.a.$) {
															case 'Error':
																break _v78$1;
															case 'TypeFunction':
																if (_v78.b.a.$ === 'TypeFunction') {
																	var c = _v78.a.a;
																	var _v80 = _v78.b;
																	var b = _v80.a.a;
																	var _v81 = _v80.b;
																	var a = _v81.a;
																	var rest = _v81.b;
																	var truth = $author$project$Atom$truthiness(a);
																	var _v82 = function () {
																		switch (truth.$) {
																			case 'TypeBoolean':
																				if (truth.a) {
																					return A3($author$project$Evaluate$evaluateAt, b, state, a);
																				} else {
																					return A3($author$project$Evaluate$evaluateAt, c, state, a);
																				}
																			case 'Error':
																				return _Utils_Tuple2(state, a);
																			default:
																				return _Utils_Tuple2(
																					state,
																					$author$project$Atom$Error('Unexpected truthiness conversion type'));
																		}
																	}();
																	var nextState = _v82.a;
																	var nextResult = _v82.b;
																	return _Utils_Tuple2(
																		nextState,
																		function () {
																			if (nextResult.$ === 'Error') {
																				return _List_fromArray(
																					[nextResult]);
																			} else {
																				return A2($elm$core$List$cons, nextResult, rest);
																			}
																		}());
																} else {
																	break _v78$5;
																}
															default:
																break _v78$5;
														}
													}
												}
											}
										}
										var c = _v78.a;
										var _v85 = _v78.b;
										var b = _v85.a;
										var _v86 = _v85.b;
										var a = _v86.a;
										var rest = _v86.b;
										return _Utils_Tuple2(
											state,
											A2(
												$elm$core$List$cons,
												A2(
													$author$project$Evaluate$mismatchError,
													'TernaryCondition',
													_List_fromArray(
														[a, b, c])),
												rest));
									}
									return _Utils_Tuple2(state, state.stack);
								}());
						default:
							break _v11$26;
					}
			}
		}
		return _Utils_update(
			state,
			{
				stack: A2(
					$elm$core$List$cons,
					$author$project$Atom$Error(
						'Unrecognized operator ' + $elm$core$Debug$toString(op)),
					state.stack)
			});
	});
var $author$project$Evaluate$evaluateStep = F2(
	function (ops, state) {
		evaluateStep:
		while (true) {
			_v6$3:
			while (true) {
				if (!ops.b) {
					return state;
				} else {
					if (ops.a.$ === 'DataLeaf') {
						switch (ops.a.a.$) {
							case 'Function':
								var _v7 = ops.a.a;
								var rest = ops.b;
								var _v8 = $author$project$Evaluate$readBalanced(rest);
								var fn = _v8.a;
								var next = _v8.c;
								var $temp$ops = next,
									$temp$state = _Utils_update(
									state,
									{
										stack: A2(
											$elm$core$List$cons,
											$author$project$Atom$TypeFunction(fn),
											state.stack)
									});
								ops = $temp$ops;
								state = $temp$state;
								continue evaluateStep;
							case 'Context':
								var _v9 = ops.a.a;
								var rest = ops.b;
								var _v10 = $author$project$Evaluate$readBalanced(rest);
								var fn = _v10.a;
								var next = _v10.c;
								var innerState = A2($author$project$Evaluate$evaluateStep, fn, state);
								var $temp$ops = next,
									$temp$state = _Utils_update(
									innerState,
									{stack: innerState.stack});
								ops = $temp$ops;
								state = $temp$state;
								continue evaluateStep;
							default:
								break _v6$3;
						}
					} else {
						break _v6$3;
					}
				}
			}
			var op = ops.a;
			var rest = ops.b;
			return A2(
				$author$project$Evaluate$evaluateStep,
				rest,
				A2($author$project$Evaluate$evaluateInstruction, state, op));
		}
	});
var $author$project$Evaluate$evaluateToAtom = F2(
	function (fn, state) {
		var nextState = A2($author$project$Evaluate$evaluateStep, fn, state);
		return _Utils_Tuple2(
			nextState,
			$author$project$Evaluate$atomHead(nextState.stack));
	});
var $author$project$Evaluate$stateFoldl = F4(
	function (fn, state, seed, vec) {
		var _v2 = function () {
			if (vec.b) {
				var head = vec.a;
				var rest = vec.b;
				return _Utils_Tuple2(head, rest);
			} else {
				return _Utils_Tuple2(seed, vec);
			}
		}();
		var trueSeed = _v2.a;
		var trueList = _v2.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (el, _v4) {
					var inner = _v4.a;
					var folding = _v4.b;
					var _v5 = A4($author$project$Evaluate$evaluateAt2, fn, inner, folding, el);
					var nextInner = _v5.a;
					var atom = _v5.b;
					return _Utils_Tuple2(nextInner, atom);
				}),
			_Utils_Tuple2(state, trueSeed),
			trueList);
	});
var $author$project$Evaluate$stateMap = F2(
	function (fn, state) {
		return A2(
			$elm$core$List$foldl,
			F2(
				function (el, _v0) {
					var inner = _v0.a;
					var build = _v0.b;
					var _v1 = A3($author$project$Evaluate$evaluateAt, fn, inner, el);
					var nextInner = _v1.a;
					var atom = _v1.b;
					return _Utils_Tuple2(
						nextInner,
						_Utils_ap(
							build,
							_List_fromArray(
								[atom])));
				}),
			_Utils_Tuple2(state, _List_Nil));
	});
var $author$project$Evaluate$permuteHelper = function (state) {
	permuteHelper:
	while (true) {
		var _v0 = A2($author$project$Util$debug, '---------------------\nPERMUTE HELPER STATE\n\n', state).leaves;
		if (!_v0.b) {
			var _v1 = _Utils_Tuple2(state.focusOp, state.needsType);
			if (_v1.a.$ === 'Just') {
				if (_v1.b.$ === 'Just') {
					if (_v1.b.a.$ === 'OpLeaf') {
						var x = _v1.a.a;
						var y = _v1.b.a.a;
						return _Utils_update(
							state,
							{
								build: _Utils_ap(
									state.build,
									_List_fromArray(
										[
											$author$project$Types$OpLeaf(x),
											$author$project$Types$OpLeaf(y)
										])),
								needsType: $elm$core$Maybe$Nothing
							});
					} else {
						var x = _v1.a.a;
						var y = _v1.b.a;
						return _Utils_update(
							state,
							{
								build: _Utils_ap(
									state.build,
									_List_fromArray(
										[
											y,
											$author$project$Types$OpLeaf(x)
										])),
								needsType: $elm$core$Maybe$Nothing
							});
					}
				} else {
					var x = _v1.a.a;
					var _v2 = _v1.b;
					return _Utils_update(
						state,
						{
							build: _Utils_ap(
								state.build,
								_List_fromArray(
									[
										$author$project$Types$OpLeaf(x)
									]))
						});
				}
			} else {
				if (_v1.b.$ === 'Just') {
					var _v3 = _v1.a;
					var y = _v1.b.a;
					return _Utils_update(
						state,
						{
							build: _Utils_ap(
								state.build,
								_List_fromArray(
									[y])),
							needsType: $elm$core$Maybe$Nothing
						});
				} else {
					var _v4 = _v1.a;
					var _v5 = _v1.b;
					return state;
				}
			}
		} else {
			var ins = _v0.a;
			var rest = _v0.b;
			if (_Utils_eq(
				ins,
				$author$project$Types$OpLeaf($author$project$Types$Terminate))) {
				var nextState = $author$project$Evaluate$permuteHelper(
					_Utils_update(
						state,
						{leaves: _List_Nil}));
				return _Utils_update(
					nextState,
					{leaves: rest});
			} else {
				var stateRest = function () {
					var _v13 = state.needsType;
					if (_v13.$ === 'Just') {
						var typeIns = _v13.a;
						if (ins.$ === 'TypeLeaf') {
							return _Utils_update(
								state,
								{leaves: rest});
						} else {
							return _Utils_update(
								state,
								{
									build: _Utils_ap(
										state.build,
										_List_fromArray(
											[typeIns])),
									leaves: rest,
									needsType: $elm$core$Maybe$Nothing
								});
						}
					} else {
						return _Utils_update(
							state,
							{leaves: rest});
					}
				}();
				var nextState = function () {
					_v6$5:
					while (true) {
						switch (ins.$) {
							case 'DataLeaf':
								switch (ins.a.$) {
									case 'Input':
										var _v7 = ins.a;
										return _Utils_update(
											stateRest,
											{
												needsType: $elm$core$Maybe$Just(ins)
											});
									case 'Function':
										var _v8 = ins.a;
										return A3($author$project$Evaluate$subStepPermute, ins, rest, stateRest);
									case 'Context':
										var _v9 = ins.a;
										return A3($author$project$Evaluate$subStepPermute, ins, rest, stateRest);
									default:
										break _v6$5;
								}
							case 'OpLeaf':
								if (ins.a.$ === 'Cast') {
									var _v10 = ins.a;
									var _v11 = stateRest.focusOp;
									if (_v11.$ === 'Just') {
										var x = _v11.a;
										return _Utils_update(
											stateRest,
											{
												build: _Utils_ap(
													stateRest.build,
													_List_fromArray(
														[
															$author$project$Types$OpLeaf(x)
														])),
												focusOp: $elm$core$Maybe$Nothing,
												needsType: $elm$core$Maybe$Just(ins)
											});
									} else {
										return _Utils_update(
											stateRest,
											{
												needsType: $elm$core$Maybe$Just(ins)
											});
									}
								} else {
									var op = ins.a;
									var _v12 = stateRest.focusOp;
									if (_v12.$ === 'Just') {
										var x = _v12.a;
										return _Utils_update(
											stateRest,
											{
												build: _Utils_ap(
													stateRest.build,
													_List_fromArray(
														[
															$author$project$Types$OpLeaf(x)
														])),
												focusOp: $elm$core$Maybe$Just(op)
											});
									} else {
										return _Utils_update(
											stateRest,
											{
												focusOp: $elm$core$Maybe$Just(op)
											});
									}
								}
							default:
								break _v6$5;
						}
					}
					return _Utils_update(
						stateRest,
						{
							build: _Utils_ap(
								stateRest.build,
								_List_fromArray(
									[ins]))
						});
				}();
				var $temp$state = nextState;
				state = $temp$state;
				continue permuteHelper;
			}
		}
	}
};
var $author$project$Evaluate$subStepPermute = F3(
	function (ins, rest, stateRest) {
		var subState = $author$project$Evaluate$permuteHelper(
			{build: _List_Nil, focusOp: $elm$core$Maybe$Nothing, leaves: rest, needsType: $elm$core$Maybe$Nothing});
		return _Utils_update(
			stateRest,
			{
				build: _Utils_ap(
					stateRest.build,
					A2(
						$elm$core$List$cons,
						ins,
						_Utils_ap(
							subState.build,
							_List_fromArray(
								[
									$author$project$Types$OpLeaf($author$project$Types$Terminate)
								])))),
				leaves: subState.leaves
			});
	});
var $author$project$Evaluate$permute = function (leaves) {
	return $author$project$Evaluate$permuteHelper(
		{build: _List_Nil, focusOp: $elm$core$Maybe$Nothing, leaves: leaves, needsType: $elm$core$Maybe$Nothing}).build;
};
var $author$project$Evaluate$evaluateBits = F2(
	function (bits, input) {
		return A2(
			$elm$core$String$join,
			'\n--------------\n',
			A2(
				$elm$core$List$map,
				function (y) {
					return $author$project$Atom$atomToString(y) + ('\n' + $elm$core$Debug$toString(y));
				},
				function (tokens) {
					return A2(
						$author$project$Evaluate$evaluateStep,
						tokens,
						$author$project$Evaluate$defaultState(input));
				}(
					A2(
						$author$project$Util$debug,
						'Before evaluation\n',
						$author$project$Evaluate$permute(
							A2(
								$author$project$Util$debug,
								'Before permute\n',
								$author$project$Decode$decode(
									A2($author$project$Util$debug, 'Before decode\n', bits)))))).stack));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$Util$flatten = $elm$core$List$concatMap($elm$core$Basics$identity);
var $author$project$Evaluate$showDiagnosticForBits = function (bits) {
	var bitCount = $elm$core$List$length(
		$author$project$Util$flatten(bits));
	return A2(
		$elm$core$String$join,
		'│',
		A2(
			$elm$core$List$map,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$List$map($elm$core$Debug$toString),
				$elm$core$String$join('')),
			bits)) + (' (' + ($elm$core$String$fromInt(bitCount) + (' bit(s), ' + ($elm$core$String$fromFloat(bitCount / 8.0) + ' byte(s))'))));
};
var $author$project$Evaluate$showCodeResult = F2(
	function (input, bits) {
		return $author$project$Evaluate$Evaluation(
			$author$project$Evaluate$showDiagnosticForBits(bits) + ('\n==============\n' + A2(
				$author$project$Evaluate$evaluateBits,
				$author$project$Util$flatten(bits),
				input)));
	});
var $author$project$Evaluate$handleInstructions = F2(
	function (input, tokens) {
		var _v0 = A2(
			$author$project$Util$coalesceMap,
			A2(
				$elm$core$Basics$composeL,
				$author$project$CodeTree$invertInstruction,
				function ($) {
					return $.ins;
				}),
			tokens);
		if (_v0.$ === 'Coalesced') {
			var bitRepresentations = _v0.a;
			return A2($author$project$Evaluate$showCodeResult, input, bitRepresentations);
		} else {
			var offenders = _v0.a;
			return $author$project$Evaluate$InstructionNotFound(
				'Not all tokens were given bit representations: ' + A2(
					$elm$core$String$join,
					', ',
					A2(
						$elm$core$List$map,
						function (token) {
							return '\'' + (token.raw + '\'');
						},
						offenders)));
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Literate$Tokens = function (a) {
	return {$: 'Tokens', a: a};
};
var $author$project$Literate$UnknownToken = function (a) {
	return {$: 'UnknownToken', a: a};
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $author$project$Literate$Token = F2(
	function (raw, ins) {
		return {ins: ins, raw: raw};
	});
var $author$project$Literate$getInstruction = function (op) {
	switch (op) {
		case '0':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$Zero));
		case '1':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$One));
		case '2':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$Two));
		case '3':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$Three));
		case '4':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$Four));
		case '5':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$Five));
		case 't':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$Ten));
		case 'i':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$Input));
		case 'x':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$RegX));
		case 'y':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$RegY));
		case 'z':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$RegZ));
		case '{':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$Function));
		case '(':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$Context));
		case 'o':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$OperatorSignal));
		case 'v':
			return $elm$core$Maybe$Just(
				$author$project$Types$DataLeaf($author$project$Types$VectorOperatorSignal));
		case 'Y':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$SaveY));
		case 'Z':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$SaveZ));
		case 'r':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Range));
		case '+':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Add));
		case '-':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Subtract));
		case '/':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Divide));
		case '*':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Multiply));
		case '%':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Modulo));
		case '#':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Increment));
		case '=':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Equality));
		case 'c':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Cast));
		case '?':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$TernaryCondition));
		case '}':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Terminate));
		case ')':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Terminate));
		case ';':
			return $elm$core$Maybe$Just(
				$author$project$Types$OpLeaf($author$project$Types$Separator));
		case 'N':
			return $elm$core$Maybe$Just(
				$author$project$Types$TypeLeaf($author$project$Types$TasteNumeric));
		case 'B':
			return $elm$core$Maybe$Just(
				$author$project$Types$TypeLeaf($author$project$Types$TasteBoolean));
		case 'F':
			return $elm$core$Maybe$Just(
				$author$project$Types$TypeLeaf($author$project$Types$TasteFunction));
		case 'S':
			return $elm$core$Maybe$Just(
				$author$project$Types$TypeLeaf($author$project$Types$TasteString));
		case 'L':
			return $elm$core$Maybe$Just(
				$author$project$Types$TypeLeaf($author$project$Types$TasteListSignal));
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Literate$tokenFor = function (raw) {
	return A2(
		$elm$core$Maybe$map,
		$author$project$Literate$Token(raw),
		$author$project$Literate$getInstruction(raw));
};
var $author$project$Literate$tokenize = function (code) {
	var tokens = A2(
		$author$project$Util$coalesceMap,
		$author$project$Literate$tokenFor,
		A2(
			$elm$core$List$map,
			$elm$core$String$fromChar,
			$elm$core$String$toList(code)));
	if (tokens.$ === 'Coalesced') {
		var coalesced = tokens.a;
		return $author$project$Literate$Tokens(coalesced);
	} else {
		var offenders = tokens.a;
		return $author$project$Literate$UnknownToken(
			A2(
				$elm$core$Maybe$withDefault,
				'(no tokens found)',
				$elm$core$List$head(offenders)));
	}
};
var $author$project$Evaluate$evaluate = F2(
	function (code, input) {
		var tokenized = $author$project$Literate$tokenize(code);
		if (tokenized.$ === 'Tokens') {
			var tokens = tokenized.a;
			return A2(
				$author$project$Evaluate$handleInstructions,
				input,
				A2(
					$elm$core$List$filter,
					function (x) {
						return x.raw !== ' ';
					},
					tokens));
		} else {
			var token = tokenized.a;
			return $author$project$Evaluate$TokenizationError('Unrecognized token \'' + (token + '\''));
		}
	});
var $author$project$Taste$evaluate = F2(
	function (code, input) {
		var _v0 = A2($author$project$Evaluate$evaluate, code, input);
		switch (_v0.$) {
			case 'Evaluation':
				var str = _v0.a;
				return str;
			case 'InstructionNotFound':
				var msg = _v0.a;
				return 'Something went wrong: ' + msg;
			default:
				var msg = _v0.a;
				return 'Something went wrong while tokenizing: ' + msg;
		}
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$BrowserPorts$storeCode = _Platform_outgoingPort('storeCode', $elm$json$Json$Encode$string);
var $author$project$BrowserPorts$storeInput = _Platform_outgoingPort('storeInput', $elm$json$Json$Encode$string);
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$BrowserPorts$syncOutput = _Platform_outgoingPort(
	'syncOutput',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 'CodeChange':
					var newCode = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{code: newCode}),
						$author$project$BrowserPorts$storeCode(newCode));
				case 'ChangeInput':
					var newInput = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{input: newInput}),
						$author$project$BrowserPorts$storeInput(newInput));
				case 'Execute':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								output: A2($author$project$Taste$evaluate, model.code, model.input)
							}),
						$author$project$BrowserPorts$syncOutput(_Utils_Tuple0));
				default:
					var str = msg.a;
					if (str === 'Execute') {
						var $temp$msg = $author$project$Main$Execute,
							$temp$model = model;
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return A2(
							$author$project$Util$debug,
							'Could not handle action ' + str,
							_Utils_Tuple2(model, $elm$core$Platform$Cmd$none));
					}
			}
		}
	});
var $author$project$Main$ChangeInput = function (a) {
	return {$: 'ChangeInput', a: a};
};
var $author$project$Main$CodeChange = function (a) {
	return {$: 'CodeChange', a: a};
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$blankLink = F2(
	function (link, content) {
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href(link),
					$elm$html$Html$Attributes$target('_blank')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(content)
				]));
	});
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$readonly = $elm$html$Html$Attributes$boolProperty('readOnly');
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('ElmApp')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						A2($author$project$Main$blankLink, 'https://github.com/ConorOBrien-Foxx/Taste', 'Taste')
					])),
				A2(
				$elm$html$Html$h2,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('About')
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Taste is an esoteric language with bit-level commands. Ostensibly also a golfing language, although it is more a proof of concept than intentional high-level golfing competitor. Once the language is more stable, I will add documentation. If you\'re interested in reading into the source for an idea of the operators, you could try '),
						A2($author$project$Main$blankLink, 'https://github.com/ConorOBrien-Foxx/Taste/blob/main/src/CodeTree.elm', 'src/CodeTree.elm'),
						$elm$html$Html$text('.')
					])),
				A2(
				$elm$html$Html$h2,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Interpreter')
					])),
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Code')
					])),
				A2(
				$elm$html$Html$textarea,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('code'),
						$elm$html$Html$Attributes$value(model.code),
						$elm$html$Html$Events$onInput($author$project$Main$CodeChange)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Input')
					])),
				A2(
				$elm$html$Html$textarea,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('input'),
						$elm$html$Html$Attributes$value(model.input),
						$elm$html$Html$Events$onInput($author$project$Main$ChangeInput)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('execute'),
						$elm$html$Html$Events$onClick($author$project$Main$Execute)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Execute')
					])),
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Output')
					])),
				A2(
				$elm$html$Html$textarea,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$readonly(true),
						$elm$html$Html$Attributes$id('output'),
						$elm$html$Html$Attributes$value(model.output)
					]),
				_List_Nil)
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (input) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (code) {
					return $elm$json$Json$Decode$succeed(
						{code: code, input: input});
				},
				A2($elm$json$Json$Decode$field, 'code', $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$field, 'input', $elm$json$Json$Decode$string)))(0)}});}(this));