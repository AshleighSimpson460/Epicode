/*
ASSIGNMENT RULES
- All the answers must be written in JavaScript
- You can ask for help, reach the Teaching Assistants if needed
- You can Google / use StackOverflow BUT only when you think you need something we didn't cover during lessons yet
- You can test your code in a separate file or de-commenting the single exercises in this one.
- You can use the bash terminal, the VSCode terminal or the one embedded in your Operating System if you're using macOS or Linux.
*/

/* EXERCISE 1
 Enumerate and describe the main datatypes in JavaScript. Try to explain the concepts as you were speaking to a 12 years old.
*/

/* WRITE YOUR ANSWER HERE */
/* There are 7 main datatypes in Javascript.*/
// 1. Number - This is a datatype strictly for only using numbers in Javascript if you use anything else for example a text where the number 6 is located it will no longer identify as a number
let num = 6;
//2. String - String is alphanumeric characters and string is only active inbetween speech marks "" you can add anything inside of the speechmarks and they will be indentified as a string
let string = "I start work at 10:45am and finish at 4pm"
//3. Boolean: Boolean is simply true or false. You use Boolean to identify if something is true or false, there cannot be anything inbetween it is either true or false, yes or no etc.

let truevalue = true;
let falsevalue = false;

//4. Undefined: This means that a variable was created however it has not been assigned any data it has just been given a name for example with 'let num =6'
// if I instead just let it be 'let num' this will be classed as undefined. The variable is there but it has no data inside of it

let num2
console.log("Undefined example:",num2);

//5. Null: Null however means that the variable has been created and it was assigned the data or value of being empty there is nothing inside of the variable

let num3 = null;
console.log("null example:",num3);

//6. Objects: They are a collection of key information for example names, addresses, age, date of birth
let identity = {
    name: "Ashleigh",
    Discord: "Ashleigh#9130",
    age: 22,
    Batch: "PT02/22"
}
console.log("identity:",identity);

//7. BigInt: BigInt is used to make numbers bigger than the maximum number value (MAX_SAFE_INTEGER). However, you cannot use fractional numbers with BigInt it can only be
// integer numbers.

const value = Number.MAX_SAFE_INTEGER;
console.log("Max_safe_integer:",value);

let y = BigInt(Number.MAX_SAFE_INTEGER);
console.log("Difference between Max and BigInt",y);

//8. Symbol: Symbols are a unique identifier: You will use symbol to ensure that there is only 1 of this item in the entire code, you can give these a description using ""
// you can create many symbols with the same id and they do not interfere with eachother.
// example below:
let example = Symbol("this is a symbol id",1);
let example2 = Symbol("this is a symbol id",1);
console.log("comparison example:",example == example2);


/* EXERCISE 2
 Try to describe what an object is, in your own words.
*/

/* WRITE YOUR ANSWER HERE */
// an object is a datatype in Javascript that companies can use to grab important information for example a company who does deliveries need objects because they need customer
// names, addresses and the times of their order for the receipts sometimes. This can all be done under the objects side of Javascript.

/* EXERCISE 3
 Write the code to execute an addition (a sum) of the numbers 12 and 20.
*/


/* WRITE YOUR ANSWER HERE */
console.log ("sum of 12 + 20 =",12 + 20);

/* EXERCISE 4
 Create a variable named x and assign to it the number 12.
*/

/* WRITE YOUR ANSWER HERE */
let x = 12;
console.log("assigning x a number:",x);

/* EXERCISE 5
 Create a variable called name and assign to it your name as a string.
*/

/* WRITE YOUR ANSWER HERE */
let name = "Ashleigh";

/* EXERCISE 6
 Execute a subtraction between the number 4 and the variable x you declared before (which is storing the value 12).
*/

/* WRITE YOUR ANSWER HERE */
console.log("subtracting 4 - x =",4 - x);

/* EXERCISE 7
Create two variables: name1 and name2. Assign to name1 the string "john", and to name2 the string "John" (this one has a capital J!)
 Verify that name1 is different from name2 (HINT: check their equality to be false).
 Finally, verify that the equality between name1 and name2 becomes true if both are lowercase (without changing the value of name2).
 YOU DON'T NEED AN IF/ELSE BLOCK. It is enough to use console.log()
*/

/* WRITE YOUR ANSWER HERE */
let name1 = "john";
let name2 ="John";
console.log("Verifying the names are different:",name1 == name2);
console.log("verifying the names can also be the same:",name1 != name2);

/* WHEN YOU ARE FINISHED
 Upload the .js file on Eduflow before 5PM CET. In the next days we'll also learn how to use GIT!
*/
