'use strict';

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };

//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH7203');
// createBooking('LH7205', 2);
// createBooking('LH7206', undefined, 1000);
// createBooking('LH7207', undefined);
// //=========================================================
//
// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 12345678,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999'; //-- Not changed - it is Primitive variable
//   passenger.name = 'Mr. ' + passenger.name; //-- Name changed - reference variable

//   if (passenger.passport === 12345678) {
//     alert('Checked in.');
//   } else {
//     alert('Wrong passport !');
//   }
// };

// // checkIn(flight, jonas);
// // console.log(flight);
// // console.log(jonas);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000);
// };
// newPassport(jonas);
// checkIn(flight, jonas);

// console.log(jonas);
// console.log(jonas.name);

//===================== High Order Functions ==========================
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //------------ Higher-order Function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('JavaScript is the best', upperFirstWord);
// console.log('=================================');
// transformer('JavaScript is the best', oneWord);

// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener('click', high5);
// // "high5" is a callback function
//
//======================== FUNCTION Returns Function ==================
//
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey'); // Function "greet" returns other function

// greeterHey('Mimi');
// greet('Hello')('Janet');
// // "Janet" is the parameter of the returned function by greet("Hello")

// //------- The same function, but using Arrow function ---------
// const greetArrow = greetMessage => nameToGreet =>
//   console.log(`${greetMessage} ${nameToGreet}`);
// // Arrow function returns another arrow function

// greetArrow('Hello')('Ann');
//=======================================================================
// //============= Using "this" keyword ====================================
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(7205, 'Mimi');
// lufthansa.book(2348, 'John Smith');
// console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// //--------------- Using "call" method ------------------------------
// const book = lufthansa.book;
// book.call(eurowings, 2233, 'Janet Gibson');
// console.log(eurowings);

// book.call(lufthansa, 9977, 'Sarah Cooper');
// console.log(lufthansa);
// // The "call" method defines "this" for each object -----------------

// const swiss = {
//   airline: 'Swiss Airline',
//   iataCode: 'SA',
//   bookings: [],
// };

// book.call(swiss, 5678, 'Mary White');
// console.log(swiss);
// // The "call" method defines "this" for "swiss" object --------------
// //
// //--------------- Using "apply" method ------------------------------
// const flightData = [2233, 'Jane Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);

// book.call(eurowings, ...flightData);
// console.log(eurowings);
// //
// //--------------- Using "bind" method ------------------------------
// //
// const bookEW = book.bind(eurowings);
// bookEW(3131, 'Mary Monroe');

// book.bind(swiss)(4455, 'Sophia Cooper');

// //------- Partial application -------------------
// const swiss5566 = book.bind(swiss, 5566); // First parameter is defined
// swiss5566('Emily Smith'); // Enter the second parameter of the function
// console.log(swiss);

// //--------- Using Ojects with Event Listeners ----------------------------
// lufthansa.planes = 300;

// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// // document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// // // In this way calling "lufthansa.buyPlane" -> "this" points to the button with class ".buy",
// // // so using "bind(lufthansa)" the "this" now points to "lufthansa" object

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// //------------- Partial application --------------------------------------
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.3, 200));

// const addVAT = addTax.bind(null, 0.2); // "null" when "this" is not used
// console.log(addVAT(400));

// console.log('================================================');
// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addVAT_2 = addTaxRate(0.2);
// console.log(addVAT_2(100));

// const addTaxArrow = rate => value => value + value * rate;
// const addVAT_3 = addTaxArrow(0.2);
// console.log(addVAT_3(500));
//====================================================================
//----------------- Coding CHALLENGE #1 - FUNCTIONS ------------------------

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const displayString = [
      this.question,
      ...this.options,
      '(Write option number)',
    ].join('\n');
    let choiceStr = '';
    do {
      choiceStr = prompt(displayString);
    } while (
      !(
        (choiceStr === '0') |
        (choiceStr === '1') |
        (choiceStr === '2') |
        (choiceStr === '3') |
        (choiceStr === null)
      )
    );
    if (choiceStr !== null) {
      this.answers[Number(choiceStr)]++;
    }
    this.displayResults();
  },
  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

poll.displayResults.call({ answers: [5, 2, 3] }, 'array');
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'array');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

const data_1 = { answers: [1, 2, 7, 8] };
const data_2 = { answers: [11, 22, 31, 32, 33, 34] };
poll.displayResults.call(data_1, 'array');
poll.displayResults.call(data_2, 'string');
