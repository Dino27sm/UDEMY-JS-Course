//=========== EXPORTING Module ======================
//
console.log('From EXPORTING Module.');

const shippingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added th the cart.`);
};

const num1 = 13;
const num2 = 22;
export { num1, num2 };
