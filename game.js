class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.gridSize = 20;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.food = new Food(this.gridSize, this.canvasWidth, this.canvasHeight);
    this.snake = new Snake(
      this.gridSize,
      this.canvasWidth,
      this.canvasHeight,
      this.food,
      this
    );
    this.direction = "right";
    this.lastUpdateTime = 0;
    this.snakeSpeed = 150;
    this.directionChanged = false;
    this.gameOver = false;
    this.animationFrameId = null;
    this.isPaused = false;
    this.score = 0;
    this.scoreElement = document.getElementById("score");
  }

  start() {
    this.drawGrid();
    this.snake.draw(this.context);
    this.food.draw(this.context);
    this.updateScore();

    window.addEventListener("keydown", this.changeDirection.bind(this));
    this.isPaused = false;
    this.animationFrameId = requestAnimationFrame(this.updateGame.bind(this));
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    window.removeEventListener("keydown", this.changeDirection.bind(this));
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.lastUpdateTime = performance.now();
      this.animationFrameId = requestAnimationFrame(this.updateGame.bind(this));
    }
  }

  drawGrid() {
    for (let x = 0; x < this.canvasWidth; x += this.gridSize) {
      for (let y = 0; y < this.canvasHeight; y += this.gridSize) {
        this.context.strokeStyle = "#555";
        this.context.strokeRect(x, y, this.gridSize, this.gridSize);
      }
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  updateScore() {
    this.scoreElement.textContent = `Score: ${this.score}`;
  }

  changeDirection(event) {
    if (!this.directionChanged) {
      switch (event.key) {
        case "ArrowUp":
          if (this.direction !== "down") {
            this.direction = "up";
          }
          break;
        case "ArrowDown":
          if (this.direction !== "up") {
            this.direction = "down";
          }
          break;
        case "ArrowLeft":
          if (this.direction !== "right") {
            this.direction = "left";
          }
          break;
        case "ArrowRight":
          if (this.direction !== "left") {
            this.direction = "right";
          }
          break;
      }
      this.directionChanged = true;
    }
  }

  updateGame(timestamp) {
    if (this.isPaused) {
      return;
    }

    const deltaTime = timestamp - this.lastUpdateTime;
    if (deltaTime > this.snakeSpeed) {
      this.lastUpdateTime = timestamp;
      this.clearCanvas();
      this.drawGrid();
      this.snake.direction = this.direction;
      if (this.snake.update()) {
        this.gameOver = true;
        this.displayGameOver();
        return;
      }
      this.snake.draw(this.context);
      this.food.draw(this.context);
      this.directionChanged = false;
      this.updateScore();
    }

    if (!this.gameOver) {
      this.animationFrameId = requestAnimationFrame(this.updateGame.bind(this));
    }
  }

  displayGameOver() {
    this.context.fillStyle = "red";
    this.context.font = "48px serif";
    this.context.textAlign = "center";
    this.context.fillText(
      "Game Over",
      this.canvasWidth / 2,
      this.canvasHeight / 2
    );
    this.score = 0;
    this.updateScore();
  }
}
