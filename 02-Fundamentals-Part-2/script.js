"use strict";
//
// Function creation
// function fruitProcessor(apples, oranges) {
//   console.log(apples, oranges);
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }
// //
// const appleJuise = fruitProcessor(5, 0);
// const appleOrangeJuise = fruitProcessor(2, 4);
// console.log(appleJuise);
// console.log(appleOrangeJuise);
//******************************************* */
//
//  FUNCTION DECLARATION
function calcAge1(birthYear) {
  return 2037 - birthYear;
}
const age1 = calcAge1(1991);
//
// *********************************************
//  FUNCTION EXPRESSION
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);
//
console.log(age1, age2);
