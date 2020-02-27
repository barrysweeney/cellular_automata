let cells = new Array();
let nextGenCells;
let generations = 0;
let numberCells = 10;
let resolution = 100;
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let id;

setInitialState();
draw();

function setInitialState() {
  canvas.width = numberCells * resolution;
  canvas.height = numberCells * resolution;
  for (i = 0; i < numberCells; i++) {
    let state = Math.round(Math.random());
    cells.push(state);
  }
}

function draw() {
  id = setInterval(frame, 1000);
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
          ctx.fillRect(i * resolution, 0, resolution - 1, resolution - 1);
        }
      }

      // check neighbouring cells of each cell individually
      for (i = 1; i < cells.length - 1; i++) {
        leftCell = cells[i - 1];
        currentCell = cells[i];
        rightCell = cells[i + 1];

        if (leftCell === 1 && currentCell === 1 && rightCell === 1) {
          cells[i] = 0;
        } else if (leftCell === 1 && currentCell === 1 && rightCell === 0) {
          cells[i] = 0;
        } else if (leftCell === 1 && currentCell === 1 && rightCell === 0) {
          cells[i] = 0;
        } else if (leftCell === 1 && currentCell === 0 && rightCell === 1) {
          cells[i] = 1;
        } else if (leftCell === 0 && currentCell === 1 && rightCell === 1) {
          cells[i] = 1;
        } else if (leftCell === 0 && currentCell === 1 && rightCell === 0) {
          cells[i] = 1;
        } else if (leftCell === 0 && currentCell === 0 && rightCell === 1) {
          cells[i] = 1;
        } else if (leftCell === 0 && currentCell === 0 && rightCell === 0) {
          cells[i] = 0;
        }
      }
      generations++;
    } else {
      clearInterval(id);
    }
  }
}
