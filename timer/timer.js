class Timer {
  constructor(durationInput, startButton, pauseButton, callBack) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    if (callBack) {
      this.onStart = callBack.onStart;
      this.onTick = callBack.onTick;
      this.onComplete = callBack.onComplete;
    }
  }
  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 50);
  };
  tick = () => {
    if (this.timeRemaining <= 0) {
      if (this.onComplete) {
        this.onComplete();
      }
      return this.pause();
    }
    this.timeRemaining = this.timeRemaining - 0.05;
    if (this.onTick) {
      this.onTick(this.timeRemaining);
    }
  };
  get timeRemaining() {
    return +this.durationInput.value;
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
  pause = () => {
    console.log("pause");
    clearInterval(this.interval);
  };
}
