
// WHY DO WE NEED LOOPS?

// Without loop — repeating same code (bad!)
console.log("User 1 notified");
console.log("User 2 notified");
console.log("User 3 notified");

// With loop — scalable to millions!
let totalUsers = 5;
for (let i = 1; i <= totalUsers; i++) {
  console.log(`User ${i} notified ✅`);
}


// for loop
// Use when you KNOW exact count

// Basic
for (let i = 0; i < 5; i++) {
  console.log("i:", i);
}

// Backwards
for(let i=5; i>=0; i--){
    console.log("i:", i); // 5 4 3 2 1 0
}

// Backwards
for (let i = 5; i >= 1; i--) {
  process.stdout.write(i + " "); // 5 4 3 2 1
}
console.log();


const fruits2 = ["Apple", "Banana", "Mango"]; // Length = 3
// Real-world pattern to read an array backwards
for (let i = fruits2.length - 1; i >= 0; i--) {
    console.log(fruits2[i]); // Mango, Banana, Apple
}

// console.log() is a high-level wrapper built into JavaScript environments. 
// It handles objects, arrays, numbers, and strings gracefully, and auto-formats them. 
// It is what you will use 99% of the time for debugging and logging server events.

// process.stdout.write() is a Node.js-specific streaming API. 
// It only accepts strings or buffers. 
// If you accidentally pass a raw number or object into it without converting it to a string first, 
// your app will throw a type error or misbehave.


// Even Numbers
for(let i=0; i<=10; i+=2){
    // console.log(i); // 0 2 4 6 8 10
    process.stdout.write(i + " "); // 0 2 4 6 8 10
}
console.log(); // To move to the next line after printing even numbers

// The Terminal Problem: The Invisible "Newline"
// When you use process.stdout.write(), 
// it prints characters onto the screen but leaves the terminal cursor flashing right where the text ended. 
// It does not move the cursor down to a new line.
// If you don't add an empty console.log(); 
// at the end, your terminal prompt (the line where you type your next command, 
// like your name kanha@MacBook ~ %) will get glued directly onto the end of your loop output!


// Loop through array with index
let fruits3 = ["apple", "mango", "banana", "orange"];
for (let i = 0; i < fruits3.length; i++) {
  console.log(`${i + 1}. ${fruits3[i]}`);
}

// FAANG tip — cache length for performance!
const len = fruits3.length;
for (let i = 0; i < len; i++) {
  // faster — doesn't check .length every iteration
}



// while loop
// Use when you DON'T know count upfront

let count = 1;
while (count <= 5) {
  console.log("count:", count);
  count++;
}

// Real world — retry until success
let attempts = 0;
let success = false;
while (!success && attempts < 3) {
  attempts++;
  console.log(`API attempt ${attempts}...`);
  if (attempts === 2) success = true; // simulated success
}
console.log(success ? "API success! ✅" : "API failed ❌");


// TASK 4 — do-while
// Runs AT LEAST ONCE before checking condition

// Runs even if condition is false from start!
let val = 10;
do {
  console.log("val:", val); // prints 10 even though 10 < 5 is false
} while (val < 5);

// Real world — show menu at least once
let menuItems = ["View Profile", "Settings", "Exit"];
let choiceIndex = 0;
do {
  console.log("\n--- MENU ---");
  menuItems.forEach((item, i) => console.log(`${i + 1}. ${item}`));
  choiceIndex++;
} while (choiceIndex < 2);



// TASK 5 — for...of
// Use for VALUES of array/string

// Array values
let cities = ["Raipur", "Delhi", "Mumbai"];
for (let city of cities) {
  console.log(city);
}

// String characters
for (let char of "Thunder") {
  process.stdout.write(char + " "); // T h u n d e r
}
console.log();

// With index using entries()
for (let [index, city] of cities.entries()) {
  console.log(`${index + 1}. ${city}`);
}

// With break — CAN break out of for...of!
for (let city of cities) {
  if (city === "Delhi") break;
  console.log(city); // only Raipur
}



// TASK 6 — for...in
// Use for KEYS of object

let profile = { name: "Lion", age: 21, city: "Raipur", course: "Thunder" };

for (let key in profile) {
  console.log(`${key}: ${profile[key]}`);
}

// NEVER use for...in on arrays!
let arr = [10, 20, 30];
for (let key in arr) {
  console.log(typeof key, key); // "string" "0" — keys are strings!
}
// Use for...of instead for arrays!



// TASK 7 — forEach
// Use for SIDE EFFECTS on each array item
// Cannot break out! Cannot return value!

let scores2 = [85, 92, 78, 95, 88];

scores2.forEach((score, index) => {
  console.log(`Student ${index + 1}: ${score}`);
});

// forEach vs for...of
// forEach → cleaner, but NO break
// for...of → can break, more flexible




// TASK 8 — Working with STRINGS in loops

let str5 = "Thunder100";

// Loop through characters
for (let char of str5) {
  process.stdout.write(char + " ");
}
console.log();

// Count digits in string
let digitCount = 0;
for (let char of str5) {
  if (!isNaN(char) && char !== " ") digitCount++;
}
console.log("Digits in string:", digitCount); // 3


// Reverse a string
let str7 ="Ajay Tiwari"
let reversed2 = "";
for (let char of str7) {
  reversed2 = char + reversed2; // ✅ FIXED: Changed variable typo from reversed3 to reversed2
}
console.log("Reversed:", reversed2); // 001rednnuhT

// Count vowels
let vowelCount = 0;
for (let char of str7.toLowerCase()) {
  if ("aeiou".includes(char)) vowelCount++;
}
console.log("Vowels:", vowelCount); // 2

// Check palindrome
function isPalindrome(s) {
  s = s.toLowerCase();
  for (let i = 0; i < Math.floor(s.length / 2); i++) {
    if (s[i] !== s[s.length - 1 - i]) return false;
  }
  return true;
}
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false


// return s === s.split('').reverse().join('');
// This is a classic "one-liner" string reversal strategy. It relies on the method-chaining pattern to reverse a string. Here is exactly what happens step-by-step in memory:

// s.split(''): = Example: "cat" → ['c', 'a', 't']
// .reverse(): = Example: ['c', 'a', 't'] → ['t', 'a', 'c']
// .join(''): = Example: ['t', 'a', 'c'] → "tac"

// Approach 1: The Brute Force Path (Creating a Reverse Copy)
// function isPalindromeBrute(s) {
//     s = s.toLowerCase();
//     let reversed = "";
    
//     // Build an entire string copy backwards in memory
//     for (let char of s) {
//         reversed = char + reversed;
//     }
//     return s === reversed;                Space Complexity: O(N)
// }                                         Time Complexity: O(N)



// Approach 2: The Two-Pointer Convergence Pattern (The Optimal One)
// function isPalindromeOptimal(s) {
//     s = s.toLowerCase();
//     let left = 0;
//     let right = s.length - 1;
    
//     while (left < right) {
//         if (s[left] !== s[right]) return false;
//         left++;
//         right--;
//     }
//     return true;                Time Complexity: O(N)
// }                               Space Complexity: O(1)



// Approach 3: The Recursive Strategy (The Interview Special)
// function isPalindromeRecursive(s) {
//     s = s.toLowerCase();
    
//     // Base Case: If the string is empty or 1 letter long, it's a palindrome!
//     if (s.length <= 1) return true;
    
//     // Check if outer edges match
//     if (s[0] !== s[s.length - 1]) return false;
    
//     // Slice off the outer edges and pass the smaller inner word back to the function
//     return isPalindromeRecursive(s.slice(1, -1));              Space Complexity: O(N)
// }                                                              Time Complexity: O(N)




// Working with ARRAYS in loops
let nums = [85, 92, 78, 95, 88, 72, 96];

// Sum and average
let sum = 0;
for (let n of nums) sum += n;
let avg = sum / nums.length;
console.log("Sum:", sum, "| Avg:", avg.toFixed(2));

// Max and min
let max = nums[0], min = nums[0];
for (let n of nums) {
  if (n > max) max = n;
  if (n < min) min = n;
}
console.log("Max:", max, "| Min:", min);


// Filter passing scores (>= 80)
let passing = [];
for (let n of nums) {
  if (n >= 80) passing.push(n);
}
console.log("Passing:", passing);

// Find index of value
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
console.log("Index of 95:", findIndex(nums, 95)); // 3



// Nested Loops
// Inner loop runs COMPLETELY for each outer step
// Multiplication table
for (let i = 1; i <= 3; i++) {
  let row = "";
  for (let j = 1; j <= 3; j++) {
    row += `${i * j}\t`;
  }
  console.log(row);
}


// 2D array traversal — real world: game grid, spreadsheet
let grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    process.stdout.write(grid[row][col] + " ");
  }
  console.log();
}

// Find target in 2D grid with labeled break
let target = 5;
let foundAt = null;
search: for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    if (grid[r][c] === target) {
      foundAt = { row: r, col: c };
      break search; // exits BOTH loops!
    }
  }
}
console.log(`Found ${target} at:`, foundAt);



// Patterns
// Nested loop logic thinking!
let size = 4;

// Pattern 1 — Right Triangle
console.log("--- Right Triangle ---");
for (let i = 1; i <= size; i++) {
  console.log("* ".repeat(i).trim());
}

// Pattern 2 — Inverted Triangle
console.log("--- Inverted Triangle ---");
for (let i = size; i >= 1; i--) {
  console.log("* ".repeat(i).trim());
}

// Pattern 3 — Number Triangle
console.log("--- Number Triangle ---");
for (let i = 1; i <= size; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) row += j + " ";
  console.log(row.trim());
}

// Pattern 4 — Pyramid
console.log("--- Pyramid ---");
for (let i = 1; i <= size; i++) {
  console.log(" ".repeat(size - i) + "* ".repeat(i).trim());
}

// Pattern 5 — Diamond
console.log("--- Diamond ---");
for (let i = 1; i <= size; i++) {
  console.log(" ".repeat(size - i) + "* ".repeat(i).trim());
}
for (let i = size - 1; i >= 1; i--) {
  console.log(" ".repeat(size - i) + "* ".repeat(i).trim());
}



// Problems: Easy to Hard
// EASY 1 — Sum of N numbers
function sumToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}
console.log("Sum 1-10:", sumToN(10)); // 55
// FAANG O(1) formula — no loop needed!
console.log("Formula:", 10 * 11 / 2); // 55 ⚡


// EASY 2 — FizzBuzz (Google classic!)
console.log("\n--- FizzBuzz ---");
for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}


// EASY 3 — Reverse string
function reverseStr(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
console.log("\nReverse:", reverseStr("Thunder")); // rednnuhT
// One liner: "Thunder".split("").reverse().join("")


// MEDIUM 1 — Find duplicates
function findDuplicates(arr) {
  let seen = {};
  let duplicates = [];
  for (let item of arr) {
    if (seen[item]) duplicates.push(item);
    else seen[item] = true;
  }
  return duplicates;
}
console.log("\nDuplicates:", findDuplicates([1,2,3,2,4,3,5])); // [2,3]
// O(n) — single loop + object lookup!


// MEDIUM 2 — Two Sum (Most asked FAANG!)
function twoSum(nums, target) {
  let seen = {};
  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (seen[complement] !== undefined) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
  return [];
}
console.log("\nTwo Sum:", twoSum([2,7,11,15], 9)); // [0,1]
// O(n) HashMap approach — brute force is O(n²)!

// MEDIUM 3 — Flatten array
function flatten(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      for (let inner of item) result.push(inner);
    } else {
      result.push(item);
    }
  }
  return result;
}
console.log("\nFlatten:", flatten([1,[2,3],[4,5],6])); // [1,2,3,4,5,6]


// HARD — Find all pairs with given sum
function findPairs(arr, target) {
  let pairs = [];
  let seen = new Set();
  for (let num of arr) {
    let complement = target - num;
    if (seen.has(complement)) {
      pairs.push([complement, num]);
    }
    seen.add(num);
  }
  return pairs;
}
console.log("\nPairs sum 7:", findPairs([1,2,3,4,5,6], 7));
// [[3,4],[2,5],[1,6]]



// Real World Loops Ranking
let products = [
  { id: 1, name: "Pizza", price: 299, category: "food" },
  { id: 2, name: "Burger", price: 149, category: "food" },
  { id: 3, name: "Coke", price: 49, category: "drink" },
  { id: 4, name: "Fries", price: 99, category: "food" },
];

// map — transform data (React uses this for lists!)
let names = products.map(p => p.name);
console.log("Names:", names);

// filter — filter by condition
let food = products.filter(p => p.category === "food");
console.log("Food items:", food.length);

// reduce — calculate total
let total = products.reduce((sum, p) => sum + p.price, 0);
console.log("Cart total: ₹" + total);

// forEach — side effects
products.forEach(p => {
  if (p.price < 100) console.log(`Deal: ${p.name} at ₹${p.price}!`);
});

// find — first match
let cheap = products.find(p => p.price < 100);
console.log("Cheapest:", cheap.name);

// some — does any match?
let hasExpensive = products.some(p => p.price > 200);
console.log("Has expensive item:", hasExpensive);

// every — do all match?
let allFood = products.every(p => p.category === "food");
console.log("All food?", allFood);


















// WHY DO WE NEED LOOPS?
// Imagine Zomato sends order confirmation to 10 million users daily.
// Without loops: 

// sendEmail(user1);
// sendEmail(user2);
// sendEmail(user3);
// ... 10 million lines 😱

// for (let user of users) {
//   sendEmail(user);
// }
// 3 lines — handles 10 million! ✅

// 3 reasons loops exist:
// => Repetition → do same task N times
// => Iteration → go through every item in a collection
// => Automation → let computer do boring repeated work

// Loop = 3 things:
// ┌─────────────────────────────────┐
// │  1. CONDITION  → when to run?   │
// │  2. BODY       → what to do?    │
// │  3. UPDATE     → change state!  │
// └─────────────────────────────────┘

// Without update → infinite loop → browser crashes!
// Without condition → never stops!
// Without body → nothing happens!

// ALL LOOPS IN JAVASCRIPT

// 1. FOR LOOP
// SYNTAX :
// for (initialization; condition; update) {
//   // body
// }

// MEMORY DIAGRAM - HOW IT RUNS
// init runs ONCE at start
//         ↓
// check condition → false? EXIT loop
//         ↓ true
//    run body
//         ↓
//    run update
//         ↓
// check condition again → repeat!

for(let i=0; i<5; i++){
    console.log(i);  // 0 1 2 3 4 
}

// When to use:
// When you know EXACT count before loop starts!

// Send OTP to 100 users 
// for(let i=0; i<users.length; i++){
//     sendOTP(users[i]);
// }

// for = "FOR this many times"
// i = index (convention — use i, j, k for nested)
// i++ = move forward | i-- = move backward
// i += 2 = skip every other


// 2. WHILE LOOP
// Syntax:
// while (condition) {
//   // body
//   // MUST update something or infinite loop!
// }

// HOW IT RUNS
// check condition → false? EXIT immediately
//         ↓ true
//    run body
//         ↓
// check condition → repeat!

let i = 0;
while (i < 5) {
  console.log(i);  // 0 1 2 3 4
  i++; // MUST have this!
}

// When to use:
// When you DON'T know how many times upfront!
// Condition depends on something external!

// Keep retrying API until success
// let response = null;
// while (response === null) {
//   response = callAPI();
// }

// Game loop — keep playing until game over
// while (!gameOver) {
//   updateGameState();
//   renderFrame();
// }

// while = "WHILE this is true, keep going"
// Like a watchman — keeps checking condition!


// 3. DO-WHILE LOOP
// Syntax:
// do {
//   // body runs FIRST
// } while (condition);

// HOW IT RUNS
// run body FIRST (no condition check!)
//         ↓
// check condition → false? EXIT
//         ↓ true
// run body again → repeat!

let j = 10;
do {
  console.log(j); // prints 10 even though 10 < 5 is false!
} while (j < 5);

// When to use:
// When body MUST run at least once regardless of condition!

// Show login form at least once
// do {
//   showLoginForm();
//   let result = getUserInput();
// } while (!isValidLogin(result));

// ATM — show menu at least once
// do {
//   showATMMenu();
//   choice = getChoice();
// } while (choice !== "exit");

// do-while = "DO this first, THEN check"
// Like eating food first, THEN deciding if you want more!


// 4. FOR...OF LOOP
// Syntax:
// for (let item of iterable) {
//   // item = current value
// }

// Works on: Arrays, Strings, Maps, Sets, any iterable!

let fruits = ["apple", "mango", "banana"];
for (let fruit of fruits) {
  console.log(fruit); // apple, mango, banana
}

// With string!
for (let char of "Lion") {
  console.log(char); // L, i, o, n
}

let cars = ["bmw", "audi", "mercedes", "range rover"];
for(let car of cars){
    console.log(car); // bmw, audi, mercedes, range rover
}

// With string 
for(let char of "tanya"){
    console.log(char); // t, a, n, y, a
}

// When to use:
// When you need VALUES of array/string!
// Cleaner than for loop for arrays!

// Process all orders
// for (let order of orders) {
//   processOrder(order);
// }

// Calculate cart total
// let total = 0;
// for (let item of cartItems) {
//   total += item.price;
// }

// for...of = "for each VALUE OF this collection"
// of = values!



// 5. FOR...IN LOOP
// Syntax:
// for (let key in object) {
//   // key = property name (string)
//   // object[key] = value
// }

let user = {name: "tanya", age:19, city: "Jamshedpur"};
for(let key in user){
    console.log(key, ":", user[key]);
    // name : tanya
    // age : 19
    // city : Jamshedpur
}

let user2 = { name: "Lion", age: 21, city: "Raipur" };
for (let key in user2) {
  console.log(key, ":", user2[key]);
  // name : Lion
  // age : 21
  // city : Raipur
}

// When to use:
// When you need KEYS of an object!

// Display all profile fields
// for (let field in userProfile) {
//   renderField(field, userProfile[field]);
// }

// for...in = "for each KEY IN this object"
// in = keys!


// 6. FOREACH — ARRAY METHOD
// Syntax:
// array.forEach((item, index, array) => {
//   // item = current value
//   // index = current position
//   // array = full array (rarely used)
// });

let str = ["ajay", "aman", "pragati", "tanya"];
str.forEach((str,i)=>{
    console.log(i,str);
});

let nums = [10, 20, 30];
nums.forEach((num, i) => {
  console.log(i, num); // 0 10 | 1 20 | 2 30
});

// When to use:
// When you want to DO something with each item
// No need to return anything
// Cannot break out of forEach — use for loop instead!

// Send notification to all users
// users.forEach(user => sendNotification(user));

// Add event listener to all buttons
// buttons.forEach(btn => {
//   btn.addEventListener("click", handleClick);
// });

// forEach = "for EACH item, do this"
// Cannot break! Cannot return value from forEach!

// Loop          When to use                    Can break?  Returns?
// ──────────────────────────────────────────────────────────────────
// for           Known count, index needed      YES         NO
// while         Unknown count, condition based YES         NO
// do-while      Must run at least once         YES         NO
// for...of      Array/string values            YES         NO
// for...in      Object keys                    YES         NO
// forEach       Side effects on array          NO ❌       NO
// map           Transform array → new array    NO ❌       YES ✅
// filter        Filter array → new array       NO ❌       YES ✅
// reduce        Array → single value           NO ❌       YES ✅



// WORKING WITH STRINGS IN LOOPS
let str2 = "Thunder";

// Loop through characters
for (let char of str2) {
  console.log(char); // T h u n d e r
}

// With index
for (let i = 0; i < str2.length; i++) {
  console.log(i, str2[i]);
}

// Reverse a string
let reversed = "";
for (let char of str2) {
  reversed = char + reversed;
}
console.log(reversed); // rednnuhT

// Count vowels
let vowels = 0;
for (let char of str2.toLowerCase()) {
  if ("aeiou".includes(char)) vowels++;
//   if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u'){
//     vowels++;
//   }
}
console.log(vowels); // 2 (u and e)

let str3 = "banana";
let uniqueVowels = new Set(); // Creates an empty, duplicate-free collection

for (let char of str3.toLowerCase()) {
    if ("aeiou".includes(char)) {
        uniqueVowels.add(char); // Adds the vowel to our Set
    }
}

// .size tells you how many unique items are inside the Set
console.log(uniqueVowels.size); // Prints: 1 (It only contains ['a'])


let str4 = "Thunder";
let uniqueVowels2 = new Set();

for (let char of str4.toLowerCase()) {
    if ("aeiou".includes(char)) {
        uniqueVowels2.add(char);
    }
}

// Convert Set into an Array using the spread operator
let vowelArray = [...uniqueVowels2]; 
console.log(vowelArray); // Prints: ['u', 'e'] ✅

// Convert the Array into a single string separated by commas
// let vowelString = [...uniqueVowels2].join(", ");
// console.log(vowelString); // Prints: "u, e" ✅



// WORKING WITH ARRAYS IN LOOPS
let scores = [10, 20, 30, 40, 50];

// Sum of scores
let totalSum = 0;
for(let score of scores) totalSum += score;
console.log(totalSum); // 150

// Average score
let average = totalSum / scores.length;
console.log(average); // 30

// Find max score
let maxScore = scores[0];
for(let score of scores){
    if(score > maxScore) maxScore = score;
}
console.log(maxScore); // 50

// Find min score
let minScore = scores[0];
for(let score of scores){
    if(score < minScore) minScore = score;
}
console.log(minScore); // 10

// Filter manually
let passing = [];
for(let score of scores){
    if(score >= 30) passing.push(score);
}
console.log(passing); // [30, 40, 50]

// Map manually
let doubled = [];
for(let score of scores){
    doubled.push(score * 2);
}
console.log(doubled); // [20, 40, 60, 80, 100]

// Find Index
let targetIndex = -1;
for(let i=0; i<scores.length; i++){
    if(scores[i] == 40){
        targetIndex = i;
        break; // Stop searching once found
    }
}
console.log(targetIndex); // 3



// NESTED LOOPS
// Loop inside a loop — inner loop runs COMPLETELY for each outer iteration!

for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`i=${i} j=${j}`);
  }
}

// Total iterations = outer * inner = 3 * 3 = 9

// Time Compllexity warning:
// 1 loop  = O(n)
// 2 loops = O(n²) → avoid for large data!
// 3 loops = O(n³) → almost never in production!

// 2D grid (game board, spreadsheet)
// for (let row = 0; row < grid.length; row++) {
//   for (let col = 0; col < grid[row].length; col++) {
//     processCell(grid[row][col]);
//   }
// }
