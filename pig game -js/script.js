'use strict';

//selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
//button
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// new game function
const newGame = function () {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  diceEl.classList.add('hidden');

  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
};

//swich player function
const switchPlayer = function () {
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  currentScore = 0;
  current0.textContent = 0;
  current1.textContent = 0;
};

//roll dice function
const rollNewDie = function () {
  if (playing) {
    let randomDie = Math.ceil(Math.random() * 6);
    diceEl.src = `dice-${randomDie}.png`;
    diceEl.classList.remove('hidden');

    if (randomDie != 1) {
      currentScore += randomDie;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (randomDie === 1) {
      switchPlayer();
    }
  }
};

//hold function
const hold = function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

//start game
newGame();
// new game button
btnNew.addEventListener('click', newGame);
//roll dice button
btnRoll.addEventListener('click', rollNewDie);
//hold button
btnHold.addEventListener('click', hold);
