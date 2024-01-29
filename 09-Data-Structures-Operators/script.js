'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0,
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

//===================================================================
// //--------- Looping OBJECTS
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;
// for (const day of properties) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // console.log(Object.keys(openingHours));
// // console.log(Object.values(openingHours));

// //------- Entire object
// const objEntries = Object.entries(openingHours);
// console.log(objEntries);

// for (const [day, { open, close }] of objEntries) {
//   // Her is used destructuring of obect Entries - keys and values
//   console.log(`On ${day} we open at ${open} and close at ${close}.`);
// }

//
//===================================================================
//--------- A New Way to write objects and methods in another Object
// console.log(restaurant);

//===================================================================
//----------- Optional Chaining
// if (restaurant.openingHours && restaurant.openingHours.mon) {
//   console.log(restaurant.openingHours.mon.open);
// }

// Using OPTIONAL CHAINING
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// // Example:
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (let day of days) {
//   const isItWorking = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`${day} is ${isItWorking !== 'closed' ? 'open' : isItWorking}`);
// }

// // In Methods - Optional chaining
// console.log(restaurant.order?.(1, 1) ?? 'NO such function!');
// console.log(restaurant.pastaOrder?.(1, 1) ?? 'NO such function!');

// // Arrays
// const users = [
//   { name: 'Anna', age: 37 },
//   { name: 'Mimi', age: 33 },
// ];
// console.log(users[0]?.name ?? 'No shuch user!');
// console.log(users[1]?.name ?? 'No shuch user!');
// console.log(users[2]?.name ?? 'No shuch user!');
//===================================================================
//----------- ARRAY Destructuring
// const array_1 = [2, 3, 4];

// const [x, y, z] = array_1;
// console.log(x, y, z);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// [secondary, main] = [main, secondary];
// console.log(main, secondary);

// console.log(restaurant.order(1, 1));

//----------- OBJECT Destructuring
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

//--------- SPREAD Operator - used on the right side
// let arr_0 = [21, 22, 23];
// const arr_1 = [1, 3, 5, 7, 9, 11, arr_0];
// const arr_2 = [1, 3, 5, 7, 9, 11, ...arr_0];
// console.log(arr_1);
// console.log(arr_2);

// //--------- REST Operator - used on the left side for destructoring
// let [n_1, , n_3, ...otherNumbers] = arr_2;
// console.log(otherNumbers);
//
//--------- Logic Operators - using and returning ANY type of data - short circuiting
// // OR logic operatorr returns First thruty value. If all are falsy - returns the last one.
// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);
// //
// AND logic operatorr returns First falsy value. If all are thruty - returns the last one.
// console.log(0 && 'Jonas');
// console.log('' && 'Jonas');
// console.log(true && null);
// console.log(7 && 88);

// console.log(3 && 1 && undefined && 'Hello' && 23 && null);
// //
//----------- Coding CHALLENGE #1 ----------------------
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };
// //-------- By using destructoring we do this
// // 1.
// const [players1, players2] = game.players;
// console.log(players1, players2);

// // 2.
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3.
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4.
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5.
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// // 6.
// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length} goals were scored.`);
// };

// printGoals(...game.scored);
// printGoals('John', 'Gibson', 'Ricard');

// // 7.
// team1 < team2 && console.log('Team 1 is likely to win.');
// team1 > team2 && console.log('Team 2 is likely to win.');

// 3 && 3 < 4 && 5 && console.log('Print this!');
//============================================================
//
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// //----------- For-Of loop --> item loops over etire menu array
// for (const item of menu) {
//   console.log(item);
// }

// //----------- Use entries() to get indexes of array elements
// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }

// //----------- By using destructuring
// for (const [i, elm] of menu.entries()) {
//   console.log(`${i + 1}: ${elm}`);
// }
//===============================================================
//
// //----------- Coding CHALLENGE #2 ----------------------
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };
// //========= Solution of Callenge #2 ==================================
// // 1. Loop over the game.scored array and print each player name to the console,
// // along with the goal number
// //------ (Example: "Goal 1: Lewandowski")
// for (const scoredPlayer of game.scored.entries()) {
//   console.log(`Goal ${scoredPlayer[0] + 1}: ${scoredPlayer[1]}`);
// }

// // 2. Use a loop to calculate the average odd and log it to the console (We already
// // studied how to calculate averages, you can go check if you don't remember)
// let oddsSum = 0;
// let numberOfOdds = 0;
// for (const oddValue of Object.values(game.odds)) {
//   oddsSum += oddValue;
//   numberOfOdds += 1;
// }
// console.log(`The average Odd is: ${oddsSum / numberOfOdds}`);

// //----- Other Solution
// console.log(`========== SECOND SOLUTION ============`);
// const oddsArray = Object.values(game.odds);
// oddsSum = 0;
// for (const item of oddsArray) {
//   oddsSum += item;
// }
// console.log(`The average Odd is: ${oddsSum / oddsArray.length}`);

// // 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// // Odd of victory Bayern Munich: 1.33
// // Odd of draw: 3.25
// // Odd of victory Borrussia Dortmund: 6.5
// // Get the team names directly from the game object, don't hardcode them
// // (except for "draw"). Hint: Note how the odds and the game objects have the
// // same property names
// const oddsData = Object.entries(game.odds);
// console.log(oddsData);
// for (const [teamName, odd] of oddsData) {
//   let printStr = teamName === 'x' ? 'draw' : `victory ${game[teamName]}`;
//   console.log(`Odd of ${printStr}: ${odd}`);
// }

// const teamText = game['team2']; // This is a test to get a property without dot
// console.log(teamText);
// // 4. Bonus: Create an object called 'scorers' which contains the names of the
// // players who scored as properties, and the number of goals as the value. In this
// // game, it will look like this:
// // {
// // Gnarby: 1,
// // Hummels: 1,
// // Lewandowski: 2
// // }
// //============= SETs in JS ====================================
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet); // SET does not contain repeated elements

// console.log(new Set('Arto')); // SETs are Iterable data structure
// console.log(ordersSet.size); // To get the size of a SET

// console.log(ordersSet.has('Pizza')); // To check for containing an element
// console.log(ordersSet.has('Bread'));

// ordersSet.add('Garlic bread');
// ordersSet.add('Garlic bread'); // This element is added twice but in SET it is single
// console.log(ordersSet); // Only one "Garlic bread" - SET consist of only unique elements

// ordersSet.delete('Risotto'); // To delete an element from SET
// console.log(ordersSet);

// // ordersSet.clear(); // To delete all elements
// // console.log(ordersSet);

// // SET is Iterable
// for (const order of ordersSet) {
//   console.log(order);
// }

// // Example:  How to check the number of different letters in a word
// const word_1 = 'elements';
// const word_2 = 'structures';

// console.log(word_1);
// console.log(new Set(word_1).size);

// console.log(
//   `The word "${word_1}" contains ${new Set(word_1).size} different letters.`
// );
// console.log(
//   `The word "${word_2}" contains ${new Set(word_2).size} different letters.`
// );
//
//============ MAPs in JS ============================
// //-------- To define an empy MAP using SET Method
// const newRestaurant = new Map();

// newRestaurant.set('name', 'Ropotamo');
// newRestaurant.set(1, '20 tables');
// newRestaurant.set(2, 'Up to 80 guests');
// newRestaurant.set(true, 'The restaurant is open');
// newRestaurant.set(false, 'The restaurant is close');

// newRestaurant.set('open', 11).set('close', 22); // Can be used in chain

// console.log(newRestaurant);
// console.log(newRestaurant.get(true));
// console.log(newRestaurant.get(2)); // To get certain element

// // Example:
// const time = 17;
// console.log(
//   newRestaurant.get(
//     time > newRestaurant.get('open') && time < newRestaurant.get('close')
//   )
// );
// // Objects can be used as keys in MAPs
// newRestaurant.set(document.querySelector('h1'), 'Heading'); // DOM element is used
// console.log(newRestaurant);

//-------- To define an empy MAP using ARRAYS
// // Define MAPs by using Arrays of 2-dimensional array,
// // where the first element is the KEY and the second is the VALUE
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct👍!'],
//   [false, 'Try again😒!'],
// ]);
// console.log(question);

// ------ Convert an Object to a MAP
// console.log(Object.entries(openingHours));
// The result of Object.entries - an Array of 2-dimensional arrays, so it is
// very convenient to convert an Object to a MAP
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);
//
// MAPs can be iterated using FOR OF
// // Example:
// const answer = Number(prompt(`${question.get('question')}`));
// console.log(answer);

// console.log(question.get(question.get('correct') === answer));
// //
// //------- Convert MAP to Array
// const questionArray = [...question];
// console.log(questionArray);

// const questionKeys = [...question.keys()]; // To get keys
// console.log(questionKeys);

// const questionValues = [...question.values()]; // to get values
// console.log(questionValues);
//
//===================== CALLENGE #3 ==============================
//   1. Create an array 'events' of the different game events that happened (no
//   duplicates)

//   2. After the game has finished, is was found that the yellow card from minute 64
//   was unfair. So remove this event from the game events log.

//   3. Compute and log the following string to the console: "An event happened, on
//   average, every 9 minutes" (keep in mind that a game has 90 minutes)

//   4. Loop over 'gameEvents' and log each element to the console, marking
//   whether it's in the first half or second half (after 45 min) of the game, like this: [FIRST HALF] 17:  ⚽GOAL
// //
// const gameEvents = new Map([
//   [17, '⚽ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽ GOAL'],
//   [80, '⚽ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);
//------- Solution -------
// // 1.
// const events = [...new Set(gameEvents.values())]; // Use SET to eliminate repetitions
// console.log(events);

// // 2.
// console.log(
//   gameEvents.delete(64) ? `Element 64 is deleted!` : 'No such element.'
// ); // Delete() method returns "true" if the elm exist
// console.log(gameEvents);

// // 3.
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes.`
// );

// // 4.
// for (const [time, event] of gameEvents.entries()) {
//   console.log(
//     `${time <= 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${time}: ${event}`
//   );
// }
// //================= SRINGS Part 1 =========================================
// const airline = 'TAP Air Portugal';
// const plane = 'A320';

// console.log(plane[0]); // result -> A
// console.log(plane[1]); // result -> 3
// console.log(plane[2]); // result -> 2

// console.log('Text'[0]); // result -> T

// console.log(plane.length); // result -> 4
// console.log('message'.length); // result -> 7

// console.log(airline.indexOf('r')); // Returns the position of first occurrence of "r"
// console.log(airline.lastIndexOf('r')); // Returns the last occurance of "r"

// console.log(airline.indexOf('Portugal')); // It is case sesetive - returns 8
// console.log(airline.indexOf('portugal')); // Not found - returns -1

// console.log(airline.slice(4)); // Result - Air Portugal
// console.log(airline.slice(0, 11)); // Result - TAP Air Por

// console.log(airline.slice(-3)); // Prints the last 3 symbols

// //================= SRINGS Part 2 =========================================
// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());
// console.log('Text message'.toUpperCase());

// // Example: how to write the name "niKolOv" in a right way as Nikolov
// const myName = 'niKolOv';
// const myCorrectedName = myName[0].toUpperCase() + myName.slice(1).toLowerCase();
// console.log(`"${myName}" has been corrected to -> ${myCorrectedName}.`);

// const testMessage = '   Hello World!     ';
// console.log(testMessage.trim()); // To trim whitespaces from both sides of the string

// // How to use "replace" metod
// const dolarMessage =
//   'There are several prices: 257.13 USD, 348.67 USD 17.19 USD';
// const euroMessage = dolarMessage.replace('USD', 'EUR');
// const correctMessage = dolarMessage.replaceAll('USD', 'EUR');

// console.log(euroMessage);
// console.log(correctMessage);

// // How to use "includes" and "startsWith"
// console.log(dolarMessage.includes('USD')); // true
// console.log(dolarMessage.includes('EUR')); // false

// console.log(dolarMessage.startsWith('The'));
// console.log(dolarMessage.startsWith('Th'));
// console.log(dolarMessage.startsWith('the')); // It is case sensitive
// //
// //================= SRINGS Part 3 =========================================
// console.log('This is a text message');
// console.log('This' + 'is' + 'a' + 'text' + 'message');
// let text_1 = 'This + is + a + text + message'.split('+'); // Creates an Array
// for (let i = 0; i < text_1.length; i++) {
//   text_1[i] = text_1[i].trim();
// }
// console.log(text_1);
// //------------------- SPLIT method ----------------------------------------
// const fullName = 'John Smith';
// const [firsName, lastName] = fullName.split(' ');
// console.log(fullName);
// console.log(firsName);
// console.log(lastName);

// //------------------- JOIN method -----------------------------------------
// const text_2 = ['Mr.', firsName, lastName.toUpperCase()].join(' ');
// const text_3 = ['Mr.', firsName, lastName.toUpperCase()].join('---');
// console.log(text_2);
// console.log(text_3);

// // Define a function to capitalize first letters of names
// let someNames = 'dino, arto, risa';

// function nameCapitalize(names) {
//   let name = names.split(', ');
//   let newName = [];
//   for (const item of name) {
//     newName.push(item.replace(item[0], item[0].toUpperCase()));
//   }
//   return newName.join(', ');
// }

// console.log(nameCapitalize(someNames));

// //------------------- PADDING the string ------------------------------------
// const message_1 = 'This is a message';

// const padMessage_1 = message_1.padStart(27, '+');
// console.log(padMessage_1);

// const padMessage_2 = message_1.padEnd(27, '+');
// console.log(padMessage_2);

// const padMessage_3 = message_1.padStart(27, '+').padEnd(37, '#');
// console.log(padMessage_3);

// const cardMasking = function (cardNumber) {
//   const card = String(cardNumber);
//   const getLastDigits = card.slice(-4);
//   const maskedNum = getLastDigits.padStart(card.length, '*');
//   return maskedNum;
// };

// console.log(cardMasking(4424576683571322));

// //--------------------- REPEAT method ---------------------------------------
// console.log('Hello World !'.repeat(5));

// const waitingPlanes = function (numOfPlanes) {
//   const numPlanes = Number(numOfPlanes);
//   return '✈️ '.repeat(numPlanes) + 'Planes are waiting !';
// };

// console.log(waitingPlanes(3));
// console.log(waitingPlanes(7));
//
//========================= Coding CHALLENGE #4 =======================================
//
// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase. The input will come from a textarea inserted into the
//DOM (see code below to insert the elements), and conversion will happen when the
//button is pressed.

// Test data (pasted to textarea, including spaces):
// underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure
// Should produce this output (5 separate console.log outputs):
// underscoreCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅
//
// //----------- Create DOM elements --------------------------------
// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));
// //----------- Define a function
// const toCamelCase = function (underscoreText) {
//   let arrayWords = [...underscoreText.trim().split('_')];
//   for (let i = 0; i < arrayWords.length; i++) {
//     arrayWords[i] = arrayWords[i].toLowerCase();
//     if (i !== 0) {
//       arrayWords[i] = arrayWords[i].replace(
//         arrayWords[i][0],
//         arrayWords[i][0].toUpperCase()
//       );
//     }
//   }
//   const camelCaseText = arrayWords.join('');
//   return camelCaseText;
// };
// //
// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const arrayText = [...text.split('\n')];
//   const arrayOut = [];
//   for (const [index, item] of arrayText.entries()) {
//     arrayOut.push(toCamelCase(item).padEnd(20, ' ') + '✅'.repeat(index + 1));
//   }
//   document.querySelector('textarea').value = arrayOut.join('\n');
// });
