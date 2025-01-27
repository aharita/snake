class Food {
  constructor(gridSize, canvasWidth, canvasHeight) {
    this.gridSize = gridSize;
    this.x = this.getRandomPosition(canvasWidth);
    this.y = this.getRandomPosition(canvasHeight);
  }

  getRandomPosition(max) {
    return Math.floor((Math.random() * max) / this.gridSize) * this.gridSize;
  }

  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.gridSize, this.gridSize);
  }

  generateNewPosition(canvasWidth, canvasHeight) {
    this.x = this.getRandomPosition(canvasWidth);
    this.y = this.getRandomPosition(canvasHeight);
  }
}
