window.onload = function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const game = new Game(canvas, context);
  game.start();
};
