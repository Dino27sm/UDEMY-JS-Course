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
};

dino.calcAge();
