//=========== IMPORTING Module ======================
//
// import './shoppingCart.js'; // First this module file is executed
// console.log('From IMPORTING Module.');
// import { addToCart, num1, num2 } from './shoppingCart.js';

// addToCart('bread', 3);
// console.log(num1, num2);
//
// To Import everything from "shoppingCart" as ONE Object
// import * as ShoppingCart from './shoppingCart.js';

// console.log(ShoppingCart.num1, ShoppingCart.num2);
// ShoppingCart.addToCart('potato', 7);
// //
// Importing "default" from "shoppingCart"
//
import cartContent, { cart } from './shoppingCart.js';
cartContent('tomato', 8);
cartContent('bread', 1);
cartContent('pizza', 3);

console.log(cart);
