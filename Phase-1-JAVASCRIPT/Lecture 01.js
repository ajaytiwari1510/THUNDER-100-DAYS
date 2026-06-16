// THUNDER: 100 Days of Code — Phase 1
// Lecture 01: Introduction to JavaScript

// MY FIRST JAVASCRIPT OUTPUT 
// console.log("Hello, JavaScript!");
// console.log("My name is Ajay");
// console.log("Starting Thunder: 100 Days of Code");


// TRYING DIFFERENT CONSOLE METHODS
// console.log("This is console.log");    // normal output
// console.warn("This is a warning!");    // yellow warning
// console.error("This is an error!");    // red error
// console.table([1, 2, 3]);             // table format
// console.time("timer");                 // start timer
// console.timeEnd("timer");              // end timer — shows ms taken


// TYPES OF OPERATORS IN JAVASCRIPT 
// console.log("\n--- typeof examples ---");
// console.log(typeof 42);           // number
// console.log(typeof "Lion");       // string
// console.log(typeof true);         // boolean
// console.log(typeof undefined);    // undefined
// console.log(typeof null);         // object ← famous JS bug!
// console.log(typeof {});           // object
// console.log(typeof []);           // object ← array is object!
// console.log(typeof function(){}); // function

// WHY typeof null = "object"?
// This is a bug from 1995 when JS was created in 10 days
// Brendan Eich never fixed it to avoid breaking old websites


// This loop runs 1 million times
// V8 Ignition runs it first few times
// TurboFan JIT compiler detects it is HOT → compiles to machine code
// Result: blazing fast! ⚡

// console.time("loop");
// let sum = 0;
// for (let i = 0; i < 1000000; i++) {
//   sum += i;
// }
// console.timeEnd("loop"); // see how fast V8 runs this!
// console.log("Sum:", sum);


// setTimeout — provided by Node.js runtime
// setTimeout(() => {
//   console.log("I run after 1 second! (setTimeout = Runtime API)");
// }, 1000);


// function greet(name) {
//   // This runs in FUNCTION execution context
//   // New context created when greet() is called
//   // Destroyed when function returns
//   console.log("I am in function execution context");
//   console.log("Hello,", name);
// }

// greet("Lion"); // new execution context created here
// greet("Thunder"); // another new execution context


// console.log("\n--- Mini JavaScript Interpreter ---");

// function miniInterpreter(code) {
//   // Step 1 — extract what is inside console.log(...)
//   const start = code.indexOf("(") + 1;
//   const end = code.lastIndexOf(")");
//   const inside = code.slice(start, end);

//   // Step 2 — check if it is a string (has quotes)
//   if (inside.startsWith('"') || inside.startsWith("'")) {
//     console.log(inside.slice(1, -1)); // remove quotes and print
//     return;
//   }

//   // Step 3 — it is a math expression, evaluate it
//   const operators = ["+", "-", "*", "/"];
//   for (let op of operators) {
//     if (inside.includes(op)) {
//       const parts = inside.split(op);
//       const a = parseFloat(parts[0].trim());
//       const b = parseFloat(parts[1].trim());
//       if (op === "+") { console.log(a + b); return; }
//       if (op === "-") { console.log(a - b); return; }
//       if (op === "*") { console.log(a * b); return; }
//       if (op === "/") { console.log(a / b); return; }
//     }
//   }
// }

// // Test our mini interpreter with these 5 lines
// const lectureCode = [
//   'console.log("Rohit Negi")',
//   'console.log(3+4)',
//   'console.log(3*4)',
//   'console.log(3-4)',
//   'console.log(3/4)',
// ];

// lectureCode.forEach(line => miniInterpreter(line));


// console.log("\n--- Memory: Stack vs Heap ---");

// // Primitives → Stack (copy by value)
// let a = 10;
// let b = a;  // b gets its OWN copy
// b = 99;
// console.log("a:", a); // 10 — untouched!
// console.log("b:", b); // 99


// Objects → Heap (copy by reference)
// let obj1 = { name: "Lion" };
// let obj2 = obj1;   // both point to SAME address
// obj2.name = "Tiger";
// console.log("obj1.name:", obj1.name); // Tiger — both changed!
// console.log("obj2.name:", obj2.name); // Tiger

// Safe copy using structuredClone (modern!)
// let obj3 = { name: "Lion", skills: { js: true } };
// let obj4 = structuredClone(obj3); // deep copy!
// obj4.name = "Thunder";
// obj4.skills.js = false;
// console.log("obj3.name:", obj3.name);       // Lion — safe!
// console.log("obj3.skills.js:", obj3.skills.js); // true — safe!