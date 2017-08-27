/* File Name: cell.js
** Description: Cell Object File
*/

function Cell(x, y, state) {
   this.x = x;
   this.y = y;
   this.state = state;
   this.nextState = state;
   this.neighbors = 0;
   this.color = '#1ac6ff';
}
