/* File Name: cellularAutomata.js
** Description: Cell Object File
*/

/* Constructor */
function CellularAutomata(width, height) {
   this.generation = 0;
   this.cells = new Array();
   this.numCols = Math.floor(width/scl - 1);
   this.numRows = Math.floor(height/scl - 1);
   this.createCells();
   this.giveLife();
}

/* createCells */
CellularAutomata.prototype.createCells = function() {
   this.cells = [];
   for (var y = 0; y < this.numRows; y++) {
      this.cells.push(new Array());
      for (var x = 0; x < this.numCols; x++) {
         this.cells[y].push(new Cell(x, y, 0));
      }
   }
}

/* giveLife*/
CellularAutomata.prototype.giveLife = function() {
   var xBorder = ceil(this.numCols / bFactor);
   var yBorder = ceil(this.numRows / bFactor);
   for (var y = yBorder; y < this.numRows - yBorder; y++) {
      for (var x = xBorder; x < this.numCols - xBorder; x++) {
         var prob = floor(random(chance));
         var curCell = this.cells[y][x];
         if(prob != 1) {
            curCell.state = 1;
            curCell.nextState = 1;
         } else {
            curCell.state = 0;
            curCell.nextState = 0;
         }
      }
   }
}

/* drawCells */
CellularAutomata.prototype.drawCells = function() {
   background(255);
   for (var y = 0; y < this.numRows; y++) {
      for (var x = 0; x < this.numCols; x++) {
         var curCell = this.cells[y][x];
         curCell.state = curCell.nextState;
         if(curCell.state == 1){
            stroke(curCell.color);
            point((x+1) * scl, (y+1) * scl);
         }
      }
   }
}

/* newGeneration */
CellularAutomata.prototype.newGeneration = function() {
   this.generation++;
   for (var y = 0; y < this.numRows; y++) {
      for (var x = 0; x < this.numCols; x++) {
         var curCell = this.cells[y][x];
         this.checkNeighbors(curCell);
         this.applyRules(curCell)
      }
   }
}

/* checkNeighbors */
CellularAutomata.prototype.checkNeighbors = function(curCell) {
   curCell.neighbors = 0;
   for (var y = curCell.y - 1; y <= curCell.y + 1; y++) {
      for (var x = curCell.x - 1; x <= curCell.x + 1; x++) {
         // Toroidial Array
         var nY = y, nX = x;
         if(y < 0) { nY = this.numRows - 1;}
         if(y >= this.numRows) {nY = 0;}
         if(x < 0) { nX = this.numCols - 1;}
         if(x >= this.numCols) {nX = 0;}

         // Sum neighbors
         curCell.neighbors += this.cells[nY][nX].state;
      }
   }
   curCell.neighbors -= curCell.state;
}

/* applyRules */
CellularAutomata.prototype.applyRules = function(curCell) {
   // Lonliness
   if((curCell.state == 1) && (curCell.neighbors < 2)){
      curCell.nextState = 0;

   // Over Population
   } else if((curCell.state == 1) && (curCell.neighbors > 3)){
      curCell.nextState = 0;

   // Reproduction
   } else if((curCell.state == 0) && (curCell.neighbors == 3)){
      curCell.nextState = 1;
      curCell.color = '#1ac6ff';
      curCell.weight = scl;

   // Stasis
   } else {
      curCell.nextState = curCell.state;
      curCell.color = '#0099cc';
      curCell.weight += 1 / (pow(curCell.weight, 2));
   }
}
