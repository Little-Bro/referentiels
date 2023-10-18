class Body {
  constructor(name, color, distanceFromSun, radius, angleCoeff, trailVisible, isCentered) {
    this.name = name;
    this.color = color;
    this.pos = createVector(distanceFromSun, height / 2);
    this.radius = radius;
    this.angleCoeff = angleCoeff;
    this.trailVisible = trailVisible;
    this.distanceFromSun = distanceFromSun;
    this.isCentered = isCentered;
    this.history = []
    this.angle = 0;
    this.stopRotating = false;
    this.theta = 0;
  }

  show() {
    noStroke();
    fill(this.color.x, this.color.y, this.color.z);
    circle(this.pos.x, this.pos.y, this.radius);
  }

  update(orbitedBodyPos) {
    if (!this.stopRotating)
      this.theta += PI / 100;
    else 
      this.theta = 0;

    if (orbitedBodyPos === undefined) {
      this.pos.x = this.distanceFromSun * cos(this.angleCoeff * this.theta);
      this.pos.y = this.distanceFromSun * sin(this.angleCoeff * this.theta);
    }
    else {
      this.pos.x = orbitedBodyPos.x + this.distanceFromSun * cos(this.angleCoeff * this.theta);
      this.pos.y = orbitedBodyPos.y + this.distanceFromSun * sin(this.angleCoeff * this.theta);
    }

    if (this.isCentered)
      this.history = [];

    let limit;
    if (this.name == 'earth')
      limit = 200;
    else if (this.name == 'planet')
      limit = 400;
    else if (this.name == 'moon')
      limit = 200;
    if (this.history.length < limit) {
      let currentPos = createVector(this.pos.x, this.pos.y)
      this.history.push(currentPos);
    }
  }
}