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
// function calcAge1(birthYear) {
//   return 2037 - birthYear;
// }
// const age1 = calcAge1(1991);
//
// *********************************************
//
//  FUNCTION EXPRESSION
// const calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// };
// const age2 = calcAge2(1991);
//******************************************** */
//
//  ARROW FUNCTION
// const calcAge3 = (birthYear) => 2037 - birthYear;
// const age3 = calcAge3(1991);
//********************************************* */
// console.log(age1, age2, age3);
//
//******************************************** */
//=============  CHALLENGE  =====================
//
// const calcAverage = (s1, s2, s3) => (s1 + s2 + s3) / 3;
// let scoreDolphins = calcAverage(44, 23, 71);
// let scoreKoalas = calcAverage(65, 54, 49);
// //
// const checkWinner = function (avgDolphins, avgKoalas) {
//   if (avgDolphins >= 2 * avgKoalas) {
//     console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas}).`);
//   } else if (avgKoalas >= 2 * avgDolphins) {
//     console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins}).`);
//   } else {
//     console.log(`No team wins ...`);
//   }
// };
// checkWinner(scoreDolphins, scoreKoalas);
// //
// scoreDolphins = calcAverage(85, 54, 41);
// scoreKoalas = calcAverage(23, 34, 27);
// checkWinner(scoreDolphins, scoreKoalas);
//=====================================================
//
//==============  ARRAYS  =============================
let names = ["Anna", "Emma"];
names.push("Mary", "Olivia", "Jane", "Sarah");
console.log(names);
console.log(`The length of the array "names" is ${names.length}`);
console.log(names.push("Isabella"));
names.unshift("Scarlett");
console.log(names);
