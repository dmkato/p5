/* sketch.js
** By Daniel Kato
*/
var vines = [];
var scl;

/* Runs once at startup */
function setup() {
   background(0);
   createCanvas(window.innerWidth/2, window.innerHeight - 70);
   scl = width / 40;

   // Create Vines
   for (var i = scl; i < width - scl; i += scl) {
      var start = createVector(i, 20);
      var end = createVector(i, 21);
      vines.push(new Vine(start, end));
   }
}

/* Infinite loop */
function draw() {
   background(255);
   for(var i = 0; i < vines.length; i++) {
      vines[i].draw();
      vines[i].update();
   }
}
