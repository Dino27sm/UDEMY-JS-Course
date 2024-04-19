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

console.log(dino instanceof Person);

//============= PROTOTYPES ====================================
//
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
  // "this" points to the object which calls the function "calcAge"
};

dino.calcAge();
matilda.calcAge();

console.log(dino.__proto__);
console.log(dino.__proto__ === Person.prototype);
// Which means that "dino.__proto__" is the same as "Person.prototype"
//
console.log(Person.prototype.isPrototypeOf(dino));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));
// !!! "Person.prototype" is not a prototype of "Person" object.
// It is a prototype of each object created by constructor function "Person"

console.log(dino.__proto__.isPrototypeOf(dino));
console.log(dino.__proto__.isPrototypeOf(matilda));
