/* Vine.js
** By Daniel Kato
*/

/* Constructor */
function Vine(start, end) {
   this.start = start;
   this.end = end;
   this.length = dist(start.x, start.y, end.x, end.y);
   this.maxLength = random(height / 2, height - 60)
   this.leaves = [];
   this.growthRate = random(0, 0.2);
   this.color = color(random(100, 200), 200, 50, 120);
   this.weight = random(1, 3);
}

/* Increases length of vine and number and width of leaves */
Vine.prototype.update = function(amount) {
   // Grow vine
   if (this.end.y < this.maxLength) {
      this.end.y += this.growthRate;
   }

   // Add leaf every 5 pixels of growth
   if (random(0, this.maxLength) < sqrt(this.end.y) * 2) {
      this.addLeaf();
   }

   // Accelarate growth
   this.growthRate += random(-0.1, 0.1);
   if (this.growthRate < 0.1) {
      this.growthRate = 0.1;
   }

   // Grow leaves
   for (var i = 0; i < this.leaves.length; i++) {
      var curLeaf = this.leaves[i];
      if (curLeaf.update() == false) {
         this.leaves.splice(i, 1);
      }
   }
}

/* Draws vine and leaves to canvas */
Vine.prototype.draw = function() {
   // Draw vine
   stroke(this.color);
   strokeWeight(this.weight);
   line(this.start.x, this.start.y, this.end.x, this.end.y);

   // Draw leaves
   for (var i = 0; i < this.leaves.length; i++) {
      this.leaves[i].draw();
   }
}

/* Creates new leaf */
Vine.prototype.addLeaf = function() {
   var validLeaf = true;
   var newPos = createVector(this.end.x, random(20, this.end.y));

   // Check proximity to other leaves
   for (var i = 0; i < this.leaves.length; i++) {
      var curLeaf = this.leaves[i];
      if (dist(newPos.x, newPos.y, curLeaf.x, curLeaf.y) <= curLeaf.maxRadius * 2) {
         validLeaf = false;
         break;
      }
   }
   if (validLeaf) {
      this.leaves.push(new Leaf(newPos));
   }
}
