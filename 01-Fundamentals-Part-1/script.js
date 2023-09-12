// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;
// const BMIMark = massMark / (heightMark * heightMark);
// const BMIJohn = massJohn / (heightJohn * heightJohn);
// console.log(BMIMark, BMIJohn);
// if (BMIMark > BMIJohn) {
//   console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
// } else {
//   console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
// }
//
// let favourite = prompt("Write your favourite number, please:");
// console.log(favourite);
// console.log(typeof favourite);
// //
// favourite = Number(favourite); // Converts SRTING to a NUMBER
// console.log(favourite);
// console.log(typeof favourite);
//
let day = prompt("Enter the current day, please:");
console.log(day);
//
switch (day) {
  case "monday":
    console.log("Today is monday.");
    break;
  case "tuesday":
    console.log("Today is tuesday.");
    break;
  case "wednesday":
  case "thursday":
    console.log("Today is wednesday or thursday.");
    break;
  case "friday":
    console.log("Today is friday.");
    breack;
  case "saturday":
  case "sunday":
    console.log("Today is saturday or sunday.");
    break;
  default:
    console.log("Not a valid day");
}
