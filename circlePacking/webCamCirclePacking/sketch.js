let circles = [];
let activeCircles = [];
let capture;

const addCircles = (num) => {
   const range = Array.from(Array(num).keys());
   range.map(() => {
      const c = newCircle();
      c ? circles.push(c) : null;
   });
};

const isTouchingOtherCircle = (circle) => {
   const isTouchingOne = (other) => {
      var d = dist(circle.x, circle.y, other.x, other.y);
      return (circle == other) || !(d < circle.r + other.r)
   };

   return !circles.every(isTouchingOne);
}

const isTouching = (circle) => {
   if (!circle.isGrowing) {
      return false;
   } else if (circle.isTouchingScreenEdge()) {
      circle.isGrowing = false;
      return true;
   } else if (isTouchingOtherCircle(circle)) {
      circle.isGrowing = false;
      return true;
   }
}

const generateValidCoords = () => {
   const x = random(width);
   const y = random(height);
   const isValid = (circ) => dist(x, y, circ.x, circ.y) >= circ.r;

   if (circles.every(isValid)) {
      return {x, y};
   } else {
      return null;
   }
}

const newCircle = () => {
   const coords = generateValidCoords();
   if (coords) {
      return new Circle(coords.x, coords.y);
   }
   return null;
};


const getColorFromPixel = (x, y) => {
   const index = ((Math.floor(y) * capture.width) + Math.floor(x)) * 4;
   const r = capture.pixels[index];
   const g = capture.pixels[index + 1];
   const b = capture.pixels[index + 2];
   const a = capture.pixels[index + 3];
   return color(r, g, b, a - 10);
}

function setup() {
   capture = createCapture(VIDEO);
   capture.hide();
   const canvas = createCanvas(640, 480);
   const x = (windowWidth - width) / 2;
   const y = (windowHeight - height) / 2;
   canvas.position(x, y);
}

function draw() {
   capture.loadPixels();
   addCircles(30);
   circles.map((circle) => circle.draw())
      .filter((circle) => !isTouching(circle))
      .map((circle) => circle.grow());
}
