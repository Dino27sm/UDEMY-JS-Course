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
function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    return `Dolphins win (${avgDolphins} vs ${avgKoalas}).`;
  } else if (avgKoalas >= 2 * avgDolphins) {
    return `Koalas win (${avgKoalas} vs ${avgDolphins}).`;
  } else {
    return `No team wins.`;
  }
}
//
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const scoreDolphins = calcAverage(85, 54, 41);
const scoreKoalas = calcAverage(23, 34, 27);
//
console.log(checkWinner(scoreDolphins, scoreKoalas));
