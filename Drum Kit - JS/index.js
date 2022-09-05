const btns = document.querySelectorAll(".drum");
const fileArr = [
  `tom-1`,
  `tom-2`,
  `tom-3`,
  `tom-4`,
  `snare`,
  "crash",
  "kick-bass",
];
const keyArr = ["w", "a", `s`, "d", `j`, `k`, `l`];

const playSound = function (file) {
  return new Audio(`./sounds/${file}.mp3`).play();
};

for (let i = 0; i < keyArr.length; i++) {
  btns[i].style.backgroundImage = `url('./images/${fileArr[i]}.png')`;
  btns[i].addEventListener("click", function (e) {
    const key = e.target;
    if (key.classList.contains(keyArr[i])) {
      buttonAnimation(keyArr[i]);
      playSound(fileArr[i]);
    }
  });
  window.addEventListener("keydown", function (e) {
    const key = e.key;
    if (key !== keyArr[i]) return;
    if (key === keyArr[i]);
    buttonAnimation(keyArr[i]);
    playSound(fileArr[i]);
  });
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
