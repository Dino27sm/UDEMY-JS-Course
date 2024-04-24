'use strict';
//
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const dino = new Person('Dino', 1997);
console.log(dino);

// 1. New empty object is created "{}"
// 2. function is called, "this" = {}
// 3. {} linked to prototype
// 4. function automaticaly return "{}"

const matilda = new Person('Matilda', 1967);
const jack = new Person('Jack', 1972);

console.log(matilda, jack);

// console.log(dino instanceof Person);

// //============= PROTOTYPES ====================================
// //
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
//   // "this" points to the object which calls the function "calcAge"
// };

// dino.calcAge();
// matilda.calcAge();

// console.log(dino.__proto__);
// console.log(dino.__proto__ === Person.prototype);
// // Which means that "dino.__proto__" is the same as "Person.prototype"
// //
// console.log(Person.prototype.isPrototypeOf(dino));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));
// // !!! "Person.prototype" is not a prototype of "Person" object.
// // It is a prototype of each object created by constructor function "Person"

// console.log(dino.__proto__.isPrototypeOf(dino));
// console.log(dino.__proto__.isPrototypeOf(matilda));

// // Defining properties in "Person.prototype"
// Person.prototype.species = 'I am Dino.';

// console.log(dino.__proto__.species);
// console.log(matilda.__proto__.species);
// console.log(jack.__proto__.species);
// // The property "species" is in each object's "prototype".
// // It is not a property of the object generated by constructor function.

// console.log('Has dino firstName? => ', dino.hasOwnProperty('firstName'));
// console.log('Has dino species? => ', dino.hasOwnProperty('species'));
// console.log(
//   'Has dino._proto_ species? => ',
//   dino.__proto__.hasOwnProperty('species')
// );
// //=============================================================
console.log('--------------------------------------');
// console.log(dino.__proto__);

// console.log(dino.__proto__.__proto__); // The top of prototype chain !!!
// console.log(dino.__proto__.__proto__.__proto__);

// console.log(Person.prototype);
// console.dir(Person.prototype.constructor);

const arr = [3, 4, 5, 4, 3, 2, 7, 2, 8, 9];
console.log(arr.length, arr);

console.dir(arr.__proto__);
console.dir(arr.__proto__.__proto__);

console.log(arr.__proto__ === Array.prototype);

Array.prototype.testUnique = function () {
  return [...new Set(this)]; // Returns an array
};

console.log(arr.testUnique());
