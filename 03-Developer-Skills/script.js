// Remember, we're gonna use strict mode in all scripts now!
"use strict";

function filter_list(l) {
  // Return a new array with the strings filtered out
  let out_array = [];
  for (let i = 0; i < l.length; i++) {
    if (typeof l[i] === "number") {
      out_array.push(l[i]);
    }
  }
  return out_array;
}
console.log(filter_list([1, 2, 17, "text1", "23", 37]));
