'use strict';
//
//================= Guess my Number =============================
const secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
document.querySelector('.number').textContent = secretNumber;
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //------------ When there is no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  } else {
    //---------- When player wins
    if (guess === secretNumber) {
      document.querySelector('.message').textContent = '👍 Correct Number!';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
    } else {
      if (score > 1) {
        score--;
        document.querySelector('.score').textContent = score;
        //----------- When guess is too HIGH or LOW
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
