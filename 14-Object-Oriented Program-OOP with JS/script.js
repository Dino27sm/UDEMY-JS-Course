'use strict';
//
/*
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const dino = new Person('Dino', 1997);
console.log(dino);

// ------ These 4 steps are done by "new" operator ---------
// 1. New empty object is created "{}"
// 2. function is called, "this" = {} - points to empty object created
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
// In this way a function can be defined in "Array.prototype" and
// can be called from all arrays. THIS IS NOT RECOMMENDED !!!
console.log(arr.testUnique());
//==================================================================
//
//============== Coding CHALLENGE #1 ===============================
// 1. Constructor Function
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
//    'BMW' going at 120 km/h
// 2. Implement an 'accelerate' method that will increase the speed by 10
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h.`);
};

// 3. Implement a 'brake' method that will decrease the car's speed by 5
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h.`);
};

// 4. Create 2 'Car' objects - "BMW" and "Mercedes"
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(bmw, mercedes);

console.log('------------- Accelerate ---------------------');
bmw.accelerate();
mercedes.accelerate();
bmw.accelerate();
mercedes.accelerate();
console.log(bmw, mercedes);

console.log('------------- Brake --------------------------');
bmw.brake();
mercedes.brake();
console.log(bmw, mercedes);
//================================================================
//
*/
// //==================== ES6 CLASSES ===============================
// // Class Expression
// // const PersonCl = class {};

// // Class Declaration
// class PersonCl {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }

//   // These methods go to "prototype" property of the class "PersonCl"
//   calcAge() {
//     console.log(`${this.firstName} age: `, 2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hello ${this.firstName} !`);
//   }
// }

// const jessica = new PersonCl('Jessica', 1975);
// console.log(jessica);

// jessica.calcAge();

// console.log(jessica.__proto__ === PersonCl.prototype);

// // PersonCl.prototype.greet = function () {
// //   console.log(`Hello ${this.firstName} !`);
// // };

// jessica.greet();

// // 1. Classes are NOT Hoisted - cannot be used before declaration
// // 2. Classes are first-class citizens
// // 3. Classes are executed in "strict mode"
//
// //============= GET and SET for any regular Object =====================
// const account = {
//   owner: 'Dino',
//   movements: [250, 120, 340, 277],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.movements);
// console.log('Get latest movement: ', account.latest);

// account.latest = 50;
// console.log(account.movements);
// //======================================================================
//
// //================== GET and SET for any CLASS =========================
// class BankAccount {
//   constructor(fullName, accNum) {
//     this.fullName = fullName;
//     this.accountNum = accNum;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) {
//       this._fullName = name;
//     } else {
//       alert(`${name} is not a full name!`);
//     }
//   }

//   get fullName() {
//     return this._fullName;
//   }
//   // Static Methods ---------------------------------------
//   static hey() {
//     console.log('Hello there 👋 !');
//   }
// }

// const janet = new BankAccount('Janet Smith', 123456);
// console.log(janet);

// janet.fullName = 'Sandra Scot';
// console.log(janet.fullName);
// console.log(janet);

// BankAccount.hey(); // To call static method ---------------
//
// //================= STATIC Methods ========================
// //
// // Create an object and assign it as a "prototype" to any "person objects"
// const PersonProto = {
//   calcAge() {
//     console.log(`${this.firstName} age: `, 2037 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// // Create a person object with "PersonProto" prototype
// const steven = Object.create(PersonProto); // Empty object created

// steven.name = 'Steven';
// steven.init('Steven', 2002);

// console.log(steven);
// steven.calcAge();
// console.log('------------------------------------');

// const anna = new PersonCl('Anna', 2000);
// console.log(anna);

// anna.calcAge();
// jessica.calcAge();

// console.log(steven.__proto__ === PersonProto); // Result is "true"

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1972);
// sarah.calcAge();
//
// //============== Coding CHALLENGE #2 ===============================
// // Recreate Challenge #1 by using CLASS "CarCl"
// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate = function () {
//     this.speed += 10;
//     console.log(`${this.make} going at ${this.speed} km/h.`);
//   };

//   brake = function () {
//     this.speed -= 5;
//     console.log(`${this.make} going at ${this.speed} km/h.`);
//   };

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// // Create 2 'Car' objects - "BMW" and "Mercedes"
// const bmw = new CarCl('BMW', 120);
// const mercedes = new CarCl('Mercedes', 95);

// console.log(bmw, mercedes);

// console.log('------------- Accelerate ---------------------');
// bmw.accelerate();
// mercedes.accelerate();
// console.log(bmw, mercedes);

// console.log('------------- Brake --------------------------');
// bmw.brake();
// mercedes.brake();
// console.log(bmw, mercedes);
// //================================================================
// //
// const ford = new CarCl('Ford', 120);
// console.log(ford);

// ford.speedUS = 100;
// console.log(`Ford's new speed in [km/h] is: ${ford.speed} km/h`);
// console.log(`Ford's new speed in [mi/h] is: ${ford.speedUS} mi/h`);
//
// //=============== Construction Function Inheritance ================
// //
// // Create "Person" Constrction function
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// const dino = new Person('Dino', 1997);
// console.log(dino);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };
// // // Create "Student" Constrction function
// // const Student = function (firstName, birthYear, course) {
// //   this.firstName = firstName;
// //   this.birthYear = birthYear;
// //   this.course = course;
// // };

// //---------- To avoid repetition of coding lines -----------------
// const Student = function (firstName, birthYear, course) {
//   // Here "call" makes "this" to point to "Student" objects
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // To Link PROTOTYPE OBJECTS -----------------------------
// // Here "Student.prototype" inherits "Person.prototype"
// Student.prototype = Object.create(Person.prototype);
// //--------------------------------------------------------

// // Adding some specific Methods to "Student.prototype"
// Student.prototype.introduction = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}.`);
// };

// const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);

// mike.introduction();

// // Now "Student" objects can use "calcAge" because they INHERITS "Person.prototype"
// mike.calcAge();

// console.log(mike instanceof Student); // "mike" is instance of "Student" -> true
// console.log(mike instanceof Person); // "mike" is instance of "Person" -> true
// console.log(mike instanceof Object); // "mike" is instance of "Object" -> true
// // All are "true" because their prototypes are chained ---- !!!!
//
// //============== Coding CHALLENGE #3 ===============================
// //
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going at ${this.speed} km/h.`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(
//     `${this.make} is going at ${this.speed} km/h, after pressing brakes.`
//   );
// };

// // Create child "EV" construction function
// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// // Link both prototypes
// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// // Here EV "accelerate" OVERWRITES the one from parent "Car.accelerate" !!!
// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%.`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);

// tesla.accelerate();

// tesla.brake();

// tesla.chargeBattery(90);

// tesla.accelerate();
// tesla.brake();
// //===============================================================
//
// //==================== ES6 Classes Inheritance =====================
// //
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // These methods go to "prototype" property of the class "PersonCl"
//   calcAge() {
//     console.log(`${this.fullName} age: `, 2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hello ${this.fullName} !`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) {
//       this._fullName = name;
//     } else {
//       alert(`${name} is not a full name!`);
//     }
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // STATIC Method
//   static hey() {
//     console.log(`Hey there 👋!`);
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // Write "super" first, because it creates "this" for "StudentCl"
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}.`);
//   }

//   // Here "calcAge" OVERWRITES the same Method in the Parent Class "PersonCl"
//   calcAge() {
//     console.log(
//       `I am ${
//         2037 - this.birthYear
//       } years old, but as a student I feel more like ${
//         2037 - this.birthYear + 10
//       }.`
//     );
//   }
// }

// const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// martha.introduce();
// martha.calcAge();
//
//=========== Inheritance between Classes: "Object.create" ============
//
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
