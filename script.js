let cells = new Array();
let nextGenCells = new Array();
let generations = 0;
let numberCells = 100;
let resolution = 10;
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let id;
let stateOfCell;

setInitialState();
draw();

function setRandomInitialState() {
  canvas.width = numberCells * resolution;
  canvas.height = numberCells * resolution;
  for (i = 0; i < numberCells; i++) {
    stateOfCell = Math.round(Math.random());
    cells.push(stateOfCell);
  }
}

function setInitialState() {
  canvas.width = numberCells * resolution;
  canvas.height = numberCells * resolution;
  for (i = 0; i < numberCells; i++) {
    if (i === numberCells / 2) {
      stateOfCell = 1;
    } else {
      stateOfCell = 0;
    }
    cells.push(stateOfCell);
  }
  for (i = 0; i < cells.length; i++) {
    nextGenCells.push(cells[i]);
  }
}

function draw() {
  id = setInterval(frame, 100);
  function frame() {
    if (generations < numberCells) {
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

      // check neighbouring cells of each cell individually
      for (i = 0; i < cells.length; i++) {
        leftCell = cells[(i - 1 + numberCells) % numberCells];
        currentCell = cells[i];
        rightCell = cells[(i + 1 + numberCells) % numberCells];

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
      generations++;
      cells = [];
      for (i = 0; i < nextGenCells.length; i++) {
        cells.push(nextGenCells[i]);
      }
    } else {
      clearInterval(id);
    }
  }
}
