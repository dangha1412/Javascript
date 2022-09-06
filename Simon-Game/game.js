const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern;
let userClickPattern;
let randomNumber;
let randomChosenColour;
let level;

/////////Basic function/////////

const playSound = function (name) {
  const audio = new Audio(`./sounds/${name}.mp3`);
  return audio.play();
};
const flash = function (color) {
  return $(`#${color}`).fadeOut(100).fadeIn(100);
};

const checkAnswer = function (currentLevel) {
  for (let i = 0; i < userClickPattern.length; i++) {
    if (userClickPattern[i] !== gamePattern[i]) {
      return gameOver();
    }
  }
  if (userClickPattern.length === currentLevel) {
    userClickPattern = [];
    setTimeout(nextSequence, 500);
  }
};

const btnfunction = function () {
  $(`.btn`).click(function (e) {
    const clickedBtn = e.target.id;
    flash(clickedBtn);
    playSound(clickedBtn);
    userClickPattern.push(clickedBtn);
    checkAnswer(level);
    console.log("player:", userClickPattern, `game:`, gamePattern);
  });
};

const gameOver = function () {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("you lose, press anykey to restart");
  $(`.btn`).unbind();
  $(document).keypress(function () {
    startGame();
  });
};

const nextSequence = function () {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  flash(randomChosenColour);
  $("h1").text(`level: ${level}`);
  level++;
};

const init = function () {
  gamePattern = [];
  userClickPattern = [];
  level = 0;
};

const startGame = function () {
  init();
  $("h1").text(`Press Any Key to Start`);
  $(document).keypress(function () {
    btnfunction();
    nextSequence();
    $(document).unbind();
  });
};
startGame();
