"use strict";
//
// Function creation
function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}
//
const appleJuise = fruitProcessor(5, 0);
const appleOrangeJuise = fruitProcessor(2, 4);
console.log(appleJuise);
console.log(appleOrangeJuise);
