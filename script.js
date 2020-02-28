let cells = new Array();
let nextGenCells = new Array();
let generations = 0;
let numberCells = 100;
let resolution = 10;
let id;
let stateOfCell;
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

setInitialState();
draw();

function setInitialState() {
  setCanvasDimensions();
  setCells();
  copyOneArrayToAnother(cells, nextGenCells);
}

function draw() {
  id = setInterval(frame, 100);
  function frame() {
    if (generations < numberCells) {
      colorCells();
      applyRule30();
      generations++;
      updateCellsForNextIteration();
    } else {
      clearInterval(id);
    }
  }
}

function setCanvasDimensions() {
  canvas.width = numberCells * resolution;
  canvas.height = numberCells * resolution;
}

function setCells() {
  // set the middle cell to 1 and all others to 0
  // this is the initial state of the cells for cellular automata rule 30
  for (i = 0; i < numberCells; i++) {
    if (i === numberCells / 2) {
      stateOfCell = 1;
    } else {
      stateOfCell = 0;
    }
    // add the cells with their state to the cells array
    cells.push(stateOfCell);
  }
}

function copyOneArrayToAnother(firstArray, secondArray) {
  for (i = 0; i < firstArray.length; i++) {
    secondArray.push(firstArray[i]);
  }
}

function colorCells() {
  // check state of each cell, if 1 set to black, if 0 set to white
  for (i = 0; i < cells.length; i++) {
    if (cells[i] === 1) {
      ctx.fillStyle = "black";
      ctx.fillRect(
        i * resolution,
        generations * resolution,
        resolution - 1,
        resolution - 1
      );
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(
        i * resolution,
        generations * resolution,
        resolution - 1,
        resolution - 1
      );
    }
  }
}

function applyRule30() {
  // check neighbouring cells of each cell individually
  for (i = 0; i < cells.length; i++) {
    // modulus arithmetic used to specify left and right cells
    // the array wraps so the cell to right of last cell is the first cell
    leftCell = cells[(i - 1 + numberCells) % numberCells];
    currentCell = cells[i];
    rightCell = cells[(i + 1 + numberCells) % numberCells];

    // apllying the rules for cellular automata rule 30
    // setting the state of the cell below depending on the state of the 3 above cells
    if (leftCell === 1 && currentCell === 1 && rightCell === 1) {
      nextGenCells[i] = 0;
    }
    if (leftCell === 1 && currentCell === 1 && rightCell === 0) {
      nextGenCells[i] = 0;
    }
    if (leftCell === 1 && currentCell === 0 && rightCell === 1) {
      nextGenCells[i] = 0;
    }
    if (leftCell === 1 && currentCell === 0 && rightCell === 0) {
      nextGenCells[i] = 1;
    }
    if (leftCell === 0 && currentCell === 1 && rightCell === 1) {
      nextGenCells[i] = 1;
    }
    if (leftCell === 0 && currentCell === 1 && rightCell === 0) {
      nextGenCells[i] = 1;
    }
    if (leftCell === 0 && currentCell === 0 && rightCell === 1) {
      nextGenCells[i] = 1;
    }
    if (leftCell === 0 && currentCell === 0 && rightCell === 0) {
      nextGenCells[i] = 0;
    }
  }
}

function updateCellsForNextIteration() {
  cells = [];
  copyOneArrayToAnother(nextGenCells, cells);
}
