/* Spaghetti alla Carbonara Recipe:
Ingredients for 4 persons:
         spaghetti 400g,
         guanciale 250g,
         very fresh egg yolks 6,
         aged grated Pecorino Romano cheese 50g,
         raw black pepper 4g
To make classic carbonara, first cut the guanciale into 1cm layers, then into long strips.
Combine the egg yolks with the finely grated Pecorino Romano.
Roast the black pepper on a pan until it smokes and sizzles, and combine a small amount of it to the yolks and chees mixture, set aside the rest.
Brown the strips of guanciale for 3 minutes at medium heat, then 1 minune on high heat til crisp, then turn off the heat, take out the guanciale, leaving only the grease on the pan cool down.
Cook the pasta with a pinch of salt in the water (guanciale is already very salty);
set aside a ladleful of the pasta water before draining it, then drain the pasta once it is cooked al dente.
Pour 2 spoons of the reserved hot water into the part of the frying pan containing the cooled guanciale and turn on the heat:
this will create a creamy sauce with the pasta starch contained in that water.
TURN OFF THE HEAT AND SET ASIDE for 1 minute, then transfer the pasta to the same pan and mix together.
Add the yolk and cheese mixture, stirring rapidly. In the warm pan with the hot pasta, the eggs will cook gently and become creamy.
It is important to do this part quickly to prevent the yolks from congealing and taking on the texture of scrambled eggs.
Add the remaining roasted black pepper and serve immediately. */

/*Below ingredients are measured in g*/
let spaghetti = 400;
let guanciale = 250;
let EggYolks = 6;
let RomanoCheese = 50;
let RawBlackPepper = 4;
let Salt = 50
let pasta = 150


let Bowl = RomanoCheese + EggYolks;
console.log(Bowl);

let pan = RawBlackPepper

/**Removes the rawblackpepper because they're now cooked instead of raw */
pan -= RawBlackPepper

let BlackPepper = RawBlackPepper


/* Water is in ml */
let BoiledWater = 500;

/** Total amount of water left in the ladle = 20ml */
let ladle = BoiledWater - 480;

 /** Remaining amount of water in the ladle minus 6ml (14ml is usually the amount of ml for 2 tablespoons)*/
let TwoTablespoons = ladle - 6;

/*Pinch of black pepper / salt removes 1 from the total amount of 'RawBlackPepper' or 'Salt'*/
let PinchBlackPepper = BlackPepper - 1;
let PinchOfSalt = Salt - 1;

/** the combination of the final products of the recipe */
let pot = BoiledWater + PinchOfSalt;

pot += pasta;

pot = pot - BoiledWater;

pan += ladle;

pan += pot;

pan += Bowl;

pan += BlackPepper;


