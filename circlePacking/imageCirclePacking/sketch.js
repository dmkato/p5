let circles = [];
let activeCircles = [];
let img;
const fileName = "flan.jpg";

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
   const isValid = (circ) => dist(x, y, circ.x, circ.y) >= circ.r + 1;

   if (circles.every(isValid)) {
      return {x, y};
   } else {
      return null;
   }
}

const newCircle = () => {
   const coords = generateValidCoords();
   if (coords) {
      const c = getColorFromPixel(coords.x, coords.y);
      return new Circle(coords.x, coords.y, c);
   }
   return null;
};


const getColorFromPixel = (x, y) => {
   const index = ((Math.floor(y) * img.width) + Math.floor(x)) * 4;
   const r = img.pixels[index];
   const g = img.pixels[index + 1];
   const b = img.pixels[index + 2];
   const a = img.pixels[index + 3];
   return color(r, g, b, a);
}

function preload() {
   img = loadImage(fileName);
}

function setup() {
   img.loadPixels();
   const canvas = createCanvas(375, 500);
   const x = (windowWidth - width) / 2;
   const y = (windowHeight - height) / 2;
   canvas.position(x, y);
}

function draw() {
   background(81);
   addCircles(10);
   circles.map((circle) => circle.draw())
      .filter((circle) => !isTouching(circle))
      .map((circle) => circle.grow());
}
