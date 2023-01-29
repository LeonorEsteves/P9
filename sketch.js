var seed = Math.random() * 1000;
var a = 2,
  b = 3;
var th = 0,
  seg = 0.01;
var r;
var mySize;
let colors1 = "#F75C03-#D90368-#820263-#291720-#04A777"
  .split("-")
  .map((a) => "#" + a);
let colors2 = "#FAA275-#FF8C61-#CE6A85-#985277-#5C374C"
  .split("-")
  .map((a) => "#" + a + "00");
let colorbg = "#16E0BD".split("-").map((a) => "#" + a);
let colorbg2 = "#98CE00".split("-").map((a) => "#" + a);

function setup() {
  // frameRate(15);
  mySize = min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 930, 400, 300, 200);
  // pixelDensity(5);
  r = mySize / 1;
  background(colorbg);
  let filter = new makeFilter();
}

function draw() {
  randomSeed(seed);
  // background(colorbg2);
  noFill();
  strokeCap(SQUARE);
  push();
  translate(width / 6, height / 4);
  for (let i = 0; i < 120; i += random(1)) {
    a = random(1);
    b = random(1);
    strokeWeight(random(50));
    rotate(random(TAU));
    stroke(random(colors1));
    ellipse(
      random(-i * 50,i*50) + r * cos(a * th),
      random(-i * 50,i*50) + r * sin(b * th),
      r*cos(a * (th + seg)),
      r*sin(b * (th + seg))
    );
  }
  pop();
  th += seg;
  image(overAllTexture, 0, 0);
}

function makeFilter() {
  randomSeed(seed);
  // noiseのフィルターをつくる
  colorMode(HSB, 456, 697, 348, 123);
  drawingContext.shadowColor = color(9, 5, 2, 16);
  overAllTexture = createGraphics(windowWidth, windowHeight);
  overAllTexture.loadPixels();
  for (var i = 0; i < width; i++) { // noprotect
    for (var j = 0; j < height; j++) {
      overAllTexture.set(
        i,
        j,
        color(10, 90, 70, noise(i / 3, j / 3, (i * j) / 50) * random(1, 15))
      );
    }
  }
  overAllTexture.updatePixels();
}

function keyTyped() {
  if (key === "s" || key === "S") {
    //noLoop();
    saveCanvas("DancingShapes_Tubes", "png");
  }
}