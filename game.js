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
      this.food
    );
    this.direction = "right";
    this.lastUpdateTime = 0;
    this.snakeSpeed = 100;
    this.directionChanged = false;
    this.gameOver = false; // Flag to track game over state
  }

  start() {
    this.drawGrid();
    this.snake.draw(this.context);
    this.food.draw(this.context);

    window.addEventListener("keydown", (event) => this.changeDirection(event));
    requestAnimationFrame((currentTime) => this.updateGame(currentTime));
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

  changeDirection(event) {
    if (!this.directionChanged) {
      switch (event.key) {
        case "ArrowUp":
          if (this.direction !== "down") this.direction = "up";
          break;
        case "ArrowDown":
          if (this.direction !== "up") this.direction = "down";
          break;
        case "ArrowLeft":
          if (this.direction !== "right") this.direction = "left";
          break;
        case "ArrowRight":
          if (this.direction !== "left") this.direction = "right";
          break;
      }
      this.directionChanged = true;
    }
  }

  updateGame(currentTime) {
    if (this.gameOver) {
      this.displayGameOver();
      return;
    }

    if (currentTime - this.lastUpdateTime > this.snakeSpeed) {
      this.clearCanvas();
      this.drawGrid();
      this.snake.update(this.direction, this.canvasWidth, this.canvasHeight);
      this.snake.draw(this.context);
      this.food.draw(this.context);
      this.lastUpdateTime = currentTime;
      this.directionChanged = false;

      if (this.snake.checkCollision()) {
        this.gameOver = true;
      }
    }
    requestAnimationFrame((currentTime) => this.updateGame(currentTime));
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
  }
}
