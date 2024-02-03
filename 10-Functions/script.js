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
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
console.log(upperFirstWord('This is not a one word'));
