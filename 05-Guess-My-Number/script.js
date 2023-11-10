'use strict';
//
//================= Guess my Number =============================
const secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
document.querySelector('.number').textContent = secretNumber;
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  } else {
    if (guess === secretNumber) {
      document.querySelector('.message').textContent = '👍 Correct Number!';
    } else {
      if (score > 1) {
        score--;
        document.querySelector('.score').textContent = score;
        document.querySelector('.message').textContent =
          guess < secretNumber ? '📉 Too low!' : '📈 Too high!';
      } else {
        score = 0;
        document.querySelector('.score').textContent = score;
        document.querySelector('.message').textContent =
          '💥 You lost the game!';
      }
    }
  }
});
