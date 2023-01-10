/* EXERCISE 1
 Write a piece of code to find the largest of  given two integers
*/

/* WRITE YOUR ANSWER HERE */

if (3 < 6) {
  console.log("6 is the larger number")
}else ("3 is larger")


/* EXERCISE 2
  Write a piece of code to check: if  given an integer is NOT equal to 5 then display " not equal"
*/


/* WRITE YOUR ANSWER HERE */
let integer = 4;

if (integer !== 5) {
    console.log("not equal")
} else  console.log("equal")

/* EXERCISE 2
  Write a piece of code to check: if  given an integer is  divisible  by  5 then display "divisible by 5" (search for modulo operator)
*/

/* WRITE YOUR ANSWER HERE */
if (integer % 5 === 0){
  console.log("Divisible by 5")
} else console.log("not divisible by 5")

/* EXERCISE 3
 Write a piece of code for checking if, given two integers, the value of one of them is 8 or if their addition or subtraction is equal to 8.
*/



/* WRITE YOUR ANSWER HERE */

/* EXERCISE 4
 You are working on an e-commerce website. In the variable totalShoppingCart you are storing the total amount spent by the current user.
 Currently you have a promotion: if the customer's shopping cart total is more than 50, the user is eligible for free shipping (otherwise it costs 10).
 Write an algorithm that calculates the total cost to charge the user with.
*/

/* WRITE YOUR ANSWER HERE */
let totalShoppingCart = 70

if (totalShoppingCart > 50) {
  console.log(totalShoppingCart, "free shipping")
}else console.log(totalShoppingCart + 10, "10 shipping fee")

/* EXERCISE 5
You are working on an e-commerce website. Today is Black Friday and everything has a 20% discount at the end of the purchase.
 Modify the previous answer inserting this information and, applying the same rules for the shipping cost, calculate the totalCost.
*/

/* WRITE YOUR ANSWER HERE */
let BlackFriday = 0.8

if (totalShoppingCart > 0) {
  console.log(totalShoppingCart * BlackFriday,"20% discount applied")
}else console.log(totalShoppingCart * BlackFriday + 10, "20% discount not applicable")

/* EXERCISE 6
Create three variables and assign a numerical value to each one of them. 
 Using a conditional statement, write a piece of code for sorting their values from highest to lowest.
 Display the result in the console.
*/

/* WRITE YOUR ANSWER HERE */

const var1 = 2
const var2 = 4
const var3 = 6


/* EXERCISE 7
Write a piece of code for checking if a given value is a integer or not. (search for 'typeof')
*/

/* WRITE YOUR ANSWER HERE */

if (typeof integer === "number"){
  console.log("integer")
} else console.log("not an integer")


/* EXERCISE 8
 Write a piece of code for checking if a given number is even or odd. (search for modulo operator)
*/

/* WRITE YOUR ANSWER HERE */

if (integer % 2 == 0){
  console.log("even number")
}else console.log("odd number")

/* EXERCISE 9
Change the order of logic in the code so that it will return the correct statements in all cases.
let val = 7
if (val < 10) {
    console.log("Less than 10");
  } else if (val < 5) {
     console.log("Less than 5");
  } else {
    console.log("Greater than or equal to 10");
  }
*/

/* WRITE YOUR ANSWER HERE */

let val = 7

if (val < 5) {
  console.log("Less than 5");
  } else if (val < 10) {
    console.log("Less than 10");
  } else {
    console.log("Greater than or equal to 10");
  }

/*
EXERCISE 10
Write chained if/else if statements to fulfill the following conditions:
num < 5 - display Tiny
num < 10 - display Small
num < 15 - display Medium
num < 20 - display Large
num >= 20 - display Huge
*/

/* WRITE YOUR ANSWER HERE */
let num = 2

if (num < 5){
  console.log("display Tiny")
} else if (num < 10){
  console.log("display Small")
} else if(num < 15){
  console.log("display Medium")
} else if (num < 20){
  console.log("display Large")
} else if (num >= 20){
  console.log("display Huge")
}

/*  EXERCISE 11
Use a ternary operator to assign to a variable called gender the string values "male" or "female".
 The choice should be made based on the value of another variable called isMale.
*/

/* WRITE YOUR ANSWER HERE */
let isMale = true ? "male" : "female";

console.log(isMale)

/* EXERCISE 12
Display the numbers 0 through 5 (inclusive) in acesnding order using a while loop.
*/

/* WRITE YOUR ANSWER HERE */

let x = 0;
while (x <= 5) {
  console.log(x);
  x = x + 1;
}

/* EXERCISE 13
Display the numbers 0 through 10 (inclusive) in acesnding order using a for loop.
*/

/* WRITE YOUR ANSWER HERE */

let y = 0;

while (y <= 10) {
  console.log(y);
  y = y + 1;
}

/* EXERCISE 14
Display the numbers 0 through 10 (inclusive) in acesnding order  but skip displaying 3 and 8.
*/

/* WRITE YOUR ANSWER HERE */

for (let i = 0; i < 11; i++) {
  if (i !== 3 && i !== 8) {
    console.log(i);
  }
}

/* EXERCISE 15
 Write a JavaScript for loop that will iterate from 0 to 15. For each iteration, it will check if the current number is odd or even, and display a message to the screen
*/

/* WRITE YOUR ANSWER HERE */
for(let xy = 0; xy < 16; xy++)
if (xy % 2 == 0){
  console.log(xy,"even number")
}else console.log(xy,"odd number")

/* EXERCISE 16
  Write a JavaScript program which iterates the integers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz
 */

/* WRITE YOUR ANSWER HERE */
for(let a = 1; a < 100; a++){
  if (a % 3 === 0 && a % 5 ===0){
    console.log("FizzBuzz");
  } else if(a % 5 === 0){
   console.log("Buzz");
  } else if (a % 3 === 0){
    console.log("Fizz");
  }else console.log(a)
}

/* EXERCISE 17
  Write a piece of code to check the day of the week .  Usie  SWITCH - CASE  and given "day" variable with range from 1 to 7. 
  For example: if day value is equal to 1 display "Monday", if day value is equal to 3 display "Wednesday"

  */

/* WRITE YOUR ANSWER HERE */
let date = 1
switch (date){
  case 1:
    day = console.log("Monday");
      break;
  case 2:
    day = console.log("Tuesday")
      break;
  case 3:
    day = console.log("Wednesday")
      break;
  case 4:
    day = console.log("Thursday")
      break;
  case 5:
    day = console.log("Friday")
      break;
  case 6:
    day = console.log("Saturday")
      break;
  case 7:
    day = console.log("Sunday")
      break;
}

console.log (date)