'use strict';
//
//================= Guess my Number =============================
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //------------ When there is no input
  if (!guess) {
    displayMessage('⛔ No number!');
  } else {
    //---------- When player wins
    if (guess === secretNumber) {
      displayMessage('👍 Correct Number!');
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      //-------- "Highscore" setting
      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    } else {
      score--;
      if (score > 0) {
        document.querySelector('.score').textContent = score;
        //----------- When guess is too HIGH or LOW
        displayMessage(guess < secretNumber ? '📉 Too low!' : '📈 Too high!');
      } else {
        document.querySelector('.score').textContent = 0;
        displayMessage('💥 You lost the game!');
      }
    }
  }
});
//-------------- Button "Again" programming
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  score = 20;
  document.querySelector('.score').textContent = score;
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
});
