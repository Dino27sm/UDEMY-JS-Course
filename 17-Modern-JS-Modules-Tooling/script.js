//=========== IMPORTING Module ======================
//
// import './shoppingCart.js'; // First this module file is executed
// console.log('From IMPORTING Module.');
import { addToCart, num1, num2 } from './shoppingCart.js';

addToCart('bread', 3);
console.log(num1, num2);
