//=========== EXPORTING Module ======================
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
