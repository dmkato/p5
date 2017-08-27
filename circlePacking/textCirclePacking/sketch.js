var circles = [];
var spots = [];
var fileName = "sendNudes.png";
var img;

/* Runs once on start */
function setup() {
   spots = getSpots(img);
   var canvas = createCanvas(1000, 237);
   var x = (windowWidth - width) / 2;
   var y = (windowHeight - height) / 2;
   canvas.position(x, y);
}

/* Infinite Loop */
function draw() {
   background(255);
   addCircles(20);
   for (var i = 0;  i < circles.length; i++) {
      var circle = circles[i];
      if (!isTouching(circle)) {
         circle.grow();
      }
      circle.draw();
   }
}

function preload() {
   img = loadImage(fileName);
}

function getSpots(image){
   var s = [];
   image.loadPixels();

   // Look at each pixel
   for (var x = 0; x < img.width; x++) {
      for (var y = 0; y < image.height; y++) {
         var i = (x + (y * image.width)) * 4;
         var c = color(image.pixels[i], image.pixels[i+1], image.pixels[i+2], image.pixels[i+3]);
         var b = brightness(c);

         if(b < 1) {
            var v = createVector(x, y);
            s.push(v);
         } else {
            console.log();
         }
      }
   }
   return s;
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
      if (attempts > 1000) {
         noLoop();
         console.log("FINISHED");
         break;
      }
   }
}

function isTouching(circle) {
   if (circle.isGrowing) {
      if (circle.touchesEdge()) {
         circle.isGrowing = false;
         return true;
      } else {
         circles.forEach(function(other) {
            if(circle != other) {
               var d = dist(circle.x, circle.y, other.x, other.y);
               if (d - 2 < circle.r + other.r) {
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
   var v = Math.floor(random(spots.length));
   var x = spots[v].x;
   var y = spots[v].y;

   // Check if circle is inside another
   var valid = true;
   circles.forEach(function(circle) {
      var d = dist(x, y, circle.x, circle.y);
      if(d - 2 < circle.r) {
         valid = false;
      }
   });

   // If so, return it
   if (valid) {
      return new Circle(x, y);
   } else {
      return null;
   }

}
