// nasty global variables
let r = 150;
let theta = 0;
let sunPerception = true;
let x, y;
let earth, planet, moon;
let planetRelHistory;
let traceCheckBox;
let reference = 'héliocentrique';

function setup() {
  createCanvas(750, 750);
  traceCheckBox = createCheckbox('Trajectoire visible', false);
  planetRelHistory = [];
  
  // colours
  let earthColour = createVector(5, 100, 250);
  let moonColour = createVector(255, 255, 255);
  let sunColour = createVector(250, 250, 5);
  let planetColour = createVector(200, 90, 20);

  // planets
  earth =  new Body('earth', earthColour, 150, 30, 1, false);
  planet = new Body('planet', planetColour, 250, 30, 1/2, false);
  moon = new Body('moon', moonColour, 30, 10, 6, false);
}

function draw() {
  background(0);

  // displaying the reference frame
  reference = sunPerception ? 'héliocentrique' : 'géocentrique';
  fill(255);
  textSize(20);
  let refText = text("référentiel " + reference, width - 250, 40);

  if (traceCheckBox.checked()) {
    push();
    for (pos of moon.history) {
      fill(255);
      if (sunPerception)
        circle(width/2 + pos.x, height/2 + pos.y, 3);
    }
    for (pos of earth.history) {
      fill(5, 100, 250);
      if (sunPerception)
        circle(width/2 + pos.x, height / 2 + pos.y, 3);
    }
  }

  // updating earth's position
  theta += PI / 100;
  x = r * cos(theta);
  y = r * sin(theta);

  // updating the perspective
  if (sunPerception)
    translate(width/2, height/2);
  else
    translate(width/2 - x, height/2 - y);

  // updating and displaying the planets
  earth.update();
  earth.show();
  moon.update(earth.pos);
  moon.show();
  planet.update();
  planet.show();

  // showing the planet's trajectory with the earth's perspective
  if (!sunPerception && traceCheckBox.checked()) {
    rel_pos = createVector(planet.pos.x - x, planet.pos.y - y);
    if (planetRelHistory.length < 405)
      planetRelHistory.push(rel_pos); 
    for (pos of planetRelHistory) {
      fill(255, 0, 0)
      circle(x + pos.x, y + pos.y, 3);
    }
  }

  if (traceCheckBox.checked()) {
    for (pos of planet.history) {
      fill(200, 90, 20);
        circle(pos.x, pos.y, 3);
    }
  }

  // displaying the sun
  noStroke();
  fill(250, 250, 5);
  circle(0, 0, 80);
}

function mouseClicked() {
  // check if the cursor is within the canvas
  if (mouseX < width && mouseY < height) {
    sunPerception =!sunPerception;
    earth.isCentered = ! earth.isCentered;
    planet.history = [];
    moon.history = [];
    planetRelHistory = [];
  }
}
