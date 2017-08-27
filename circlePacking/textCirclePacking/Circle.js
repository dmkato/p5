/* Circle object */
function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 0.5;
  this.weight = 0.1;
  this.fill = 0;
  this.color = color(10, 75, map(x, 0, width, 75, 175));
  this.isGrowing = true;
}

Circle.prototype.draw = function() {
   stroke(55);
   strokeWeight(this.weight);
   fill(this.color);
   ellipse(this.x, this.y, this.r * 2, this.r * 2);
};

Circle.prototype.grow = function() {
   if (this.isGrowing) {
      this.r += 0.2;
      this.weight = this.r / (this.r * 2);
   }
}

Circle.prototype.touchesEdge = function() {
 return (this.x + this.r > width || this.x - this.r < 0
      || this.y + this.r > height || this.y - this.r < 0);
}
