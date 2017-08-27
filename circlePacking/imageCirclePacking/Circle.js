/* Circle object */
function Circle(x, y, color) {
  this.x = x;
  this.y = y;
  this.r = 1;
  this.color = color;
  this.isGrowing = true;
}

/* Draws current circle state to screen */
Circle.prototype.draw = function() {
   noStroke();
   fill(this.color);
   ellipse(this.x, this.y, this.r * 2, this.r * 2);
   return this;
};

/* Increases radius of circle */
Circle.prototype.grow = function() {
   if (this.isGrowing) {
      this.r += 0.1;
   }
   return this;
}

/* Returns true if circle touches the edge of the screen */
Circle.prototype.isTouchingScreenEdge = function() {
 return (this.x + this.r > width || this.x - this.r < 0
      || this.y + this.r > height || this.y - this.r < 0);
}
