//Shopping cart and ambassadors - BuildTime #2

/*
Details:    Today you are in charge of building the shopping cart logic for a website that supports ambassadors. 
            Your job is to build a program flow that will elaborate a list of prices, a user and a shipping cost to calculate the correct cart total. 

            If the user is an ambassador, the cart should be discounted of 30% BEFORE shipping cost (ambassadors still pay shipping)
            If the user is NOT an ambassador, the cart should NOT be discounted
            Either way, if the cart goes over 100, shipping cost should be 0.

            Some users as examples are already provided.
            
           
*/

const marco = {
  name: "Marco",
  lastName: "Rossi",
  isAmbassador: true,
};

const paul = {
  name: "Paul",
  lastName: "Flynn",
  isAmbassador: false,
};

const amy = {
  name: "Amy",
  lastName: "Reed",
  isAmbassador: false,
};

const prices = [34, 5, 2];
const shippingCost = 50;
let names = [marco, amy, paul];
let sum = 0;

const ambassadorCheck = function (name) {
  const arr = [];
  for (let i = 0; i < prices.length; i++) {
    sum += prices[i];
  }
  console.log(sum);
  for (const name of names) {
    if (name.isAmbassador === true) {
      sum = sum * 0.7 + shippingCost;
      arr.push(name, sum);
    } else {
      sum = sum + shippingCost;
      arr.push(name, sum);
    }
  }
  if (sum > 100) {
    const newShippingCost = 0;
    sum = sum + newShippingCost
  } else;
  return arr;
};

console.log(ambassadorCheck());
