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
//   ADD Elements -------------------------------------
// let names = ["Anna", "Emma"];
// names.push("Mary", "Olivia", "Jane", "Sarah");
// console.log(names);
// console.log(`The length of the array "names" is ${names.length}`);
// console.log(names.push("Isabella"));
// names.unshift("Scarlett");
// console.log(names);
// //
// //   REMOVE Elements ----------------------------------
// names.pop();
// console.log(names);
// names.shift();
// console.log(names);
// console.log(names.shift());
// //
// console.log(names.indexOf("Olivia"));
// //
// if (names.includes("Sarah")) {
//   console.log("Sarah is in the array of names.");
// }
//
//=====================  CHALLENGE #2  ===================
//
// const calcTip = function (bill) {
//   if (bill >= 50 && bill <= 300) {
//     return 0.15 * bill;
//   } else {
//     return 0.2 * bill;
//   }
// };
//========== With TERNARY Operator =======================
//
// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
// };
//=========  With ARROW Function =========================
//
// const calcTip = (bill) =>
//   bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// //
// console.log(bills);
// console.log(tips);
// console.log(totals);
//
//========== OBJECT in JS =================================
//
// const myObject = {
//   firstName: "Ivan",
//   lastName: "Nikolov",
//   age: 2023 - 1983,
//   job: "teacher",
//   friends: ["Ann", "Eva", "Mary"],
// };
// console.log(myObject);
// //
// console.log(myObject.firstName);
// console.log(myObject["firstName"]);
// console.log(myObject["last" + "Name"]);
// //
// const interestedIn = prompt(
//   "What do you require? => Choose between: firstName, lastName, age, job, friends"
// );
// //
// if (myObject[interestedIn]) {
//   console.log(interestedIn, myObject[interestedIn]);
// } else {
//   console.log(
//     "You have to choose between: firstName, lastName, age, job, friends"
//   );
// }
// //
// myObject.location = "Sofia";
// myObject["email"] = "mail@yahoo.com";
// console.log(myObject);
// //================ Using dot (.) operator  ================
// console.log(
//   `${myObject.firstName} has ${myObject.friends.length} friends where the ${myObject.friends[1]} is the best one.`
// );
// //================ Using brackets []  ================
// console.log(
//   `${myObject["firstName"]} has ${myObject["friends"].length} friends where the ${myObject["friends"][1]} is the best one.`
// );
//
//==============  OBJECT Methods  ====================
//
// const myObject = {
//   firstName: "Ivan",
//   lastName: "Nikolov",
//   birthYear: 1957,
//   job: "teacher",
//   friends: ["Ann", "Eva", "Mary"],
//   haveDriversLicense: false,
//   calcAge: function () {
//     return 2023 - this.birthYear;
//   },
//   getSummary: function () {
//     return `${
//       this.firstName
//     } is ${this.calcAge()} years old teacher and he has ${
//       this.haveDriversLicense ? "a" : "no"
//     } drivers license.`;
//   },
// };
// //
// // console.log(myObject.calcAge());
// console.log(myObject.calcAge());
// //
// //==========  Challange  ==============================
// //
// // "Ivan is 66 years old teacher and he has a/no drivers license."
// console.log(
//   `${
//     myObject.firstName
//   } is ${myObject.calcAge()} years old teacher and he has ${
//     myObject.haveDriversLicense ? "a" : "no"
//   } drivers license.`
// );
// console.log(myObject.getSummary());
//
//====================  CHALLANGE #3  =================
//
// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };
// const john = {
//   fullName: "John Smith",
//   mass: 92,
//   height: 1.95,
//   calcBMI: function () {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   },
// };
// //
// console.log(
//   mark.calcBMI() >= john.calcBMI()
//     ? `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`
//     : `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`
// );
// //
// console.log(mark);
// console.log(john);
//
//==================  FOR Loop  ==========================
for (let rep = 1; rep <= 5; rep++) {
  console.log(`This is line number: ${rep}`);
}
