// THUNDER: 100 Days of Code — Phase 1
// Lecture 06: Arrays in JavaScript
// Topics: Array basics, push/pop, shift/unshift,
//         splice/slice, 2D arrays, spread, 
//         destructuring, rest, sort trap, methods



// What is Array and WHY we need it
// Without array — 100 students = 100 variables!
let student1 = "Lion";
let student2 = "Tiger";
let student3 = "Thunder";
// ... this doesn't scale!
// With array — all in ONE variable!
let students = ["Lion", "Tiger", "Thunder", "Raj", "Priya"];
console.log(students);
console.log("Total students:", students.length);
console.log("First student:", students[0]);
console.log("Last student:", students[students.length - 1]);



// Why JS Arrays are DIFFERENT
// JS can store MIXED types in same array!
// C++/Java arrays store only SAME type

// Mixed types in same array — only possible in JS!
let mixed = [1, "hello", true, null, undefined, { name : "ajay", age : 22}, [1, 2, 3]];
console.log(mixed);
console.log("Length:" , mixed.length);

mixed.forEach((item, i) => {
    console.log(`[${i}] -> ${typeof item} : ${JSON.stringify(item)}`);
});

// let len = mixed.length;
// for(item of mixed){
//     console.log(item);
// }

// mixed.forEach((item, index, wholeArray) => {
//     console.log(item, index, wholeArray);
//     // item = the current element
//     // index = 0, 1, 2, 3...
//     // wholeArray = the complete 'mixed' array itself
// });



// WHY this is possible — JS array is an OBJECT
// not a fixed-size typed memory block!
console.log("\ntypeof []:", typeof []); // "object" ← not "array"!
console.log("Array.isArray([]):", Array.isArray([])); // true ← correct check



// Why JS Array is Object
// Classic index formula FAILS in JS!

// In C++ — array address formula works:
// address = base_address + index * element_size
// Works because ALL elements have SAME size!

// In JS — formula FAILS:
// [10, "hello", {name:"Lion"}]
// 10      → 8 bytes (float64)
// "hello" → variable size (depends on string length!)
// {..}    → variable size (heap reference)
// So index * size = meaningless! Different sizes!

// JS SOLUTION — array is internally an object!
// { 0: 10, 1: "hello", 2: {name:"Lion"}, length: 3 }
// Access by key lookup — not memory arithmetic!

let arr = [10, "hello", { name: "Lion" }];
console.log(arr[0]);  // key "0" lookup
console.log(arr[1]);  // key "1" lookup
console.log(arr[2]);  // key "2" lookup

// Proof — you can add non-numeric properties!
arr.myProp = "I am a property!";
console.log(arr.myProp); // works! proves array is object




// push, pop, shift, unshift
// push/pop  → END   → O(1) fast!
// shift/unshift → START → O(n) slow!

let fruits = ["apple", "mango"];

// push — add to END (fast O(1))
fruits.push("banana");
fruits.push("orange", "grape"); // can push multiple!
console.log("After push:", fruits);

// pop — remove from END (fast O(1))
let removed = fruits.pop();
console.log("Popped:", removed);
console.log("After pop:", fruits);

// unshift — add to START (slow O(n) — shifts all!)
fruits.unshift("kiwi");
console.log("After unshift:", fruits);

// shift — remove from START (slow O(n) — shifts all!)
let first = fruits.shift();
console.log("Shifted:", first);
console.log("After shift:", fruits);

// WHY push/pop is O(1) but shift/unshift is O(n)?
// push: just add at end — no movement needed
// pop:  just remove last — no movement needed
// unshift: add at start → shift ALL elements right → O(n)!
// shift:   remove first → shift ALL elements left → O(n)!

// FAANG tip: use push/pop for stack (LIFO)
// Use shift/push for queue (FIFO) — but prefer Array.from or linked list!



// for and for...of loops with arrays
let scores = [85, 92, 78, 95, 88];

// for loop — when you need index
console.log("--- for loop ---");
for (let i = 0; i < scores.length; i++) {
  console.log(`Index ${i}: ${scores[i]}`);
}

// for...of — when you only need values
console.log("--- for...of ---");
for (let score of scores) {
  console.log(score);
}

// for...of with entries — index AND value!
console.log("--- for...of with entries ---");
for (let [index, score] of scores.entries()) {
  console.log(`${index}: ${score} ${score >= 90 ? "✅ Excellent!" : ""}`);
}



// splice vs slice
// splice → MODIFIES original (delete/insert)
// slice  → CREATES new copy (non-destructive!)

let colors = ["red", "green", "blue", "yellow", "purple"];

// slice — non-destructive, returns new array
// slice(start, end) — end is EXCLUDED
let sliced = colors.slice(1, 3);
console.log("sliced:", sliced);   // ["green", "blue"]
console.log("original:", colors); // unchanged!

// slice with negative index
console.log("Last 2:", colors.slice(-2)); // ["yellow", "purple"]
console.log("All:", colors.slice());       // copy of entire array!

// splice — MODIFIES original!
// splice(start, deleteCount, ...itemsToInsert)

// DELETE elements
let deleted = colors.splice(1, 2); // remove 2 from index 1
console.log("deleted:", deleted);  // ["green", "blue"]
console.log("after delete:", colors); // ["red", "yellow", "purple"]

// INSERT elements (deleteCount = 0)
colors.splice(1, 0, "pink", "cyan"); // insert at index 1
console.log("after insert:", colors); // ["red","pink","cyan","yellow","purple"]

// REPLACE elements
colors.splice(2, 1, "REPLACED");
console.log("after replace:", colors);




// 2D Arrays
// Array of arrays — matrix, game board, grid

let matrix = [
  [1, 2, 3],   // index 0 — this IS an array!
  [4, 5, 6],   // index 1
  [7, 8, 9],   // index 2
];

// arr[0] prints ENTIRE ROW because:
// matrix[0] = the element at index 0 = [1,2,3] (the whole array!)
console.log("matrix[0]:", matrix[0]);    // [1, 2, 3] — entire row!
console.log("matrix[1]:", matrix[1]);    // [4, 5, 6]
console.log("matrix[0][0]:", matrix[0][0]); // 1 — first cell
console.log("matrix[1][2]:", matrix[1][2]); // 6 — row 1, col 2

// Traversing 2D array
console.log("--- Full matrix ---");
for (let row = 0; row < matrix.length; row++) {
  let rowStr = "";
  for (let col = 0; col < matrix[row].length; col++) {
    rowStr += matrix[row][col] + " ";
  }
  console.log(rowStr);
}

// for...of on 2D array
for (let row of matrix) {
  console.log(row); // each row is an array
  for (let cell of row) {
    process.stdout.write(cell + " ");
  }
  console.log();
}


// Real world 2D array — Tic Tac Toe board
let board = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["X", " ", "O"],
];
console.log("\n--- Tic Tac Toe ---");
board.forEach(row => console.log(row.join(" | ")));



// concat and spread operator
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [7, 8, 9];

// concat — joins arrays, returns NEW array
let joined = arr1.concat(arr2, arr3);
console.log("concat:", joined); // [1,2,3,4,5,6,7,8,9]
console.log("arr1 unchanged:", arr1); // [1,2,3]

// spread operator — modern and cleaner!
let spread = [...arr1, ...arr2, ...arr3];
console.log("spread:", spread); // [1,2,3,4,5,6,7,8,9]

// spread advantages over concat:
// 1. Can insert anywhere!
let withMiddle = [...arr1, 99, 100, ...arr2];
console.log("with middle:", withMiddle); // [1,2,3,99,100,4,5,6]
// let mixedConcat = [0].concat(arr1, ["break time"], arr2);

// 2. Copy array (shallow!)
let copy = [...arr1];
copy.push(999);
console.log("original arr1:", arr1); // unchanged!
console.log("copy:", copy);

// 3. Spread string into array!
let chars = [..."Thunder"];
console.log("chars:", chars); // ['T','h','u','n','d','e','r']


// let str = "HEY";
// let spreadStr = [...str, ...arr1];
// // Result: ["H", "E", "Y", 1, 2, 3]  ← Unpacks the string letters!

// let concatStr = arr1.concat(str);
// // Result: [1, 2, 3, "HEY"]          ← Treating the string as a single block!

// let user = { name: "Ajay", role: "Developer" };
// let updatedUser = { ...user, location: "India" };
// Result: { name: "Ajay", role: "Developer", location: "India" }




// Destructuring and Rest operator
let nums = [10, 20, 30, 40, 90, 3812, 2];

// Basic destructuring — extract by position
const [first, second] = nums;
console.log("first:", first);   // 10
console.log("second:", second); // 20

// Custom names — name doesn't matter!
const [lion, tiger, bhains] = nums;
console.log("lion:", lion);   // 10
console.log("tiger:", tiger); // 20
console.log("bhains:", bhains); // 30

// Skip elements using commas
const [a, , c] = nums; // skip index 1
console.log("a:", a, "c:", c); // 10, 30

// Rest operator — collect remaining!
const [f1, f2, f3, ...remaining] = [10, 20, 30, 40, 90, 3812, 2];
console.log("f1:", f1);         // 10
console.log("f2:", f2);         // 20
console.log("f3:", f3);         // 30
console.log("remaining:", remaining); // [40, 90, 3812, 2]

// Default values in destructuring
const [x = 0, y = 0, z = 100] = [5, 10];
console.log(x, y, z); // 5, 10, 100 (z uses default!)

// Swap variables using destructuring!
let p = 1, q = 2;
[p, q] = [q, p]; // no temp variable needed!
console.log("p:", p, "q:", q); // 2, 1

// Real world — function returning multiple values
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = getMinMax([5, 2, 8, 1, 9]);
console.log("min:", min, "max:", max); // 1, 9



// join, indexOf, lastIndexOf, includes
let items = ["apple", "mango", "apple", "banana", "apple"];

// join — array to string with separator
console.log(items.join(", "));  // "apple, mango, apple, banana, apple"
console.log(items.join(" | ")); // "apple | mango | apple | banana | apple"
console.log(items.join(""));    // "applemangoapplebananaapple"
console.log([1,2,3].join("-")); // "1-2-3"

// indexOf — FIRST occurrence (O(n) linear search!)
console.log(items.indexOf("apple"));    // 0 — first
console.log(items.indexOf("mango"));    // 1
console.log(items.indexOf("grapes"));   // -1 (not found!)

// lastIndexOf — LAST occurrence
console.log(items.lastIndexOf("apple")); // 4 — last one
console.log(items.lastIndexOf("mango")); // 1

// includes — does it exist? returns boolean
console.log(items.includes("banana")); // true
console.log(items.includes("grapes")); // false

// indexOf with fromIndex — search from specific position
console.log(items.indexOf("apple", 1)); // 2 — starts from index 1

// FAANG tip: indexOf uses === internally — strict comparison!
console.log([1,2,3].indexOf("1")); // -1 — "1" !== 1!
console.log([1,2,3].includes(1));  // true




// The sort() TRAP!!!
// Most confusing JS behavior — must know!
let num = [10, 20, 7, 101, 23, 78, 4];

// WRONG — default sort!
let wrongSort = [...num].sort();
console.log("Wrong sort:", wrongSort);
// [10, 101, 20, 23, 4, 7, 78] — WRONG! 😱

// let num = [3, 1, 2];
// let wrongSort1 = num.sort();

// console.log(wrongSort1); // [1, 2, 3]
// console.log(num);        // [1, 2, 3] <-- YOUR ORIGINAL ARRAY IS DESTROYED!

// let num = [3, 1, 2];
// let wrongSort = [...num].sort();

// console.log(wrongSort); // [1, 2, 3]
// console.log(num);       // [3, 1, 2] <-- SAFE! Original array remains unchanged.

// WHY? — JS converts numbers to STRINGS first!
// "10" "20" "7" "101" "23" "78" "4"
// Then sorts by Unicode character code!
// "1" (49) < "2" (50) < "4" (52) < "7" (55) < "9" (57)
// So "101" < "20" because "1" < "2" in Unicode!
// And "4" < "7" etc.

// Let's prove it:
let strings = ["10", "101", "20", "7", "4"];
console.log(strings.sort()); // ["10","101","20","4","7"] — string sort!

// CORRECT — comparator function!
let correct = [...num].sort((a, b) => a - b);
console.log("Correct ascending:", correct);
// [4, 7, 10, 20, 23, 78, 101] ✅

// How comparator works:
// sort() calls comparator(a, b) for pairs:
// if result < 0 → a comes before b
// if result > 0 → b comes before a
// if result = 0 → order unchanged

// So (a, b) => a - b:
// a=10, b=7 → 10-7 = 3 (positive) → b(7) before a(10) ✅
// a=4,  b=7 → 4-7  = -3 (negative) → a(4) before b(7) ✅

// Descending sort
let descending = [...num].sort((a, b) => b - a);
console.log("Correct descending:", descending);
// [101, 78, 23, 20, 10, 7, 4] ✅

// Sort strings correctly (default sort works for strings!)
let names = ["Raj", "Priya", "Lion", "Amit"];
console.log(names.sort()); // ["Amit","Lion","Priya","Raj"] ✅

// Sort objects by property
let products = [
  { name: "Pizza",  price: 299 },
  { name: "Burger", price: 149 },
  { name: "Coke",   price: 49  },
];
products.sort((a, b) => a.price - b.price);
console.log("Sorted by price:");
products.forEach(p => console.log(`${p.name}: ₹${p.price}`));

