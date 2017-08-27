/* File Name: sketch.js
** Description: Main sketch for cellularAutomata
*/

var width, height;
var scl = 2;
var chance = 9;
var automata;
var bFactor = 7;

function setup() {
   setCanvas();
   automata = new CellularAutomata(width, height);
   // frameRate(30);
   strokeWeight(scl);
}

function setCanvas() {
   var sketchHolder = $('#sketchHolder');
   width = sketchHolder.innerWidth();
   height = sketchHolder.innerHeight();
   var canvas = createCanvas(width, height);
   canvas.parent('sketchHolder');
}

function draw() {
   automata.drawCells();
   automata.newGeneration();
}
