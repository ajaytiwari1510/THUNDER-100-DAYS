
// Every JS value
// ├── Primitives  (by value, immutable)
// │   ├── number      → math
// │   ├── string      → text
// │   ├── boolean     → true / false
// │   ├── undefined   → not assigned (engine's emptiness)
// │   ├── null        → empty on purpose (your emptiness)
// │   ├── bigint      → huge integers
// │   └── symbol      → guaranteed-unique id
// └── Objects     (by reference, mutable)
//     ├── {}          → key → value
//     ├── []          → ordered lists
//     ├── function    → reusable code
//     └── ...everything that isn't a primitive


// In this expression: 5 + 10
// '+' is the operator 
// '5' and '10' are operands 
// the entire expression evaluates to the value '15'
let result = 5 + 10; // 15
console.log(result);


// ASSIGNMENT OPERATOR 
let score = 100;

// COMPOUD ASSIGNMENT OPERATORS
let level = 10;
level += 5; // level = level + 5 => 15
level *= 2; // level = level * 2 => 30
console.log(level); // 30

//ARITHEMATIC OPERATORS
console.log(10+5); // 15
console.log(10-5); // 5
console.log(10*5); // 50
console.log(10/5); // 2
console.log(10%3); // 1-> remainder
console.log(2**3); // 8-> power 

console.log(10 % 3); // 1 (10 divided by 3 is 3, with a remainder of 1)
console.log(10 % 2); // 0 (An even number always has a remainder of 0 when divided by 2)

let prefix = 5;
console.log(++prefix); // 6 → increments first, then returns value
let postfix = 5;
console.log(postfix++); // 5 -> returns value first, then increments 
console.log(postfix); // 6


// COMPARISON OPERATORS 
console.log(5>10); // false
console.log(5<10); // true
console.log(10<=10); // true
console.log(15>=10); //true

// == (Loose Equality)
console.log(7 == "7");   // true (string "7" is coerced to number 7)
console.log(0 == false); // true (boolean false is coerced to number 0)

// === (Strict Equality)
console.log(7 === "7");   // false (number is not a string)
console.log(0 === false); // false (number is not a boolean)


// LOGICAL OPERATORS

let user = null;
// This is safe. The code stops at `user` and never tries to access `user.name`.
if (user && user.name === "Admin") { /* ... */ }

let username = ""; // an empty string is "falsy"
let displayName = username || "Guest"; // displayName becomes "Guest"

let isLoggedIn = false;
if (!isLoggedIn) {
  console.log("Please log in.");
}


// **Important Note: "Truthy" and "Falsy"**

// When used in a logical context, every value in JavaScript has an inherent boolean value.

// - **The 6 Falsy Values:** false, 0, "" (empty string), null, undefined, NaN.
// - **Everything else is Truthy**, including "false", [] (an empty array), and {} (an empty object).



// BITWISE OPERATORS
let a =5;
let b = 3;
console.log(a & b); // 1 (0101 & 0011 = 0001)
console.log(a | b); // 7 (0101 | 0011 = 0111)
console.log(a ^ b); // 6 (0101 ^ 0011 = 0110)
console.log(~a);    // -6 (~0101 = 1010 in two's complement)
console.log(a << 1); // 10 (0101 << 1 = 1010)
console.log(a >> 1); // 2 (0101 >> 1 = 0010)

