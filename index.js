window.onload = function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  let game = new Game(canvas, context);

  game.start();
  game.pause();

  document
    .getElementById("restartButton")
    .addEventListener("click", function () {
      game.stop();
      game.clearCanvas();
      game = new Game(canvas, context);
      game.start();
      document.getElementById("pauseResumeButton").textContent = "Pause";
    });

  document
    .getElementById("pauseResumeButton")
    .addEventListener("click", function () {
      if (game.isPaused) {
        game.resume();
        this.textContent = "Pause";
      } else {
        game.pause();
        this.textContent = "Resume";
      }
    });

  document.getElementById("upButton").addEventListener("click", () => {
    game.changeDirection({ key: "ArrowUp" });
  });

  document.getElementById("downButton").addEventListener("click", () => {
    game.changeDirection({ key: "ArrowDown" });
  });

  document.getElementById("leftButton").addEventListener("click", () => {
    game.changeDirection({ key: "ArrowLeft" });
  });

  document.getElementById("rightButton").addEventListener("click", () => {
    game.changeDirection({ key: "ArrowRight" });
  });
};
