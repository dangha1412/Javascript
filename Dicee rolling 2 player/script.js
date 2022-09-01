const dice1 = document.querySelector(".img1");
const dice2 = document.querySelector(".img2");
const title = document.querySelector(".container h1");

let twoDice;
const roll2Dice = function () {
  twoDice = [];
  for (let i = 1; i <= 2; i++) {
    twoDice.push(Math.floor(Math.random() * 6 + 1));
  }
  return twoDice;
};

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    roll2Dice();
    dice1.src = `./images/dice${twoDice[0]}.png`;
    dice2.src = `./images/dice${twoDice[1]}.png`;
    if (twoDice[0] > twoDice[1]) title.textContent = "Player 1 Win";
    if (twoDice[0] < twoDice[1]) title.textContent = "Player 2 Win";
    if (twoDice[0] === twoDice[1]) title.textContent = "Draw";
  }
  if (e.code === "Escape") {
    title.textContent = `Refresh Me`;
    dice1.src = ``;
    dice2.src = ``;
  }
});
