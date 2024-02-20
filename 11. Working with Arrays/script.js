'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// //=========== SLICE Method - Does not change the original  Array ===============
// // SLICE method is used to chain multiple methods ----- !!!
// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));
// // console.log(arr.slice(2, 4));
// // console.log(arr.slice(-2));
// // console.log(arr.slice(-1));
// // console.log(arr.slice(1, -2));

// // Create a Copy of the "arr"
// const arrCopy_1 = arr.slice(); // Use SLICE without arguments
// console.log(arrCopy_1);

// // const arrCopy_2 = [...arr]; // Using SPREAD operator
// // console.log(arrCopy_2);

// //============== SPLICE Method - Changes the original  Array ====================
// console.log(arr);

// console.log(arr.splice(2)); // Deletes elements from the original "arr" and changes it
// console.log(arr); // Contains only first 2 elements - others are deleted by SPLICE

// console.log(arrCopy_1.splice(-1)); // Used to delete the last element of an array
// console.log(arrCopy_1); // Here the last element "e" has been deleted

// //============== REVERSE Method ==================================================
// arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr);

// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(`The original array is: `, arr2);
// arr2.reverse();
// console.log('After applaying the reverse method:', arr2);
// // Changes the original "arr2" array - reverses the element's order

// //============== CONCAT Method ===================================================
// const letters = arr.concat(arr2); // CONCAT does not change the original arrays
// console.log(letters);

// console.log([...arr, ...arr2]); // Also no changes in the original arrays, using SPREAD operator

// //============== JOIN Method =====================================================
// console.log(letters.join(' - '));

// //============== AT Method =======================================================
// const arr3 = [23, 11, 64];
// console.log(arr3[0]);
// console.log(arr3.at(0)); // the same as arr3[0]

// // Getting the last array element
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.slice(-1)[0]);
// console.log(arr3.at(-1));

// // "AT" also can be applied on strings
// console.log('Janet Montgomery'.at(-1));
// console.log('Janet Montgomery'.at(8));

//============== forEach Loop ====================================================
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log('------------ By using FOROF loop --------------');
// for (const movement of movements) {
//   if (movement < 0) {
//     console.log(`${Math.abs(movement)} amount of money is withdrawn.`);
//   } else {
//     console.log(`${movement} amount of money is deposited.`);
//   }
// }

// // By using "forEach" loop
// console.log('------------ By using FOREACH loop --------------');
// movements.forEach(function (movement) {
//   if (movement < 0) {
//     console.log(`${Math.abs(movement)} amount of money is withdrawn.`);
//   } else {
//     console.log(`${movement} amount of money is deposited.`);
//   }
// });

// // The Use of INDEX Values
// console.log('=== Index value ------------ By using FOROF loop ------------');
// for (const [index, movement] of movements.entries()) {
//   if (movement < 0) {
//     console.log(
//       `${index + 1}. ${Math.abs(movement)} amount of money is withdrawn.`
//     );
//   } else {
//     console.log(`${index + 1}. ${movement} amount of money is deposited.`);
//   }
// }

// // By using "forEach" loop
// console.log('=== Index value ------------ By using FOREACH loop ------------');
// movements.forEach(function (movement, index, array) {
//   if (movement < 0) {
//     console.log(
//       `${index + 1}. ${Math.abs(movement)} amount of money is withdrawn.`
//     );
//   } else {
//     console.log(`${index + 1}. ${movement} amount of money is deposited.`);
//   }
// });
// //================ FOREACH for MAPs and SETs =====================================
// //
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// //------ for MAPs --------------------------------
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// //------ for SETs --------------------------------
// const currencySet = new Set(['USD', 'EUR', 'USD', 'GBP']);
// console.log(currencySet);

// currencySet.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });
// //----- In SETs "key" is not defined
