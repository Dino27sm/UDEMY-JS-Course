'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Date and Time
const getDateAndTime = function (dateInfo) {
  const dateText = `${dateInfo.getDate()}`.padStart(2, 0);
  const monthText = `${dateInfo.getMonth() + 1}`.padStart(2, 0);
  const yearText = `${dateInfo.getFullYear()}`;
  const hoursText = `${dateInfo.getHours()}`.padStart(2, 0);
  const minutesText = `${dateInfo.getMinutes()}`.padStart(2, 0);
  return `${dateText}/${monthText}/${yearText} - ${hoursText}:${minutesText}`;
};
// Functions
//
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${getDateAndTime(
        new Date(acc.movementsDates[i])
      )}</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
  // Display Current Date and Time
  labelDate.textContent = getDateAndTime(new Date());
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //------- Print Current Account --------
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add current transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add current Date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// console.log(3 === 3.0);
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3); // Result is "false"

// // Conversion
// console.log(Number('0.7'));
// console.log(+'0.78');

// // Parsing Integer
// console.log('-----------------------------------------');
// console.log(Number.parseInt(3));
// console.log(Number.parseInt(3.87654));
// console.log(Number.parseInt('7'));
// console.log(Number.parseInt('7.6543'));

// // Parsing Floating point numbers
// console.log('-----------------------------------------');
// console.log(Number.parseFloat(3));
// console.log(Number.parseFloat(3.87654));
// console.log(Number.parseFloat('7'));
// console.log(Number.parseFloat('7.6543'));

// // Check if value is number
// console.log('----------- Check if value is number ------------');
// console.log(Number.isNaN(23));
// console.log(Number.isNaN('23'));
// console.log(Number.isNaN(+'text'));

// console.log(Number.isFinite(23)); // Use this way in practice
// console.log(Number.isFinite('23'));
// console.log(Number.isFinite(+'23x'));
// console.log(Number.isFinite(3 / 0));
//
// //==================== Math operations =========================
// console.log(Math.sqrt(25));
// console.log(Math.sqrt('25'));
// console.log(25 ** (1 / 2));
// console.log(27 ** (1 / 3));

// console.log(Math.max(14, 13, 7, 23, 17, 2));
// console.log(Math.max(14, 13, 7, '23', 17, 2));

// console.log(Math.min(14, 13, 7, 23, 17, 2));
// console.log(Math.min(14, 13, 7, 23, 17, '2'));
// console.log(Math.min(14, 13, 7, 23, 17, '2exp')); // Wrong use

// const arr1 = [45, 33, 77, 41, 18, 19];
// console.log(Math.max(...arr1));

// console.log(Math.PI);
// const radius = 7;
// console.log(2 * Math.PI * radius); // Length of a circle with R = 7

// // Rounding integers
// console.log(Math.trunc(2.73)); // Removes the decimal part => 2
// console.log(Math.round(2.73)); // Rounds to the nearest integer => 3

// console.log(Math.ceil(5.2)); // Returns nearest biger than 5 integer => 6
// console.log(Math.ceil(5.7)); // Returns nearest biger than 5 integer => 6

// console.log(Math.floor(5.2)); // Returns 5
// console.log(Math.floor(5.7)); // Returns 5

// // Rounding decimals
// console.log((7.23).toFixed(0)); // Returns a string
// console.log(+(7.83).toFixed(0)); // Returns a number because of "+"
//
// //------ Function to generate RANDOM Numbers in given range
// const randomGenerator = function (min, max) {
//   const randomNum = Math.random() * (max - min) + min;
//   return Math.round(randomNum);
// };
// //================ REMAINDER Operator - returns the remainder left after division
// console.log(5 % 2);
// console.log(5 / 2);

// //------ Function to check whether a number is odd or even

// const whatNum = function (num) {
//   let resultMessage = '';
//   if (num % 2 === 0) {
//     resultMessage = 'even';
//   } else {
//     resultMessage = 'odd';
//   }
//   return `Number ${num} is an ${resultMessage} number.`;
// };

// console.log(whatNum(4));
// console.log(whatNum(7));
// console.log(whatNum(57));
// console.log(whatNum(22));
// console.log(whatNum(13));
// //
// //=================== Numeric Separator =================================
// const bigNum = 345_789_123_000;
// console.log(bigNum);

// const nextNum = 13_854; // Use separator "_" to make numbers readable
// console.log(nextNum);
//
// //=============== BigInt - Use "n" at the end of the number =================
// const bigNum_0 = 2 ** 53 - 1;
// const bigNum_1 = 123456789123456789123456789n;
// const bigNum_2 = 123_456_789_123_456_789_123_456_789n; // with num separator
// const bigNum_3 = BigInt(456789123456789);
// // BigInt() - Coverts to "bigint" only when the number is less than (2 ** 53 - 1)

// // console.log('bigNum_0: ', bigNum_0);
// console.log('bigNum_1: ', bigNum_1);
// // console.log('bigNum_2: ', bigNum_2);
// console.log('bigNum_3: ', bigNum_3);

// // Operations
// console.log(bigNum_1 + bigNum_3);
// console.log(bigNum_1 - bigNum_3);
// console.log(bigNum_1 * bigNum_3);
// console.log(bigNum_1 / bigNum_3);
// console.log('79 / 23: ', 79 / 23);
// console.log('79n / 23n: ', 79n / 23n); // Cuts of the decimal part of the result
// //
// //================ DATES and TIMES ==========================
// const nowDateStamp = Date.now(); // To get current time-stamp
// console.log(nowDateStamp);

// const nowDate = new Date(nowDateStamp);
// console.log('nowDate === ', nowDate);

// const myDate = new Date(2025, 11, 27, 17, 33, 6);
// console.log('myDate === ', myDate);
// // Month num is zero based - "11" is December

// console.log(myDate.getFullYear());
// console.log(nowDate.getFullYear());
// console.log(nowDate.getMonth());
// console.log(nowDate.getDate()); // Gives the day of the month
// console.log(nowDate.getDay()); // Gives the day of the week
// console.log(nowDate.getHours());
// console.log(nowDate.getMinutes());
//
// //================== Operations with DATES ========================
// const date_a = new Date();
// const date_b = new Date().toISOString();

// console.log(Number(date_a));
// console.log(date_b);

// console.log('--------------------------------------');
// const date_1 = new Date(2024, 3, 17);
// const date_2 = new Date(2024, 3, 27);

// console.log(date_1);
// console.log(date_2);

// const DateDiff = function (d1, d2) {
//   return Number(d2) - Number(d1);
// };
// // Convert miliseconds in days
// console.log(DateDiff(date_1, date_2) / 1000 / 60 / 60 / 24);
//
// //=============== INTERNATIONALIZATION of DATES ====================
const date_1 = new Date();
const formatedDate_1 = Intl.DateTimeFormat('en-US').format(date_1);

console.log(date_1);
console.log(formatedDate_1);
console.log(Intl.DateTimeFormat('en-UK').format(date_1));
console.log(Intl.DateTimeFormat('bg-BG').format(date_1));
