class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static add(v1, v2) {
    return new Vector2d(v1.x + v2.x, v1.y + v2.y);
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
  }

  static sub(fst, sec) {
    return new Vector2d(fst.x - sec.x, fst.y - sec.y);
  }

  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
  }

  static mul(vec, val) {
    return new Vector2d(vec.x * val, vec.y * val);
  }

  mul(val) {
    this.x *= val;
    this.y *= val;
  }

  get mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set mag(newMag) {
    let prevMag = this.mag;
    let newX = this.x * newMag / prevMag;
    let newY = this.y * newMag / prevMag;
    this.x = newX;
    this.y = newY;
  }

  static dist(v1, v2) {
    return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
  }
}
