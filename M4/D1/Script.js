// Create a function to calculate the sum of the two given integers. If the two values are the same, return triple their sum.
const tripleInt = function (a, b) {
  if (a === b) {
    return (a + b) * 3;
  } else {
    return a + b;
  }
};
console.log(tripleInt(3, 3));
// Create a function to check two given integers. Return true if one of them is 50 or if their sum is 50.
const intCheck = function (a, b) {
  return a === 50 || b === 50 || a + b === 50 
};
console.log(intCheck(1,49))
// Create a function to remove a character at a specified position from a given string: pass the position and the string as parameters, return the new string.
const sliceFunction = function(text,position){
    return text.slice(0,position - 1) + text.slice(position)
}
console.log(sliceFunction("Hello Friend",8))
// Create a function to find and return the largest of three given integers.
const largestInt = function(a,b,c){
    if(a > b && a > c){
        return a
    } else if (b > a && b > c){
        return b
    } else {
        return c
    }
};
console.log(largestInt(929292930,929292928,929292929))

// Create a function to check if two numbers are in the range 40-60 or 70-100. Return true if they do, return false if one (or both) don’t.
const rangeInt = function(a,b){
    if(a && b >=40 && a&&b <=60 || a&&b >= 70 && a&&b <= 100){
        return true
    } else {
        return false
    }
}
console.log(rangeInt(40,2))
// Create a function to create a new string composed of a specified number of copies of a given string. Pass the string and the number of copies as parameters. 
const duplicateString = function(string, num){
    let emptyString = ""
    for(let i = 0; i < num; i++){
        emptyString += string + " " 
    }
    return emptyString
}
console.log(duplicateString("test",6))
// Create a function to display the city name if the string begins with “Los” or “New”. Pass the city name as a parameter. Return false if they start with a different string.
const cityName = function(string){
    if(string.startsWith("Los") || string.startsWith("New")){
        return "City starts with Los or New"
    } else{
        return "City name does not contain Los or New"
    }
};
console.log(cityName("New York"))
// Create a function to calculate and return the sum of all elements from an array with 3 elements. Pass the array as a parameter.
const calc = function(array){
    let arr = 0
    for(let i = 0; i < array.length; i++){
        arr += array[i]
    }
    return arr
}
console.log(calc([2,5,6]))
// Create a function to test if an array of length 2 contains 1 OR 3. Return true is it does, false if it doesn’t.
const find1or3 = function(array){
    let ContainsOneOrThree = false

    for(let i = 0; i < array.length; i++){
        let arrNum = array[i]
        if(arrNum === 1 || arrNum === 3){
            ContainsOneOrThree = true
        }
    }
    return ContainsOneOrThree
}

console.log(find1or3([3,1]))

// Create a function to test if an array of length 2 DOES NOT contain 1 or 3. Return true if it doesn’t, false if it does.
const Not1or3 = function(array){
    let differentNum = true

    for(let i = 0; i < array.length; i++){
        let arrNum = array[i]
        if(arrNum === 1 || arrNum === 3){
            differentNum = false
        }
    }
    return differentNum
}

console.log(Not1or3([2,2]))
// Create a function to find the longest string from a given array of strings. Pass the array as parameter and return the longest string.
function largestString(array) {
    let identifier = 0
    let stringContent = ""
  
    for (let i = 0; i < array.length; i++) {
      const content = array[i]
  
      if (identifier < content.length) {
        identifier = content.length
        stringContent = content
      }
    }
  
    return stringContent
  }
  console.log(largestString(["I", "Am", "Testing"]));

// Create a function to find the types of a given angle:
// Acute angle ⇒ between 0 and 90 degrees. Return acute.
// Right angle ⇒ 90 degree. Return right
// Obtuse angle ⇒ between 90 and 180. Return obtuse
// Straight angle ⇒ 180 degrees. Return straight

function Angle(num) {
    if (num >= 0 && num < 90) {
        return "acute angle";
    } else if (num === 90) {
        return "right angle";
    } else if (num > 90 && num < 180) {
        return "obtuse angle";
    } else if (num >= 180) {
        return "straight";
    } else {
        return "this number is in the negative values";
    }
}
console.log(Angle(10))

// Create a function to find and return the index of the greatest element of a given array of integers that you passed as a parameter
const largestElement = function(array){
    let parameter = 0

    for(let i = 0; i < array.length; i++){
        let num = array[i]
        if (parameter < num){
            parameter = num
        }  
    }
    let findNum = array.indexOf(parameter)
    return findNum
}
console.log(largestElement([20,15,60]))
// Create a function to find and return the largest even number from an array of integers that is passed a parameter.
const evenNum = function(array){
    let even = []

    for(let i = 0; i < array.length; i++){
        let value = array[i]
        if(value % 2 === 0){
            even.push(value)
        }
    }
    return Math.max.apply(null, even)
}
console.log(evenNum([1,10,20]))

// Create a function to check from two given integers (passed as parameters) if one is positive and the other is negative. Return true if that’s the case, return false if it’s not.
const positiveAndNegative = function(a,b){
    if(a >=0 && b<0){
        return true
    } else {
        return false
    }
}

console.log(positiveAndNegative(2,-4))

// Create a function to create and return a new string where the first 3 characters are in lower case and the others are in upper case. 
//If the string’s length is less than 3, convert the whole string into uppercase. Pass the original string as a parameter.


// Create a function to calculate the sum of two integers (passed as parameters). If the sum is in the 50-80 range, return 65, otherwise, return 80.
const between60And80 = function(a,b){
    if(a + b >= 50 && a + b <=80){
        return 65
    } else {
        return 80
    }
}
console.log(between60And80(50,10))
// Create a function to convert a number (passed as a parameter) into a string, basing yourself on this example:
// The number has 3 as a factor ⇒ return Diego
// The number has 5 as a factor ⇒ return Riccardo
// The number has 7 as a factor ⇒ return Stefano
// If the number does not have 3,5, or 7, return the original number.
// ⚠️ The factor is an integer which evenly divides a number without leaving a remainder.
// One number can have more than one factor, in that case you should return both names.
// Ex: 15 has both 3 and 5 has factors: the function will return DiegoRiccardo

const numToName = function(digit){
    let string = " "

    if(digit % 3 !==0 && digit % 5 !== 0 && digit % 7 !== 0){
        return digit
    }

    if (digit % 3 === 0) string += "Diego"
    if (digit % 5 === 0) string +="Riccardo"
    if (digit % 7 === 0) string +="Stefano"

    return string
}

console.log(numToName(42))

// Create a function that that takes a phrase as a parameter and returns its acronym. Ex. British Broadcasting Corporation returns BBC

const acronym = function(string){
    let arr = []
    let stringSplit = string.split(" ")

    for(let i = 0; i < stringSplit.length; i++){
        const firstLetter = stringSplit[i]
        arr.push(firstLetter.charAt(0).toUpperCase()) 
    }
    return arr.join("")
}

console.log(acronym("British Broadcasting Corporation"))