'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Use "Object.freeze" to protect an object from changes
// Make it immutable - but it is not for "Deep freeze" !!!
const expendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = user => expendingLimits?.[user] ?? 0; // Using "Optional Chaining"

// Pure function "addExpense" ----------------------------------------
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
//---------------------------------------------------------------------

const newBudget1 = addExpense(budget, expendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  expendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, expendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);
//---------------------------------------------------------------------

// Modify to avoid "for" loops by using arrow methods
const checkExpenses = function (state) {
  return state.map(entry =>
    entry.value < -getLimit(entry.user) ? { ...entry, flag: 'limit' } : entry
  );
};
const finalBudget = checkExpenses(newBudget3);
console.log(finalBudget);
//---------------------------------------------------------------------

// Modify to avoid "for" loops by using arrow methods
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 500);
