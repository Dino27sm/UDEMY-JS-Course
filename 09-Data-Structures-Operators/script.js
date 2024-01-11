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
//----------- Coding CHALLENGE #2 ----------------------
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//========= Solution of Callenge #2 ==================================
// 1. Loop over the game.scored array and print each player name to the console,
// along with the goal number
//------ (Example: "Goal 1: Lewandowski")
for (const scoredPlayer of game.scored.entries()) {
  console.log(`Goal ${scoredPlayer[0] + 1}: ${scoredPlayer[1]}`);
}

// 2. Use a loop to calculate the average odd and log it to the console (We already
// studied how to calculate averages, you can go check if you don't remember)
let oddsSum = 0;
let numberOfOdds = 0;
for (const oddValue of Object.values(game.odds)) {
  oddsSum += oddValue;
  numberOfOdds += 1;
}
console.log(`The average Odd is: ${oddsSum / numberOfOdds}`);

//----- Other Solution
console.log(`========== SECOND SOLUTION ============`);
const oddsArray = Object.values(game.odds);
oddsSum = 0;
for (const item of oddsArray) {
  oddsSum += item;
}
console.log(`The average Odd is: ${oddsSum / oddsArray.length}`);

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names
const oddsData = Object.entries(game.odds);
console.log(oddsData);
for (const [teamName, odd] of oddsData) {
  let printStr = teamName === 'x' ? 'draw' : `victory ${game[teamName]}`;
  console.log(`Odd of ${printStr}: ${odd}`);
}

const teamText = game['team2'];
console.log(teamText);
// 4. Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:
// {
// Gnarby: 1,
// Hummels: 1,
// Lewandowski: 2
// }
