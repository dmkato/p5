let circles = [];
const fileName = "flan.jpg";
let img;

function setup() {
   img.loadPixels();
   const canvas = createCanvas(375, 500);
   const x = (windowWidth - width) / 2;
   const y = (windowHeight - height) / 2;
   canvas.position(x, y);
}

function draw() {
   background(31);
   addCircles(5);
   circles.filter((circle) => !isTouching(circle))
      .map((circle) => circle.grow());
   circles.map((circle) => circle.draw());
}

function preload() {
   img = loadImage(fileName);
}

function addCircles(total){
   var count = 0;
   var attempts = 0;

   while (count < total) {
      var c = newCircle();
      if(c != null) {
         circles.push(c);
         count++;
      }
      attempts++;
      if (attempts > 10000) {
         noLoop();
         console.log("FINISHED");
         break;
      }
   }
}

function isTouching(circle) {
   if (circle.isGrowing) {
      if (circle.isTouchingScreenEdge()) {
         circle.isGrowing = false;
         return true;
      } else {
         circles.map((other) => {
            if(circle != other) {
               var d = dist(circle.x, circle.y, other.x, other.y);
               if (d < circle.r + other.r) {
                  circle.isGrowing = false;
                  return true;
               }
            }
         });

      }
   }
   return false;
}

function newCircle() {
   var x = random(width);
   var y = random(height);

   // Check if circle is inside another
   var valid = true;
   circles.forEach((circle) => {
      var d = dist(x, y, circle.x, circle.y);
      if(d < circle.r + 2) {
         valid = false;
      }
   });

   // If so, return it
   if (valid) {
      c = getColorFromPixel(x, y);
      return new Circle(x, y, c);
   } else {
      return null;
   }
};


function getColorFromPixel(x, y) {
   var index = ((Math.floor(y) * img.width) + Math.floor(x)) * 4;

   var r = img.pixels[index];
   var g = img.pixels[index + 1];
   var b = img.pixels[index + 2];
   var a = img.pixels[index + 3];

   return color(r, g, b, a);
}
