const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", `${perimeter}`);
let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    console.log("Time Started");
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    const step = (perimeter * timeRemaining) / duration - perimeter;
    circle.setAttribute("stroke-dashoffset", step);
  },
  onComplete() {
    console.log("Complete");
  },
});
