
// THUNDER: 100 Days of Code — Phase 1
// Lecture 02: JavaScript Fundamentals
// Topics: Variables, Data Types, Operators,
// Type Coercion, Stack vs Heap, Strings


// VAR vs LET vs CONST
// var — function scoped, leaks outside blocks!

if(true){
    var city = "Bhopal";
}
console.log(city); // "Bhopal" — leaks! bad practice 🔴

// let — block scoped, stays inside {}
if (true) {
  let city2 = "Delhi";
  console.log(city2); // "Delhi" — works inside ✅
}
// console.log(city2); // ReferenceError!


// const — block scoped, cannot reassign
const PI = 3.14159;
console.log(PI);
// PI = 3; // TypeError!

// const with object — address locked, content free!
const user = { name: "Lion", age: 21 };
user.name = "Tiger"; // ✅ allowed — changing content
user.age = 22;       // ✅ allowed — changing content
console.log(user);   // { name: "Tiger", age: 22 }
// user = {};        // ❌ TypeError 



// UNDEFINED VS NULL
// undefined = JS assigned (not yet given a value)
// null = YOU assigned (intentional empty)

// Delhi temperature analogy
let temperature;           // undefined — fetch not started
console.log(temperature);  // undefined

temperature = null;        // null — tried but failed
console.log(temperature);  // null

temperature = 38;          // value — successfully fetched!
console.log(temperature);  // 38

// Can assign undefined manually (prefer null instead!)
let x = 100;
x = undefined;
console.log(x); // undefined — valid but use null instead


// 7 PRIMITIVE DATA TYPES
// number, string, boolean, null, undefined,
// bigint, symbol

let num = 42;
let str = "Lion";
let bool = true;
let nothing = null;
let notDefined = undefined;
let bigNum = 9999999999999999999n; // n = BigInt!
let uniqueId = Symbol("id");

console.log(typeof num);        // number
console.log(typeof str);        // string
console.log(typeof bool);       // boolean
console.log(typeof nothing);    // object ← famous JS bug!
console.log(typeof notDefined); // undefined
console.log(typeof bigNum);     // bigint
console.log(typeof uniqueId);   // symbol


// BigInt — why n at the end?
// JS number max safe = 9007199254740991
// Beyond this → loses accuracy without n!
console.log("\n--- BigInt demo ---");
console.log(9007199254740991 + 1);  // correct
console.log(9007199254740991 + 2);  // WRONG! loses accuracy 🔴
console.log(9007199254740991n + 2n); // CORRECT with BigInt ✅


// IMMUTABILITY OF PRIMITIVES
// Strings are immutable — cannot change in place
// Reason: String Interning + HashCode Caching

let name = "Lion";
name[0] = "B";          // silently ignored!
console.log(name);       // still "Lion" ✅

// "Changing" string = creating NEW string in memory
let name2 = "Lion";
name2 = name2.replace("L", "B"); // new string "Bion" created!
console.log(name2); // "Bion"
// "Lion" still exists in memory until GC cleans it

// String interning — same strings share memory!
let a = "Lion";
let b = "Lion";
console.log(a === b); // true — same memory address!

// Strict mode — shows error on mutation attempt
// "use strict";
// let frozen = "hello";
// frozen[0] = "H"; // TypeError in strict mode!


// OPERATORS
// Arithmetic, Comparison, Logical, Assignment
// ─────────────────────────────────────────────

// ARITHMETIC
console.log(10 + 3);  // 13
console.log(10 - 3);  // 7
console.log(10 * 3);  // 30
console.log(10 / 3);  // 3.333...
console.log(10 % 3);  // 1 → remainder
console.log(2 ** 10); // 1024 → power

// COMPARISON — ALWAYS use === not ==
console.log(5 == "5");   // true  → loose, converts type!
console.log(5 === "5");  // false → strict, checks type too ✅
console.log(5 != "5");   // false → loose opposite
console.log(5 !== "5");  // true  → strict opposite ✅
console.log(5 > 3);      // true
console.log(5 < 3);      // false
console.log(5 >= 5);     // true
console.log(5 <= 4);     // false

// LOGICAL — Short Circuit Evaluation!
console.log(true && false);  // false — AND
console.log(true || false);  // true  — OR
console.log(!true);          // false — NOT

// Short circuit — JS is lazy, stops early!
let isLoggedIn = false;
isLoggedIn && console.log("Dashboard"); // never prints! stops at false
isLoggedIn || console.log("Please login"); // prints! || finds first true

// Assignment
let score = 10;
score += 5;  console.log(score); // 15
score -= 3;  console.log(score); // 12
score *= 2;  console.log(score); // 24
score /= 4;  console.log(score); // 6
score **= 2; console.log(score); // 36
score++;     console.log(score); // 37
score--;     console.log(score); // 36


// TYPE COERCION
// Golden Rule:
// + with string = concat (joins)
// - * / = always math (converts to number)

console.log("5" + 3);        // "53"  — + sees string → concat
console.log("5" - 3);        // 2     — - is math only
console.log("5" * 3);        // 15    — * is math only
console.log(true + 1);       // 2     — true = 1
console.log(false + 1);      // 1     — false = 0
console.log(null + 1);       // 1     — null = 0
console.log(undefined + 1);  // NaN   — undefined = NaN (virus!)
console.log("" + 1);         // "1"   — empty string still string
console.log([] + 1);         // "1"   — [] → "" → "1"


// NaN is contagious — NaN + anything = NaN
console.log(NaN + 1);     // NaN
console.log(NaN + "hi");  // "NaNhi" — except with string!


// Explicit conversion — YOU convert manually
console.log(Number("42"));      // 42
console.log(Number("abc"));     // NaN — cannot convert!
console.log(Number(true));      // 1
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN
console.log(String(42));        // "42"
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean("hello"));  // true
console.log(Boolean([]));       // true — empty array is truthy!
console.log(Boolean(null));     // false


// Falsy values — 6 total!
// 0, "", null, undefined, NaN, false
// Everything else is truthy!


// STACK vs HEAP
// Primitives → Stack → copy by VALUE
// Objects/Arrays → Heap → copy by REFERENCE

// Primitive — copy by VALUE (independent copies!)
let p1 = 10;
let p2 = p1; // p2 gets its OWN copy
p2 = 99;
console.log("p1:", p1); // 10 — untouched! ✅
console.log("p2:", p2); // 99

// Object — copy by REFERENCE (shared address!)
let obj1 = { name: "Lion" };
let obj2 = obj1; // same address! not a copy!
obj2.name = "Tiger";
console.log("obj1.name:", obj1.name); // Tiger — both changed! 😱
console.log("obj2.name:", obj2.name); // Tiger

// Array — same as object (reference!)
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log("arr1:", arr1); // [1,2,3,4] — both changed! 😱
console.log("arr2:", arr2); // [1,2,3,4]



// SAFE OBJECT COPYING
// Shallow: spread, Object.assign
// Deep: JSON trick, structuredClone (modern!)

const original = {
  name: "Lion",
  address: { city: "Raipur" } // nested object
};

// Shallow copy — spread operator
const shallow = { ...original };
shallow.name = "Tiger";           // only changes shallow ✅
shallow.address.city = "Delhi";   // changes BOTH! 😱 (nested shared)
console.log("original.name:", original.name);         // Lion ✅
console.log("original.address.city:", original.address.city); // Delhi 😱

// Deep copy — structuredClone (best modern way!)
const original2 = {
  name: "Lion",
  address: { city: "Raipur" }
};
const deep = structuredClone(original2);
deep.name = "Tiger";
deep.address.city = "Mumbai";
console.log("original2.name:", original2.name);             // Lion ✅
console.log("original2.address.city:", original2.address.city); // Raipur ✅

// Object.freeze — makes object truly immutable!
const frozen = Object.freeze({ name: "Lion" });
frozen.name = "Tiger"; // silently ignored!
console.log("frozen.name:", frozen.name); // Lion — unchanged! ✅


// TASK 9 — STRINGS: " ' ` and interpolation

// " and ' are exactly the same
let s1 = "it's a great day";  // ' inside " ✅
let s2 = 'He said "hello"';   // " inside ' ✅
console.log(s1);
console.log(s2);

// Backtick — Template Literals (3 superpowers!)
let firstName = "Lion";
let course = "Thunder";
let day = 2;

// Power 1 — Variable/expression inside string
let msg = `Hello ${firstName}! Day ${day} of ${course}`;
console.log(msg); // Hello Lion! Day 2 of Thunder

// Power 2 — Any expression works inside
console.log(`2 + 2 = ${2 + 2}`);          // 2 + 2 = 4
console.log(`Is adult: ${21 >= 18}`);      // Is adult: true
console.log(`Upper: ${firstName.toUpperCase()}`); // Upper: LION

// Power 3 — Multi-line strings
let notes = `
  Day ${day} Summary:
  - Learned variables (var, let, const)
  - Learned 7 primitive types
  - Practiced type coercion
  - Understood stack vs heap
`;
console.log(notes);


