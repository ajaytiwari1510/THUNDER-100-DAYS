
// THUNDER: 100 Days of Code — Phase 1
// Lecture 04: Numbers in JavaScript
// Topics: Bitwise, parseInt, parseFloat,
//         toFixed, toPrecision, NaN, Infinity,
//         new Number, Math object, OTP formula,
//         Math.random vs crypto.getRandomValues



// BITWISE  OPERATORS 
// Work directly on binary (0s and 1s)
// Fastest operations CPU can perform!

// & AND — both bits must be 1
console.log(5 & 3);   // 5=101, 3=011 → 001 = 1

// | OR — at least one bit must be 1
console.log(5 | 3);   // 5=101, 3=011 → 111 = 7

// ^ XOR — bits must be different
console.log(5 ^ 3);   // 5=101, 3=011 → 110 = 6

// ~ NOT — flips all bits
console.log(~5);      // flips 101 → -(5+1) = -6

// << Left shift — shift bits left (multiply by 2)
console.log(5 << 1);  // 101 → 1010 = 10 (5 * 2)
console.log(5 << 2);  // 101 → 10100 = 20 (5 * 4)

// >> Right shift — shift bits right (divide by 2)
console.log(20 >> 1); // 10100 → 1010 = 10 (20 / 2)
console.log(20 >> 2); // 10100 → 101 = 5 (20 / 4)


// Real world use of bitwise: Fast even/odd check, multiply/divide by 2, permissions, flags, etc.

// Fast even/odd check using & 1
// If last bit is 1 → odd | If last bit is 0 → even
for (let i = 1; i <= 6; i++) {
  console.log(`${i} is ${i & 1 ? "odd" : "even"}`);
}

// Fast multiply/divide by 2 using shifts
let val = 8;
console.log(val << 1); // 16 (val * 2) — faster than * 2!
console.log(val >> 1); // 4  (val / 2) — faster than / 2!



// FLOATING POINT PROBLEM
// Why banks store paise not rupees!
// Why Bitcoin stores Satoshi not BTC!

// The famous floating point bug!
console.log(0.1 + 0.2);          // 0.30000000000000004 😱
console.log(0.1 + 0.2 === 0.3);  // false! 😱

// WHY? — Computers store decimals in binary (base 2)
// 0.1 in binary = 0.0001100110011... (infinite repeating!)
// Like 1/3 in decimal = 0.3333... never ends
// CPU truncates it → tiny error → adds up over time!


// SOLUTION 1 — Store as integers (banks/crypto do this!)
// Indian banks store in PAISE not RUPEES
let balanceInPaise = 10050; // ₹100.50 stored as 10050 paise
let depositInPaise = 5025;  // ₹50.25 stored as 5025 paise
let totalPaise = balanceInPaise + depositInPaise; // perfect integer math!
console.log("Total in paise:", totalPaise);           // 15075
console.log("Total in rupees:", totalPaise / 100);    // 150.75 ✅


// Bitcoin — stores in Satoshi not BTC
// 1 BTC = 100,000,000 Satoshi
let satoshi = 100000000n; // BigInt for large numbers!
let myBTC = 25000000n;    // 0.25 BTC in satoshi
console.log("My BTC:", myBTC);
console.log("In BTC:", Number(myBTC) / Number(satoshi)); // 0.25

// SOLUTION 2 — toFixed for display only
console.log((0.1 + 0.2).toFixed(2)); // "0.30" ✅ for display
// WARNING: toFixed returns STRING not number!
console.log(typeof (0.1 + 0.2).toFixed(2)); // string



// parseInt and parseFloat
// Extract numbers from strings

// parseInt — extracts INTEGER from string
console.log(parseInt("42")); //42
console.log(parseInt("42.9")); //42 - drops decimal part
console.log(parseInt("42px")); //42 - stops at first non-digit/non-number
console.log(parseInt("px42")); //NaN - must start with number
console.log(parseInt("abc")); //NaN - no numbers at all
console.log(parseInt("   42   ")); //42 - ignores leading/trailing whitespace
console.log(parseInt("101", 2)); //5 - binary to decimal (1*2^2 + 0*2^1 + 1*2^0 = 5)
console.log(parseInt("ff", 16));    // 255 — hex to decimal!
console.log(parseInt("123abc", 10)); // 123 — stops at first non-digit
console.log(parseInt("0x1a")); // 26 — hex prefix works too!
console.log(parseInt("0b101")); // 5 — binary prefix works too!
console.log(parseInt("0o17")); // 15 — octal prefix works too!

// parseFloat — extracts DECIMAL from string
console.log(parseFloat("3.14"));    // 3.14
console.log(parseFloat("3.14px"));  // 3.14 — stops at non-number
console.log(parseFloat("3.14.5"));  // 3.14 — stops at second dot
console.log(parseFloat("px3.14"));  // NaN — must start with number
console.log(parseFloat("   3.14   ")); // 3.14 — ignores whitespace
console.log(parseFloat("0.1e2"));   // 10 — scientific notation!
console.log(parseFloat("0.1e-2"));  // 0.001 — scientific notation with negative exponent!

// Real world — CSS value extraction
let fontSize = "18px";
let padding = "12.5rem";
console.log(parseInt(fontSize));    // 18
console.log(parseFloat(padding));   // 12.5


// toFixed and toPrecision
// Control decimal display
let price = 1234.5678;

// toFixed — fixes DECIMAL PLACES (from right)
console.log(price.toFixed(0)); // "1235"  — 0 decimal places
console.log(price.toFixed(1)); // "1234.6" — 1 decimal place
console.log(price.toFixed(2)); // "1234.57" — 2 decimal places
console.log(price.toFixed(4)); // "1234.5678"

// toPrecision — fixes TOTAL SIGNIFICANT DIGITS
console.log(price.toPrecision(1)); // "1e+3"    — 1 significant digit
console.log(price.toPrecision(4)); // "1235"    — 4 significant digits
console.log(price.toPrecision(6)); // "1234.57" — 6 significant digits
console.log(price.toPrecision(9)); // "1234.56780"

// toFixed vs toPrecision
// toFixed  → count digits AFTER decimal point
// toPrecision → count ALL digits total

// Real world
let bitcoinPrice = 4523678.123;
console.log(`BTC Price: ₹${bitcoinPrice.toFixed(2)}`); // ₹4523678.12
console.log(`BTC Price: ${bitcoinPrice.toPrecision(6)}`); // 4.52368e+6



// NaN, Infinity, -Infinity
// Special number values in JS

// NaN — Not a Number
console.log(typeof NaN);          // "number" — NaN is a number type! 😮
console.log(NaN === NaN);         // false! NaN is not equal to itself!
console.log(isNaN("hello"));      // true
console.log(isNaN("42"));         // false — "42" converts to 42
console.log(Number.isNaN("hello")); // false — strict! only true for actual NaN  ❌ Avoid
console.log(Number.isNaN(NaN));     // true ✅ — use this always!  ✅ Prefer

// NaN is contagious — NaN + anything = NaN (virus! 🦠)
console.log(NaN + 1);    // NaN
console.log(NaN * 100);  // NaN
console.log(NaN - NaN);  // NaN

// isNaN()
//       ↓
// "Let me convert first."


// Number.isNaN()
//       ↓
// "No conversion. Show me the actual value."

// NaN is contagious — NaN + anything = NaN (virus! 🦠)
console.log(NaN + 1);    // NaN
console.log(NaN * 100);  // NaN
console.log(NaN - NaN);  // NaN


// Infinity
console.log(1 / 0);           // Infinity
console.log(-1 / 0);          // -Infinity
console.log(Infinity + 1);    // Infinity
console.log(Infinity - Infinity); // NaN!
console.log(isFinite(42));    // true
console.log(isFinite(1/0));   // false

// Number limits
console.log(Number.MAX_VALUE);       // 1.7976...e+308
console.log(Number.MIN_VALUE);       // 5e-324 (smallest positive)
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.EPSILON);          // 2.22e-16 (smallest difference)

// Using EPSILON to fix floating point comparison!
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true ✅


// new Number() — why we NEVER use it!
// Creates object instead of primitive
// Objects compare by REFERENCE not value!

// Primitive number
let n1 = 10;
let n2 = 10;
console.log(n1 === n2); // true ✅ same value, primitive


// Object number — WRONG WAY!
let obj1 = new Number(10);
let obj2 = new Number(10);
console.log(obj1 === obj2); // false! 😱 different objects in heap!
console.log(typeof obj1);   // "object" not "number"!

// Why dangerous?
console.log(obj1 + 5);  // 15 — works but creates confusion
console.log(obj1 > 5);  // true — works but unreliable
if (obj1) {
  // new Number(0) is also truthy! because it is an object!
  console.log("Always truthy even for 0! 😱");
}

let zero = new Number(0);
if (zero) console.log("new Number(0) is truthy! Bug waiting to happen! 🔴");

// ALWAYS use primitive:
let correct = 10; // ✅ simple, fast, predictable
console.log(typeof correct); // "number"


// Math Object
// Built-in mathematical functions

// Rounding
console.log(Math.floor(4.9));  // 4 — always rounds DOWN
console.log(Math.ceil(4.1));   // 5 — always rounds UP
console.log(Math.round(4.5));  // 5 — rounds to nearest
console.log(Math.round(4.4));  // 4
console.log(Math.trunc(4.9));  // 4 — removes decimal (no rounding)
console.log(Math.trunc(-4.9)); // -4 — towards zero

// Min Max
console.log(Math.max(1, 5, 3, 9, 2)); // 9
console.log(Math.min(1, 5, 3, 9, 2)); // 1
console.log(Math.max(...[1, 5, 3, 9])); // 9 — spread array!

// Power and roots
console.log(Math.pow(2, 10));  // 1024 (2^10)
console.log(Math.sqrt(144));   // 12
console.log(Math.cbrt(27));    // 3 (cube root)

// Absolute value
console.log(Math.abs(-42));    // 42
console.log(Math.abs(42));     // 42

// Logarithms
console.log(Math.log(Math.E)); // 1 (natural log)
console.log(Math.log2(8));     // 3 (log base 2)
console.log(Math.log10(1000)); // 3 (log base 10)

// Constants
console.log(Math.PI);   // 3.14159265358979...
console.log(Math.E);    // 2.71828... (Euler's number)



// OTP Generator — First Principle!
// Understanding the formula from scratch
// Math.floor(Math.random() * (max - min + 1)) + min


// Step 1 — Math.random() gives 0 to 0.9999...
// NEVER gives exactly 1 — always less!
console.log(Math.random()); // 0.something

// Step 2 — Generate 1 to 5 from scratch
// Math.random() → 0 to 0.999
// * 5           → 0 to 4.999
// floor()       → 0, 1, 2, 3, 4 (5 values but 0-4!)
// + 1           → 1, 2, 3, 4, 5 ✅

// WHY floor not ceil?
// ceil(0.0001) = 1 ✅ but ceil(0) = 0 ❌ (0 is possible from random!)
// floor never has this problem — 0 to 0.999 → always 0
// After +1 → always 1 minimum ✅

// Step 3 — General formula (first principle derivation!)
// range = max - min + 1  (total numbers we want)
// Math.random() * range  → 0 to range-0.001
// Math.floor(...)        → 0 to range-1
// + min                  → min to max ✅



// Math.random vs crypto.getRandomValues
// Why Math.random is NOT safe for real world!

// Math.random — PSEUDO random (fake random!)
// Uses a mathematical algorithm (PRNG)
// Starts from a "seed" value (usually timestamp)
// Same seed → same sequence every time → PREDICTABLE!
// Hackers can reverse-engineer the sequence → break OTPs!

console.log("Math.random (pseudo):", Math.random());
console.log("Math.random (pseudo):", Math.random());

// crypto.getRandomValues — TRUE random!
// Uses hardware entropy sources:
// → Mouse movement timing
// → CPU temperature fluctuations
// → Network packet timing
// → Hardware noise
// Completely unpredictable — cannot be reverse engineered!

// In Node.js:
const { randomBytes, randomInt } = require("crypto");

// Random bytes
const bytes = randomBytes(4);
console.log("\ncrypto random bytes:", bytes);

// Random integer in range — SECURE OTP!
function secureOTP() {
  return randomInt(100000, 999999); // truly random 6 digit OTP!
}

console.log("\n--- Secure OTPs using crypto ---");
for (let i = 0; i < 3; i++) {
  console.log("Secure OTP:", secureOTP());
}


// When to use which:
// Math.random → games, shuffling UI, non-security stuff ✅
// crypto      → OTPs, passwords, tokens, security keys ✅



// APPROACH 1
const otp = Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0");

console.log(otp); // 4-digit OTP (e.g., "0423", "9876", "0001")


// APPROACH 2 : Generate each digit separately
let otp2 = "";
for (let i=0; i<4; i++) {
    otp2 += Math.floor(Math.random()*10).toString();
}
console.log(otp2); // 4-digit OTP (e.g., "0423", "9876", "0001")


// APPROACH 3 : MANUAL PADDING 
const num = Math.floor(Math.random() * 10000);
let otp3 = num.toString();

while(otp3.length < 4){
    otp3 = "0" + otp3;
}
console.log(otp3); // 4-digit OTP (e.g., "0423", "9876", "0001")


// APPROACH 4 : USING SLICE / STRING SLICING TRICK
const otp4 = ("0000" + Math.floor(Math.random() * 10000)).slice(-4);
console.log(otp4); // 4-digit OTP (e.g., "0423", "9876", "0001")


// APPROACH 5 : USING STRING REPEAT 
const otp5 = "0000".repeat(1) + Math.floor(Math.random() * 10000);
console.log(otp5); // 4-digit OTP (e.g., "0423", "9876", "0001")


// APPROACH 6 : ARRAY APPROACH 
const otp6 = Array.from(
    { length: 4 },
    () => Math.floor(Math.random() * 10)
).join("");

console.log(otp6);


// APPROACH 7 : CRYPTOGRAPHICALLY SECURE OTP (Node.js)
const crypto = require("crypto");
const otp7 = crypto.randomInt(0, 10000).toString().padStart(4, "0");
console.log(otp7); // 4-digit OTP (e.g., "0423", "9876", "0001")

const array = new Uint16Array(1);

crypto.getRandomValues(array);

const otp8 =
    (array[0] % 10000)
    .toString()
    .padStart(4, "0");

console.log(otp8); // 4-digit OTP (e.g., "0423", "9876", "0001")

