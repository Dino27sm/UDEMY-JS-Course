'use strict';

//------------- Selecting elements from DOM
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//------------ Starting conditions and initialization
let scores, currentScore, activePlayer, playGame;

let init = function () {
  playGame = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

//------------ SWITCH the player FUNCTION
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//------------ Rolling DICE functionality
btnRoll.addEventListener('click', function () {
  if (playGame) {
    // 1. Generating a random dice value
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice value
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for dice value 1
    if (dice !== 1) {
      // Add dice value to the
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playGame) {
    // 1. Add current score to the active player totall score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      //------- END of the game
      playGame = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      // 3. Switch to next player
      switchPlayer();
    }
  }
});

//----------- NEW GAME starting
btnNew.addEventListener('click', init);
