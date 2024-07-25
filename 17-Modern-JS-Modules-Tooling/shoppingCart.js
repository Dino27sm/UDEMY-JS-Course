//=========== EXPORTING Module ======================
// // This "fetch" block will be performed first and then the rest code lines
// // because of top level AWAIT is used here - in exporting module
// console.log('------------ START of fetching in shoppingCart.js ----------');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('------------ END of fetching in shoppingCart.js ----------');
// //..........................................................................
//
// // Named Exports ------------------------------------
// //
// console.log('From EXPORTING Module.');

// const shippingCost = 10;
export const cart = []; // EXPORTS NOT the copy of ARRAY but its POINTING ADDRESS

// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added th the cart.`);
// };

// const num1 = 13;
// const num2 = 22;
// export { num1, num2 };
// //
// Default Exports - Used to Export only one thing's value
//
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added th the cart.`);
}
