/* Leaf.js
** By Daniel Kato
*/

/* Constructor */
function Leaf(vinePos) {
   this.offset = random(-1, 1);
   this.x = vinePos.x + this.offset;
   this.y = vinePos.y;
   this.vineX = vinePos.x;
   this.radius = 0.001;
   this.maxRadius = random(scl/4, scl/2);
   this.leafVars = [];
   this.dropping = false;
   this.vel = 0
   this.weight = random(0.5, 2);

   // Add leaf drawing variation
   var curVars;
   var numVars = 8;
   for (var i = 0; i < numVars; i++) {
      if (i >= (numVars  / 2)) {
         var mirrorIdx = (numVars - i) - 1;
         curVars = this.leafVars[mirrorIdx];
      } else {
         curVars = {x: random(-1, 1), y: random(-1, 1)}
      }
      this.leafVars.push(curVars);
   }

   // Set color
   var r = random(0, 50);
   var g = random(150, 250);
   var b = random(10, 100);
   var a = random(50, 120);
   this.color = color(r, g, b, a);
}

/* Increases size of leaf; Returns false when leaf is off screen */
Leaf.prototype.update = function(amount) {

   // Increase radius and adjust x value
   if (this.radius < this.maxRadius) {
      this.radius += random(0, 0.1);
      this.x = this.vineX + (this.radius * this.offset);
   } else {
      this.radius = this.maxRadius;
      if (random(0, 10000) < 1) {
         this.dropping = true;
      }
   }
   // 
   // // Drop leaf
   // if (this.dropping) {
   //    this.y += this.vel;
   //    this.vel += 0.05
   // } else if (this.y > height) {
   //    return false;
   // }

   return true;
}

/* Draws leaf */
Leaf.prototype.draw = function() {
   var n = 8;
   var pts = [];

   // Set points
   for (var i = 0; i < n; i ++) {
      var angle = (TWO_PI / n) * i;
      var curX = this.x + sin(i) * this.radius + this.leafVars[i].x;
      var curY = this.y + cos(i) * this.radius + this.leafVars[i].y;
      pts.push(createVector(curX, curY));
   }

   // Draw shape
   stroke(this.color);
   strokeWeight(this.weight);
   fill(this.color);
   beginShape();
   for (var i = 0; i < n * 1.5; i++) {
      curveVertex(pts[i%n].x, pts[i%n].y);
   }
   endShape();
}
