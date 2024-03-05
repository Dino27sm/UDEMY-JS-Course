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

//============== DOM Manupulations =========================================
//
let sorted = false;
//--------- Calculate and Display the Balance -----------
const calcDisplayBalance = function (accData) {
  accData.moneyBalance = accData.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${accData.moneyBalance.toFixed(2)} €`;
};

//------------- Display Movements ------------------------
const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // In this way old elements are deleted

  movements.forEach(function (mov, i) {
    const movType = mov < 0 ? 'withdrawal' : 'deposit';
    const htmlStr = `<div class="movements__row">
    <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
    <div class="movements__value">${Math.abs(mov).toFixed(2)}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', htmlStr);
  });
};

//------------- Calculate and Display Summary ------------------------
const calcDisplaySummary = function (accData) {
  let incomeValue = accData.movements
    .filter(mov => mov > 0)
    .reduce((acm, mov) => acm + mov);
  labelSumIn.textContent = `${incomeValue.toFixed(2)}€`;

  let outcomeValue = accData.movements
    .filter(mov => mov < 0)
    .reduce((acm, mov) => acm + mov);
  labelSumOut.textContent = `${Math.abs(outcomeValue).toFixed(2)}€`;

  let interestDeposit = accData.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * accData.interestRate) / 100)
    .filter(elm => elm >= 1)
    .reduce((acm, elm) => acm + elm);
  labelSumInterest.textContent = `${interestDeposit.toFixed(2)}`;
};

//=====================================================================
//--------- Create Usernames ------------
const createUsernames = function (accountsArr) {
  accountsArr.forEach(function (accElm) {
    accElm.username = accElm.owner
      .toLowerCase()
      .split(' ')
      .map(item => item[0])
      .join('');
  });
};

createUsernames(accounts);
// console.log(`All accounts are here: `, accounts);
//=========== Upto here Usernames has been created =====================
//----------------------------------------------------------------------
// A Function to update the user interfaces
const updateUI = function (accData) {
  calcDisplayBalance(accData);
  displayMovements(accData.movements);
  calcDisplaySummary(accData);
  sorted = false;
};

let currentAccount;

//=======================================================================
//========== Event handler of User Login =======================
//
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the "form" from submitting
  let logUsername = inputLoginUsername.value;
  let logPin = Number(inputLoginPin.value);

  currentAccount = accounts.find(acc => acc.username === logUsername);

  if (currentAccount?.pin === logPin) {
    const ownerFirstName = currentAccount.owner.split(' ')[0];
    labelWelcome.textContent = `Welcome back, ${ownerFirstName}`;
    containerApp.style.opacity = 100;

    updateUI(currentAccount);
  } else {
    alert(`Wrong User ID or PIN !`);
  }

  //--- Clear the input fields ---
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur(); // To avoid cursor blinking at PIN input line
});
//========================================================================
//========== Event handler of money transfer to another account =========
//
btnTransfer.addEventListener('click', function (evn) {
  evn.preventDefault(); // Prevents the "form" from reloading the page

  let amountTransfer = Number(inputTransferAmount.value);
  let receiverInitials = inputTransferTo.value;
  let receiverAcc = accounts.find(acc => acc.username === receiverInitials);

  //------ Clear transfer inputs
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  let rightAmount =
    amountTransfer > 0 && amountTransfer <= currentAccount.moneyBalance;
  let rightReceiverAcc =
    receiverAcc !== undefined &&
    receiverAcc.username !== currentAccount.username;

  if (rightAmount && rightReceiverAcc) {
    receiverAcc.movements.push(amountTransfer);
    currentAccount.movements.push(-amountTransfer);

    updateUI(currentAccount);
  } else {
    alert(
      `Incorrect receiver "${receiverInitials}" or wrong amount of money !`
    );
  }
});
//=======================================================================
//========== Event handler to Request a Loan =========
//
btnLoan.addEventListener('click', function (evn) {
  evn.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';

  const loanAllowed =
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= 0.1 * loanAmount);

  if (loanAllowed) {
    currentAccount.movements.push(loanAmount);

    updateUI(currentAccount);
  } else {
    alert(`This Loan is not allowed !`);
  }
});
//=======================================================================
//========== Event handler to Close the User Account =========
//
btnClose.addEventListener('click', function (evn) {
  evn.preventDefault();

  let usrConfirm = inputCloseUsername.value;
  let pinConfirm = Number(inputClosePin.value);

  inputCloseUsername.value = '';
  inputClosePin.value = '';

  if (
    usrConfirm === currentAccount.username &&
    pinConfirm === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
  } else {
    alert(`Wrong confirmation data !\n Action is not allowed !`);
  }
});
//=======================================================================
//========== Event handler to Sort movements =========
//
btnSort.addEventListener('click', function (evn) {
  evn.preventDefault();

  const dispMov = sorted
    ? currentAccount.movements
    : currentAccount.movements.slice().sort((a, b) => a - b);

  displayMovements(dispMov);
  sorted = !sorted;
});
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

// //========================== Coding Challenge #1 ====================================
// let dogsJulia_1 = [3, 5, 2, 12, 7];
// let dogsJulia_2 = [9, 16, 6, 8, 3];

// let dogsKate_1 = [4, 1, 15, 8, 3];
// let dogsKate_2 = [10, 5, 6, 1, 4];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsOnlyJulia = dogsJulia.slice(1, -2);

//   const allDogs = dogsOnlyJulia.concat(dogsKate);

//   allDogs.forEach(function (dogAge, i) {
//     const displayStr =
//       dogAge < 3
//         ? `Dog number ${i + 1} is still a puppy 🐶`
//         : `Dog number ${i + 1} is an adult, and is ${dogAge} years old`;
//     console.log(displayStr);
//   });
// };

// checkDogs(dogsJulia_1, dogsKate_1);

// console.log('\n======= Next TEST =======\n');

// checkDogs(dogsJulia_2, dogsKate_2);
//
// //========================== MAP Method ====================================
// //
// const movementsEUR = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const rateEUR_USD = 1.08;

// const movementsUSD_1 = movementsEUR.map(function (elm, index, arrayElm) {
//   const elmUSD = (elm * rateEUR_USD).toFixed(2);
//   return `Movement ${
//     index + 1
//   } is a ${elmUSD < 0 ? 'negative' : 'positive'} value of ${elmUSD}`;
// });
// console.log(movementsEUR);
// console.log(movementsUSD_1);

// //------- The same using arrow callback function
// const movementsUSD_2 = movementsEUR.map(
//   (elm, index) =>
//     `Movement ${index + 1} is a ${
//       (elm * rateEUR_USD).toFixed(2) < 0 ? 'negative' : 'positive'
//     } value of ${(elm * rateEUR_USD).toFixed(2)}`
// );

// console.log(movementsUSD_2);
//
// //========================== FILTER Method ====================================
// //
// const movementsEUR = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const depositMov_1 = movementsEUR.filter(function (elm, index, arrayElm) {
//   return elm > 0;
// });

// const depositMov_2 = movementsEUR.filter(elm => elm > 0);

// const withdrawalMov_1 = movementsEUR.filter(elm => elm <= 0);

// console.log(movementsEUR);
// // console.log('depositMov-1: ', depositMov_1);
// console.log('depositMov-2: ', depositMov_2);

// console.log('withdrawalMov_1: ', withdrawalMov_1);

// //========================== REDUCE Method ====================================
// //
// const movementsEUR = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movementsEUR.reduce(function (
//   accumulator,
//   elm,
//   index,
//   arrayElm
// ) {
//   return accumulator + elm;
// },
// 0);

// const balance2 = movementsEUR.reduce((acc, elm) => acc + elm, 0);
// console.log(movementsEUR);

// console.log(`balance2: ${balance2}`);

// //---------- Use "reduce" to find the MAX value in an array ------------
// const maxMov_1 = movementsEUR.reduce(function (acc, mov) {
//   if (acc <= mov) {
//     acc = mov;
//   }
//   return acc;
// });

// const maxMov_2 = movementsEUR.reduce((acc, mov) => (acc <= mov ? mov : acc));

// const minMov_1 = movementsEUR.reduce(function (acc, mov) {
//   if (acc > mov) {
//     acc = mov;
//   }
//   return acc;
// });

// const minMov_2 = movementsEUR.reduce((acc, mov) => (acc > mov ? mov : acc));

// console.log(`Max-1 movement is: ${maxMov_1}`);
// console.log(`Max-2 movement is: ${maxMov_2}`);
// console.log('-------------------------------------------');
// console.log(`Min-1 movement is: ${minMov_1}`);
// console.log(`Min-2 movement is: ${minMov_2}`);
//
// //========================== Coding Challenge #2 ====================================
// let data1 = [5, 2, 4, 1, 15, 8, 3];
// let data2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const dogHumanAges = ages.map(age => (age <= 2 ? age * 2 : age * 4 + 16));
//   const adultDogs = dogHumanAges.filter(hunamAge => hunamAge >= 18);
//   const sumAdultDogsAges = adultDogs.reduce((acm, elm) => acm + elm);
//   const averageAgeAdultDogs = sumAdultDogsAges / adultDogs.length;
//   return averageAgeAdultDogs.toFixed(2);
// };

// console.log('=============== With Data 1 =================');
// console.log(data1);
// console.log(calcAverageHumanAge(data1));

// console.log('=============== With Data 2 =================');
// console.log(data2);
// console.log(calcAverageHumanAge(data2));
//
// //========================== Coding Challenge #3 ====================================
// // Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
// // as an arrow function, and using chaining!

// let data1 = [5, 2, 4, 1, 15, 8, 3];
// let data2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge_2 = ages =>
//   ages
//     .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
//     .filter(age => age >= 18)
//     .reduce((acm, ageElm, index, arrayElm) => acm + ageElm / arrayElm.length, 0)
//     .toFixed(2);

// console.log('=============== With Data 1 =================');
// console.log(data1);
// console.log(calcAverageHumanAge_2(data1));

// console.log('=============== With Data 2 =================');
// console.log(data2);
// console.log(calcAverageHumanAge_2(data2));
//
// //========================== FIND Method ====================================
// //
// console.log(accounts);

// const getAccount = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(getAccount);
//
// //==================== SOME Method -> returns "true" if there is at least
// // one element that fulfils the condition ===============================
// //
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// const isNumberIncluded = movements.includes(-130);
// console.log(isNumberIncluded);

// const isSomeNumber = movements.some(mov => mov === -130);
// console.log(isSomeNumber);

// const isConditionNumber = movements.some(mov => mov <= 2000);
// console.log(isConditionNumber);
// //
// //====================== EVERY Method -> returns "true" if all elements fulfil
// // the condition ===================================
// //
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// const isFulfiled = movements.every(mov => mov > 0);
// console.log(isFulfiled);

// console.log(account4.movements);
// const isFulfiled_4 = account4.movements.every(mov => mov > 0);
// console.log(isFulfiled_4);
//
// //====================== FLAT Method ==========================
// //
// const arr1 = [[1, 2], 3, [4, 5], 6, 7, 8];
// const flatArr1 = arr1.flat();
// console.log(arr1);
// console.log(flatArr1);

// const arr2 = [[[1, 2], 3], [[4, 5], 6, 7], 8];
// const flatArr2 = arr1.flat(2); // Second level of depth
// console.log(arr2);
// console.log(flatArr2);
// //
// //====================== flatMap Method =======================
// //
// console.log(accounts);
// const allAccountsMovementsArray = accounts.map(acc => acc.movements).flat(1);
// console.log(allAccountsMovementsArray);

// const totalBalance_1 = accounts
//   .map(acc => acc.movements)
//   .flat(1)
//   .reduce((acm, mov) => acm + mov, 0);
// console.log(totalBalance_1);

// // "map" and "flat" can be replaced by "flatMap" method (wit only 1 depth level)
// const totalBalance_2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acm, mov) => acm + mov, 0);
// console.log(totalBalance_2);
//
// //====================== SORT Method =======================
// //
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const movSorted_1 = movements.slice();
// const movSorted_2 = movements.slice();
// console.log(movSorted_1);

// movSorted_1.sort(function (a, b) {
//   if (a > b) return 1;
//   if (a < b) return -1;
//   if (a === b) return 0;
// });
// console.log(movSorted_1);

// // Using arrow function -> the same result
// movSorted_2.sort((a, b) => a - b);

// console.log(movSorted_2);
//
//====================== Array.from Method =======================
// const arr1 = new Array(7);
// console.log(arr1);

// const arr2 = Array.from({ length: 7 }, function (elm, index) {
//   return index + 1;
// });
// console.log(arr2);

// const arr3 = Array.from({ length: 12 }, function (elm, index) {
//   return (index + 1) % 3 === 0 ? 333 : index + 1;
// });
// console.log(arr3);
// //
// //====================== Get DOM elements in an array =============
// labelBalance.addEventListener('click', function (evn) {
//   const domMovElm = document.querySelectorAll('.movements__value');
//   const domMovElmValues = Array.from(domMovElm, (elm, index) =>
//     Number(elm.textContent.replace('€', '').replace(' ', ''))
//   );

//   console.log(domMovElmValues);
// });
//
//===================== PRACTICE ARRAY METHODS =======================
// // 1.
// const bankDepositSum1 = accounts
//   .map(acc => acc.movements)
//   .flat(1) // "map" + "flat" can be replaced by "flatMap"
//   .filter(mov => mov > 0)
//   .reduce((sum, mov) => sum + mov, 0);

// console.log(bankDepositSum1);
// //
// // "map" + "flat" are replaced by "flatMap"
// const bankDepositSum2 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, mov) => sum + mov, 0);

// console.log(bankDepositSum2);
// //
// // 2. Count the movements >= 1000
// const numDeposits1000_1 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

// console.log(numDeposits1000_1);

// // The same result using "reduce" method
// const numDeposits1000_2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acm, mov) => (mov >= 1000 ? acm + 1 : acm), 0);

// console.log(numDeposits1000_2);
// //
// // 3. Create an object using "reduce" method
// const allSums_1 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     function (acm, mov) {
//       if (mov > 0) {
//         acm.deposits = acm.deposits + mov;
//       } else {
//         acm.withdrawals = acm.withdrawals + mov;
//       }
//       return acm;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(allSums_1);
// //
// // The same result using "ternary" operator
// const allSums_2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acm, mov) => {
//       mov > 0 ? (acm.deposits += mov) : (acm.withdrawals += mov);
//       return acm;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(allSums_2);
// //
// // In general, dot notation is preferred for its readability and simplicity, but square bracket notation is necessary when you need to access properties dynamically or when dealing with property names that are not valid identifiers.
// // The same result using "square brackets" notation
// const allSums_3 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acm, mov) => {
//       acm[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
//       return acm;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(allSums_3);
// //
//========================== Coding Challenge #4 ====================================
//
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
//
dogs.forEach(
  dog => (dog['recommendedFood'] = Math.round(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little.
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

const foodEatResult = function (dogObject) {
  let printText = '';
  if (dogObject.curFood > 1.1 * dogObject.recommendedFood) {
    printText = 'too much';
  } else if (dogObject.curFood < 0.9 * dogObject.recommendedFood) {
    printText = 'too little';
  } else {
    printText = 'OK';
  }
  return printText;
};

console.log(sarahDog);
console.log(`Sarah's dog eats ${foodEatResult(sarahDog)} food.`);
