class Snake {
  constructor(gridSize, canvasWidth, canvasHeight, food, game) {
    this.gridSize = gridSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.food = food;
    this.game = game;
    this.segments = [{ x: gridSize * 5, y: gridSize * 5 }];
    this.direction = "right";
  }

  getRandomPosition(max) {
    return Math.floor((Math.random() * max) / this.gridSize) * this.gridSize;
  }

  draw(context) {
    context.fillStyle = "green";
    this.segments.forEach((segment) => {
      context.fillRect(segment.x, segment.y, this.gridSize, this.gridSize);
    });
  }

  update() {
    const head = { ...this.segments[0] };

    switch (this.direction) {
      case "up":
        head.y -= this.gridSize;
        if (head.y < 0) head.y = this.canvasHeight - this.gridSize;
        break;
      case "down":
        head.y += this.gridSize;
        if (head.y >= this.canvasHeight) head.y = 0;
        break;
      case "left":
        head.x -= this.gridSize;
        if (head.x < 0) head.x = this.canvasWidth - this.gridSize;
        break;
      case "right":
        head.x += this.gridSize;
        if (head.x >= this.canvasWidth) head.x = 0;
        break;
    }

    for (let i = 1; i < this.segments.length; i++) {
      if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
        return true;
      }
    }

    this.segments.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.food.generateNewPosition(this.canvasWidth, this.canvasHeight);
      this.game.score++;
    } else {
      this.segments.pop();
    }

    return false;
  }

  checkCollision() {
    const head = this.segments[0];
    for (let i = 1; i < this.segments.length; i++) {
      if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
        return true;
      }
    }
    return false;
  }
}
