// 21) Given variables x = "John" and y = "Doe", write on the console "John <> Doe"
// 22) Create an object with properties such name, surname, email
// 23) Delete the email property from the previously created object
// 24) Create an array with 10 strings in it
// 25) Print in the console every string from the previous array
// 26) Create an array with 100 random numbers in it
// 27) Write a function to get the maximum and minimum values from the previously created array
// 28) Create an array of arrays, in which every array has 10 random numbers
// 29) Create a function that gets 2 arrays as parameters and returns the longest one
// 30) Create a function that gets 2 arrays of numbers as parameters and returns the one with the higher sum of values

let x = "John"
let y = "Doe"

console.log(x, "<>", y)

const obj = {
    firstName: "John",
    lastName: "Doe",
    email: "John.Doe@email.com"
}

delete obj.email

console.log(obj)

const arr = ["1","2","3","4","5","6","7","8","9","10",]

console.log(arr)

const arr2 = []

for(let i = 0; i < 100; i++){
    let random = Math.round(Math.random()*100);
    arr2.push(random)
}

console.log(arr2)

const minAndMax = function(){
    let min = Math.min(...arr2)
    let max =  Math.max(...arr2)
    value = min && max
    return value
}

console.log(minAndMax())

const arr3 = []

for(let i = 0; i < 10; i++){
    const newRow = []
    const ran = Math.floor(Math.random()*10)
    newRow.push(ran)
for(let j = 0; j < 10; j++){
    const ran2 = Math.floor(Math.random()*10)
    const value = [i,ran2].join("")
    arr3.push(value)
        
}
arr3.push(newRow)
}

console.log(arr3)

const arrParameters = function(){
    const paramOne = ["Hello my name is Ashleigh"]
    const paramTwo = ["Hello my name is Ashleigh Simpson"]
    const empty = []
    for(let i = 0; i < paramOne.length; i++){
        paramOne[i] = paramOne[i].length
    }
    for(let j = 0; j < paramTwo.length; j++){
        paramTwo[j] = paramTwo[j].length
    }
    if(paramOne < paramTwo){
        console.log(paramTwo,"Hello my name is Ashleigh Simpson")
    } else{
        console.log(paramOne,"Hello my name is Ashleigh")
    }
}

console.log(arrParameters())

const sumParameter = function(){
    const sumP = [40,25,34,29]
    const sumP2 = [10,21,9,5]
    let sum = 0
    for(let i = 0; i < sumP.length; i++){
        sumP[i] = parseInt(sumP[i])
        sumP[i] = sumP[i] + sum
    }
    for(let j = 0; j < sumP2.length; j++){
        sumP2[j] = parseInt(sumP2[j])
        sumP2[j] = sumP2[j] + sum
    }
    if(sumP > sumP2){
        console.log(sumP, "sumP array has a higher value of numbers")
    } else {
        console.log(sumP2, "sumP2 array has a higher value of numbers")
    }
}

console.log(sumParameter())