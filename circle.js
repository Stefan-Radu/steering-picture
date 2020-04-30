class Circle {

  static MAX_MAG = 270;
  static ERR_MAG = 5;

  constructor(pos, color, canvas) {
    this.target = pos;
    this.position = new Vector2d(Math.random() * canvas.width, Math.random() * canvas.height);
    this.velocity = new Vector2d((Math.random() - 0.5) * 27, (Math.random() - 0.5) * 27);
    this.acceleration = new Vector2d(0, 0);
    this.radius = Math.random() * 4 + 2;
    this.color = color;
  }

  display() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  seekTarget() {
    let desired = Vector2d.sub(this.target, this.position);
    let err = Vector2d.sub(desired, this.velocity);
    err.mag = Circle.ERR_MAG;
    this.acceleration.add(err);
  }

  isDone() {
    return Vector2d.dist(this.position, this.target) < EPS;
  }

  update(delta) {

    this.seekTarget();

    this.velocity.add(this.acceleration);

    let d = Math.min(Vector2d.dist(this.position, this.target), diagonal);
    this.velocity.mag = Math.min(Circle.MAX_MAG, Math.pow((Circle.MAX_MAG / diagonal) * d, 0.7));

    this.position.add(this.velocity);
    this.acceleration.mul(0);

    this.position.add(Vector2d.mul(this.velocity, delta));

    return true;
  }
}
