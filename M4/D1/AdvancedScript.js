/**1. Given a string (as a parameter), return the character that is most commonly used.  */
const commonChar = function (string) {
  let counter = 0;
  let char = "";

  let stringSplit = string.split("");

  for (let i = 0; i < stringSplit.length; i++) {
    let individualChar = stringSplit[i];
    let length = string.split(individualChar).length;
    if (length > counter) {
      char = individualChar;
      counter = length;
    }
  }
  return char;
};

console.log(commonChar("hello"));

// 2. Check if two strings (passed as parameters) are anagrams of each other. Do not consider spaces or punctuation, make the whole word lower case. Return true if
// the words are anagram, return false if they aren’t.

const anagram = function(a,b) {
  if (a.split("").sort().join() === b.split("").sort().join()){
    return true
  } else {
    return false
  }
}

console.log(anagram("rasp", "spar"))

// 3. Given a word and a list of possible anagrams (both passed as parameters), return the correct list of anagrams: Ex. “listen” is the word, [“enlist”, “google”, “inlets”]
// are the possibilities: the output should be [“enlist”, “inlets”]

const anagram2 = function (a, b) {
  let arr = [];

  for (let i = 0; i < b.length; i++) {
    let anagrams = b[i];
    if (anagram(a,anagrams)) {
      arr.push(anagrams);
    }
  }
  return arr
};

console.log(anagram2("listen", ["enlist", "google", "inlets"]));

// 4. Given a string (as parameter), return true if the string is a palindrome or false if it is not. Include spaces and punctuation.
// Palindromes are strings that form the same word if it is reversed. Do include spaces and punctuation in determining if the string is a palindrome. Examples:
// palindrome("abba") === true
// palindrome("abcdefg") === false

const MatchOrNot = function(string){
  return string.toLowerCase().split("").reverse().join() === string.toLowerCase().split("").reverse().join()
}
console.log(MatchOrNot("abba"))

// 5. Given an integer (as parameter), return an integer which digits are the same as the original number, but reversed. Ex: 189 ⇒ 981
const mathReverse = function(num){
  return parseFloat(num.toString().split('').reverse().join(''))
}
console.log(mathReverse(981))

// 6. Write a function that takes a positive number X as a parameter. The function should output (as console.log) a step shaped string with X level
// using the # character. Make sure the steps are on the right hand side:
//  2 steps:
//     '# '
//     '##'
//  3 steps:
//       '#  '
//       '## '
//       '###'
//   4 steps:
//       '#   '
//       '##  '
//       '### '
//       '####'

const NumToHash = function(x){
  let str = "#"
  let blank = " "

  for (let i = 1; i < x + 1; i++) {
    console.log(str.repeat(i) + blank.repeat(x - i))
  }
}

console.log(NumToHash(3))

// 7. Create a function that, given a string as a parameter, returns a new string which is the original string, but reversed: “hello” ⇒ “olleh”
const reverseFunc = function(string){
return string.split("").reverse().join(" ")
}
console.log(reverseFunc("hello"))

// 8. Create a function that takes an array and a “chunk size” as parameters. Divide the array into subarrays with the “chunk size” as length: array: [1, 2, 3, 4],
// chunk size: 2 → [[ 1, 2], [3, 4]] array: [1, 2, 3, 4, 5], chunk size: 4 → [[ 1, 2, 3, 4], [5]]


// 9. Write a function that accepts a positive number X as parameter. The function should console.log a pyramid shape with N levels built using the # character.
// Example with X as 3
//   '  #  '
//   ' ### '
//   '#####'

function printPyramid(numLevels) {
  let blank = " "
  let str = "#"

  for(let i = 1; i < numLevels; i++){
    console.log(blank.repeat(numLevels - i) + str.repeat(i*2-1) + blank.repeat(numLevels-i))
  }
}

printPyramid(10);

// 10. Write a function that accepts an integer N and returns a NxN spiral matrix:
//  N = 2
//  [[1, 2],
//  [4, 3]]
//  N = 3
//  [[1, 2, 3],
//  [8, 9, 4],
//  [7, 6, 5]]
//   N = 4
//  [[1, 2, 3, 4],
//  [12, 13, 14, 5],
//  [11, 16, 15, 6],
//  [10,  9,  8, 7]] */

