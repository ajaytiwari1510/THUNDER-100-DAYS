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
const [firstNo, secondNo] = nums;
console.log("first:", firstNo);   // 10
console.log("second:", secondNo); // 20

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





// Lecture 6 — Practice Questions


// Q1. Zomato Cart Manager
// 1. Define the core cart operations
function addItem(cart, item) {
  cart.push(item); // Adds to the END of the array
  return cart;
}

function removeLastItem(cart) {
  cart.pop(); // Removes from the END of the array
  return cart;
}

function addUrgentItem(cart, item) {
  cart.unshift(item); // Adds to the BEGINNING of the array
  return cart;
}

function removeFirstItem(cart) {
  cart.shift(); // Removes from the BEGINNING of the array
  return cart;
}

// 2. Execute the operations step-by-step
let cart = [];
console.log("Initial Cart:", cart);

cart = addItem(cart, "Pizza");      
console.log("After Pizza: ", cart);       // Expected: ["Pizza"]

cart = addItem(cart, "Burger");     
console.log("After Burger:", cart);       // Expected: ["Pizza", "Burger"]

cart = addItem(cart, "Coke");       
console.log("After Coke:  ", cart);       // Expected: ["Pizza", "Burger", "Coke"]

cart = removeLastItem(cart);        
console.log("After Pop:   ", cart);       // Expected: ["Pizza", "Burger"]

cart = addUrgentItem(cart, "Water");
console.log("After Urgent:", cart);       // Expected: ["Water", "Pizza", "Burger"]

cart = removeFirstItem(cart);       
console.log("After Shift: ", cart);       // Expected: ["Pizza", "Burger"]




// // Q2. Student Grade Extractor
// // 1. Define our mock relational database records array
// let students = [  
//   { name: "Lion",  marks: 92, city: "Raipur"  },  
//   { name: "Tiger", marks: 78, city: "Delhi"   },  
//   { name: "Raj",   marks: 85, city: "Mumbai"  },  
//   { name: "Priya", marks: 95, city: "Chennai" },
// ];

// // 2. The analytics engine utilizing method pipelines
// function analyzeStudents(studentsList) {  
//   // Rule: Input size N -> Output size N. Transform object shape to raw strings.
//   const names = studentsList.map(({ name }) => name);  
  
//   // Rule: Input size N -> Output size N. Transform object shape to numbers.
//   const marks = studentsList.map(({ marks }) => marks);  
  
//   // Rule: Conditional filtering. Output size <= N. Retain complete structured objects.
//   const toppers = studentsList.filter(({ marks }) => marks >= 90);  
  
//   // Rule: Collapse numeric data stream down to a single total cumulative sum scalar, then divide.
//   const totalScoreSum = marks.reduce((runningAccumulator, currentMark) => runningAccumulator + currentMark, 0);
//   const average = totalScoreSum / studentsList.length;  

//   // Pack the newly computed metrics back into a clean payload object and return it
//   return { names, marks, toppers, average };
// }

// // 3. Drive execution and capture outputs
// const result = analyzeStudents(students);

// // 4. Print clean logs to the debugger console
// console.log("--- Student Data Analysis Metrics ---");
// console.log("Names Matrix:  ", result.names);
// console.log("Marks Matrix:  ", result.marks);

// // Extract the names of our toppers array using a map transformation for printing readability
// console.log("Toppers Found: ", result.toppers.map(({ name }) => name));
// console.log("Class Average: ", result.average);

// FAANG Optimization: 1 Loop, 4 Results
// function analyzeStudentsOptimized(studentsList) {
//   let names = [];
//   let marks = [];
//   let toppers = [];
//   let totalScoreSum = 0;

//   // We walk through the array EXACTLY ONCE
//   for (let i = 0; i < studentsList.length; i++) {
//     const { name, marks: score, city } = studentsList[i]; // Destructure once
    
//     names.push(name);
//     marks.push(score);
//     totalScoreSum += score;
//     if (score >= 90) {
//       toppers.push(studentsList[i]);
//     }
//   }

//   return { names, marks, toppers, average: totalScoreSum / studentsList.length };
// }





// Q3. Paytm Transaction History
let transactions = [500, 1200, 300, 2500, 800, 1500, -200, 900];

function analyzeTransactions(txList) {
  // 1. Scans left-to-right. Stops instantly at index 1 (1200). Time: O(n) worst case, exits early!
  const firstBig = txList.findIndex(amount => amount > 1000);
  
  // 2. Scans right-to-left. Stops instantly at index 5 (1500). Time: O(n) worst case, exits early!
  const lastBig = txList.findLastIndex(amount => amount > 1000);
  
  // 3. Scans for any negative value. Stops instantly at index 6 (-200). Returns true.
  const hasRefund = txList.some(amount => amount < 0);
  
  return { firstBig, lastBig, hasRefund };
}

// Drive execution
const result = analyzeTransactions(transactions);

console.log("--- Paytm Ledger Analysis ---");
console.log(`First Big Transaction Index: ${result.firstBig}`); // Expected: 1
console.log(`Last Big Transaction Index:  ${result.lastBig}`);  // Expected: 5
console.log(`Contains Counterparty Refund: ${result.hasRefund}`); // Expected: true


// function analyzeTransactions(transactions) {
//   const bigTx  = transactions.filter(t => t > 1000);
//   const firstBig = transactions.indexOf(bigTx[0]);
//   const lastBig  = transactions.lastIndexOf(bigTx[bigTx.length - 1]);
//   const hasRefund = transactions.some(t => t < 0);
//   const total    = transactions.reduce((s, t) => s + t, 0);
//   return { firstBig, lastBig, hasRefund, total };
// }

// console.log(analyzeTransactions([500,1200,300,2500,800,1500,-200,900]));
// { firstBig: 1, lastBig: 5, hasRefund: true, total: 7600 }




// Q4. IPL Scorecard — 2D Array
let scorecard = [  
  [1, 0, 4, 6, 0, 2],   // Over 1 (Index 0) = 13 runs  
  [0, 0, 1, 4, 6, 4],   // Over 2 (Index 1) = 15 runs  
  [2, 1, 0, 0, 6, 6],   // Over 3 (Index 2) = 15 runs  
  [4, 4, 0, 1, 2, 0],   // Over 4 (Index 3) = 11 runs
];

function analyzeIPLScorecard(matrix) {
  // 1. Calculate runs per over: Transform each row array into a single sum number
  const runsPerOver = matrix.map(over => over.reduce((sum, runs) => sum + runs, 0));

  // 2. Calculate grand total: Sum up the cooked runsPerOver array
  const totalScore = runsPerOver.reduce((total, overRuns) => total + overRuns, 0);

  // 3. Find the best over: Find the highest runs, then locate its first index position
  const maxRuns = Math.max(...runsPerOver); // Uses spread operator to unpack [13, 15, 15, 11] into individual arguments
  const bestOver = runsPerOver.indexOf(maxRuns);

  // 4. Count dot balls: Melt the 2D array into a flat 1D array of individual balls, then filter out non-zeros
  const dotBalls = matrix.flat().filter(runs => runs === 0).length;

  return { totalScore, runsPerOver, bestOver, dotBalls };
}

// Drive Execution
const metrics = analyzeIPLScorecard(scorecard);

console.log("--- IPL Analytics Dashboard ---");
console.log("Total Score:    ", metrics.totalScore);    // 54
console.log("Runs Per Over:  ", metrics.runsPerOver);  // [13, 15, 15, 11]
console.log("Best Over Index:", metrics.bestOver);     // 1 (Over 2)
console.log("Dot Balls Count:", metrics.dotBalls);     // 7



// // Q5. Flipkart Product Filter + Sort
// let products = [
//   { name: "iPhone",   price: 79999, category: "mobile"  },
//   { name: "Samsung",  price: 49999, category: "mobile"  },
//   { name: "Laptop",   price: 55000, category: "laptop"  },
//   { name: "OnePlus",  price: 35000, category: "mobile"  },
//   { name: "MacBook",  price: 120000,category: "laptop"  },
//   { name: "Realme",   price: 15000, category: "mobile"  },
// ];

// // filterProducts(products, "mobile", 50000)
// // Expected: [{name:"OnePlus",price:35000},{name:"Realme",price:15000},{name:"Samsung",price:49999}]

// function filterProducts(products, category, maxPrice) {
//   return products
//     .filter(p => p.category === category && p.price <= maxPrice)
//     .sort((a, b) => a.price - b.price)
//     .map(({ name, price }) => ({ name, price }));
// }

// console.log(filterProducts(products, "mobile", 50000));
// // [{name:"Realme",price:15000},{name:"OnePlus",price:35000},{name:"Samsung",price:49999}]




// Q6. OTP Slot Machine — splice + destructuring
let queue = ["Raj", "Priya", "Lion", "Amit", "Sara", "Dev"];

// Expected after operations:
// served: ["Raj", "Priya", "Lion"]
// after VIP insert at pos 2: ["Amit","Sara","VIP_Kumar","Dev"]
// remaining: ["Amit","Sara","VIP_Kumar","Dev"]

function manageBankQueue(queue, vipName, vipPosition) {
  // serve first 3 — splice modifies original!
  const served = queue.splice(0, 3);

  // insert VIP at position
  queue.splice(vipPosition, 0, vipName);

  // destructure first two in remaining
  const [next1, next2, ...rest] = queue;

  return { served, remaining: queue, next1, next2, rest };
}

// let queue = ["Raj","Priya","Lion","Amit","Sara","Dev"];
console.log(manageBankQueue(queue, "VIP_Kumar", 2));
// served: ["Raj","Priya","Lion"]
// remaining: ["Amit","Sara","VIP_Kumar","Dev"]
// next1: "Amit", next2: "Sara"
// rest: ["VIP_Kumar","Dev"]



// Q7. Maximum Subarray — Kadane's Algorithm
// Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output: 6
// Explanation: [4, -1, 2, 1] has max sum = 6

// Input:  [-1, -2, -3]
// Output: -1 (all negative — pick least negative!)
function maxSubarraySum(arr) {
  let maxSum     = arr[0];  // handles all-negative case
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // either extend current subarray or start fresh
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    maxSum     = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

console.log(maxSubarraySum([-2,1,-3,4,-1,2,1,-5,4])); // 6
console.log(maxSubarraySum([-1,-2,-3]));               // -1
console.log(maxSubarraySum([1,2,3,4]));                // 10

// WHY currentSum = Math.max(arr[i], currentSum + arr[i])?
// If currentSum is very negative — better to START FRESH from arr[i]
// If currentSum helps — EXTEND the subarray!
// This is the core insight of Kadane's algorithm!



// Q8. Group Anagrams — Swiggy Menu Grouping
// Input:  ["eat","tea","tan","ate","nat","bat"]
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

// Real world: Swiggy groups menu items with same ingredients
// FAANG: Google interview question!
function groupAnagrams(words) {
  const map = {};

  for (let word of words) {
    // sort letters → anagrams give same key!
    // "eat" → "aet" | "tea" → "aet" | "ate" → "aet"
    const key = word.split("").sort().join("");

    if (!map[key]) map[key] = [];
    map[key].push(word);
  }

  return Object.values(map);
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [["eat","tea","ate"],["tan","nat"],["bat"]]

// WHY sort the letters?
// Anagrams contain same letters — sorting gives identical key!
// "eat".split("").sort().join("") → "aet"
// "tea".split("").sort().join("") → "aet"  ← same key!
// HashMap groups them together!



// Q9. IRCTC Seat Availability — 2D Array + Splice
let train = [
  ["S1", "S2",  "S3",  "S4"],   // Coach A
  ["S5", "X",   "S7",  "S8"],   // Coach B (S6 booked)
  ["S9", "S10", "X",   "S12"],  // Coach C (S11 booked)
  ["X",  "S14", "S15", "X"],    // Coach D (S13,S16 booked)
];

function bookSeat(train, coach, seat) {
  if (train[coach][seat] === "X") {
    return "Already booked!";
  }
  const seatName = train[coach][seat];
  train[coach][seat] = "X";
  return `${seatName} booked successfully! ✅`;
}

function cancelSeat(train, coach, seat, seatName) {
  train[coach][seat] = seatName;
  return `${seatName} cancelled! 🔓`;
}

function findFirstAvailable(train) {
  for (let c = 0; c < train.length; c++) {
    for (let s = 0; s < train[c].length; s++) {
      if (train[c][s] !== "X") {
        return { coach: c, seat: s, name: train[c][s] };
      }
    }
  }
  return "Train full! 😱";
}

function countAvailable(train) {
  return train.flat().filter(s => s !== "X").length;
}

console.log(bookSeat(train, 0, 0));       // S1 booked!
console.log(bookSeat(train, 1, 1));       // Already booked!
console.log(findFirstAvailable(train));   // {coach:0, seat:1, name:"S2"}
console.log(countAvailable(train));       // 10 available
console.log(cancelSeat(train, 1, 1, "S6")); // S6 cancelled!
console.log(countAvailable(train));       // 11 available



// Q10. Stock Buy Sell — Best Time to Buy
// Input:  [7, 1, 5, 3, 6, 4]
// Output: 5
// Explanation: Buy at 1 (day 2), sell at 6 (day 5) → profit = 5

// Input:  [7, 6, 4, 3, 1]
// Output: 0
// Explanation: prices falling — no profit possible!

function maxProfit(prices) {
  let minPrice  = prices[0];  // cheapest day to buy
  let maxProfit = 0;          // best profit so far

  for (let i = 1; i < prices.length; i++) {
    // Can we buy cheaper?
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }
    // Is today's profit better than best so far?
    const todayProfit = prices[i] - minPrice;
    if (todayProfit > maxProfit) {
      maxProfit = todayProfit;
    }
  }
  return maxProfit;
}

console.log(maxProfit([7,1,5,3,6,4])); // 5
console.log(maxProfit([7,6,4,3,1]));   // 0
console.log(maxProfit([2,4,1,7]));     // 6 (buy at 1, sell at 7)

// WHY this works:
// At every day — best profit = today's price - cheapest price BEFORE today
// We track minPrice as we go → one single pass → O(n)!
// Brute force = O(n²) → two nested loops trying every pair!


// Q1  → push/pop/shift/unshift — O(1) vs O(n)
// Q2  → map/filter + destructuring
// Q3  → indexOf/lastIndexOf/includes
// Q4  → 2D array traversal + flat()
// Q5  → filter + sort comparator + map chaining
// Q6  → splice delete/insert + rest destructuring
// Q7  → Kadane's algorithm — FAANG classic! (arrays)
// Q8  → Group anagrams — HashMap + sort (Google!)
// Q9  → 2D array + real world booking system
// Q10 → Stock profit — Amazon/Microsoft classic!