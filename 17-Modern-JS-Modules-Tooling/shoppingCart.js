const num1 = 13;
const num2 = 27;
const cartContent = [];

const getSum = function (n1, n2) {
  return n1 + n2;
};

const cartTotal = function (productName) {
  return cartContent.push(productName);
};

// const dspFromCart = 'Displayed from shoppingCart';
// export { getSum };

export { cartContent };

cartTotal('bread');
cartTotal('tomato');
cartTotal('potato');
cartTotal('apple');
