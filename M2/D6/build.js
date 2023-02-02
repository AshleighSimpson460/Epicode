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

let customers = [marco, amy, paul];

const cart1 = [50, 24, 10]; // total:  84
const cart2 = [50, 50, 5]; // total: 105
const cart3 = [75, 30, 50, 7]; // total: 162

let shoppingCart = [cart1, cart2, cart3];

const shippingCost = 50;

// --------------------------------------------------------

let sum = 0;

for (const carts of shoppingCart) {
  sum = 0;
  for (let i = 0; i < carts.length; i++) {
    sum += carts[i];
  }
  console.log(sum);

  for (let customer of customers) {
    if (customer.isAmbassador === true) {
      let discount = sum * 0.7;
      if (discount < 100) {
        discount = discount + shippingCost;
      } else if (discount > 100) {
        discount = discount;
      }
      console.log(customer.name, discount);
    }
    else if(customer.isAmbassador === false && sum < 100)
      sum = sum + shippingCost
    console.log(customer.name, sum);
}
}
