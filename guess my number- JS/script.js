'use strict';

const number = document.querySelector('.number');
const input = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const body = document.querySelector('body');
const highScores = document.querySelector('.highscore');
const scores = document.querySelector('.score');
const displayMessage = function (text) {
  document.querySelector('.message').textContent = text;
};

let num = number.textContent;

// generate secret number
let secretNumber = generateNumber();
highScores.textContent = Number(localStorage.getItem('highscore'));
scores.textContent = 20;

//function that return a random number
function generateNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

// lose function
function youlose() {
  displayMessage('you lose🍥');
  scores.textContent = 0;
  body.style.backgroundColor = 'red';
}

// win function
function youwin() {
  num = secretNumber;
  displayMessage('correct!');
  body.style.backgroundColor = '#60b347';
  if (Number(scores.textContent) > Number(highScores.textContent)) {
    highScores.textContent = scores.textContent;
    localStorage.setItem('highscore', highScores.textContent);
  }
}

//function on check button
checkBtn.onclick = function () {
  //when there is no number on input field
  if (!input.value) {
    displayMessage('no number!');
    //when player win
  } else if (input.value == secretNumber) {
    youwin();
  } else if (input.value != secretNumber) {
    if (scores.textContent > 1) {
      input.value > secretNumber
        ? displayMessage('still higher!🥑')
        : displayMessage('still lower!🍙');
      scores.textContent--;
    } else if ((scores.textContent = 1)) {
      youlose();
    }
  }
};

//restart button
againBtn.onclick = function () {
  num = '?';
  displayMessage('Start guessing...');
  body.style.backgroundColor = '#222';
  secretNumber = generateNumber();
  input.value = '';
  scores.textContent = 20;
};
