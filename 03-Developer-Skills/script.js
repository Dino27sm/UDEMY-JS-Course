// Remember, we're gonna use strict mode in all scripts now!
"use strict";
//
// function filter_list(l) {
//   // Return a new array with the strings filtered out
//   let out_array = [];
//   for (let i = 0; i < l.length; i++) {
//     if (typeof l[i] === "number") {
//       out_array.push(l[i]);
//     }
//   }
//   return out_array;
// }
// console.log(filter_list([1, 2, 17, "text1", "23", 37]));
//
//
// function descendingOrder(n) {
//   let n_str = n.toString(10);
//   let n_arr = [];
//   const strLength = n_str.length;
//   let buffBox = 0;
//   for (let step = 0; step < strLength; step++) {
//     n_arr.push(n_str[step]);
//   }
//   for (let i = 0; i < strLength; i++) {
//     for (let k = i + 1; k < strLength; k++) {
//       if (n_arr[i] < n_arr[k]) {
//         buffBox = n_arr[i];
//         n_arr[i] = n_arr[k];
//         n_arr[k] = buffBox;
//       }
//     }
//   }
//   let n_new_str = "";
//   for (let step = 0; step < strLength; step++) {
//     n_new_str = n_new_str + n_arr[step];
//   }
//   return Number(n_new_str);
// }
//
//============  Better Solution  =========================
// function descendingOrder(n) {
//   return parseInt(String(n).split("").sort().reverse().join(""));
// }
// //
// console.log(descendingOrder(23987));
// const arrA = [1, 14, 11, 3, 7, 15];
// const arrB = [1, 14, 11, 3, 7, 15];
// arrA.sort((x, y) => x - y);
// arrB.sort((x, y) => y - x);
// console.log(arrA);
// console.log(arrB);
// console.log(arrB.reverse());
//
//============ square every digit of a number and concatenate them =========
// function squareDigits(num) {
//   const num_str = String(num).split("");
//   let num_digits_arr = [];
//   for (let i = 0; i < num_str.length; i++) {
//     num_digits_arr.push(num_str[i] ** 2);
//   }
//   return parseInt(num_digits_arr.join(""));
// }
// console.log(squareDigits(9119));
//
//=============  By using MAP method of ARRAY ===============================
// function squareDigits(num) {
//   return parseInt(
//     String(num)
//       .split("")
//       .map((x) => Number(x) ** 2)
//       .join("")
//   );
// }
// console.log(squareDigits(9119));
//
//============ Numbers with funny properties ===============================
function digPow(n, p) {
  const n_dig_pow_sum = String(n)
    .split("")
    .map((x) => Number(x) ** p++)
    .reduce((acm, x) => acm + x);
  return n_dig_pow_sum % n === 0 ? n_dig_pow_sum / n : -1;
}
console.log(digPow(46288, 3));
