import Sudoku from "./sudoku.js";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
let sudoku = new Sudoku();

function generateForm(){
  const form = document.createElement('form');
  for (let rowIndex=0; rowIndex < 9; rowIndex++) {
    const row = document.createElement('div');
    for (let colIndex=0; colIndex < 9; colIndex++) {
      const box = generateBox(rowIndex, colIndex);
      row.append(box);
    }
    form.append(row);
  }
  const checkerButton = document.createElement('button');
  checkerButton.innerText = "Check Puzzle";
  checkerButton.setAttribute("id","checkerButton");
  form.append(checkerButton);
  form.addEventListener("submit", puzzleValidationHandler);
  document.getElementById('sudokuPuzzle').append(form);
}

function generateBox(row, col){
  // create the element
  // <input type="Number" min="1" max="9" step="1" id="0-0"></input>
  const box = document.createElement('input');
  box.setAttribute('id', `${row}-${col}`);
  box.setAttribute('type', 'Number');
  box.setAttribute('min', '1');
  box.setAttribute('max', '9');
  box.setAttribute('maxlength', '1');
  box.classList.add('box-input');
  box.classList.add('box-valid');
  box.classList.add(['box-top', 'box-mid', 'box-bottom'][row % 3]);
  box.classList.add(['box-left', 'box-mid', 'box-right'][col % 3]);
  box.onpaste = box => box.preventDefault();
  box.addEventListener('keypress', keyPressHandler);
  box.addEventListener('keydown', function (e) {
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "ArrowRight") {
      (document.getElementById(`${row}-${col + 1}`) || document.getElementById(`${row}-${col}`)).focus();
    } else if (e.key === "ArrowLeft") {
      (document.getElementById(`${row}-${col - 1}`) || document.getElementById(`${row}-${col}`)).focus();
    } else if (e.key === "ArrowUp") {
      (document.getElementById(`${row - 1}-${col}`) || document.getElementById(`${row}-${col}`)).focus();
    } else if (e.key === "ArrowDown") {
      (document.getElementById(`${row + 1}-${col}`) || document.getElementById(`${row}-${col}`)).focus();
    } else if (e.key === "Delete" || e.key === "Backspace") {
      keyPressHandler(e);
    }
  });
  
  return box;
}

function keyPressHandler(e) {
  e.preventDefault();
  e.target.value = String.fromCharCode(e.charCode);
  assessRow(e.target.id.split('-')[0]);
  assessColumn(e.target.id.split('-')[1]);
  assessSquare(...e.target.id.split('-'));
}

function insertIntoPuzzle(box) {
  let [rowIndex, colIndex] = box.id.split('-');
  sudoku.grid[rowIndex][colIndex] = box.value;
}

function puzzleResult(){
  // adds a message if the puzzle is valid
  const winMessage = document.getElementById("winMessage");
  const loseMessage = document.getElementById("loseMessage");
  const progressMessage = document.getElementById("progressMessage");
  loseMessage.classList.add('hidden');
  winMessage.classList.add('hidden');
  progressMessage.classList.add('hidden');

  if (sudoku.validatePuzzle() && sudoku.checkWin()) {
    winMessage.classList.remove('hidden');
  } else if(!sudoku.validatePuzzle()) {
    loseMessage.classList.remove('hidden');
  } else {
    progressMessage.classList.remove('hidden');
  }
}

function puzzleValidationHandler(event) {
  event.preventDefault();
  const boxes = Array.from(document.getElementsByClassName('box-input'));
  boxes.forEach(insertIntoPuzzle);
  puzzleResult();
}

function markRowInvalid(row) {
  row.forEach(function(box) {
    box.classList.remove('box-valid-row');
    box.classList.add('box-invalid-row');
  });
}

function markRowValid(row) {
  row.forEach(function(box) {
    box.classList.remove('box-invalid-row');
    box.classList.add('box-valid-row');
  });
}

function markColInvalid(row) {
  row.forEach(function(box) {
    box.classList.remove('box-valid-col');
    box.classList.add('box-invalid-col');
  });
}

function markColValid(row) {
  row.forEach(function(box) {
    box.classList.remove('box-invalid-col');
    box.classList.add('box-valid-col');
  });
}

function markSquareInvalid(row) {
  row.forEach(function(box) {
    box.classList.remove('box-valid-square');
    box.classList.add('box-invalid-square');
  });
}

function markSquareValid(row) {
  row.forEach(function(box) {
    box.classList.remove('box-invalid-square');
    box.classList.add('box-valid-square');
  });
}

function assessRow(rowIndex) {
  const row = buildRow(rowIndex);
  if (sudoku.validateCollection(row.map(x => x.value))) {
    markRowValid(row);
  } else {
    markRowInvalid(row);
  }
}

function assessColumn(colIndex) {
  const col = buildCol(colIndex);
  if (sudoku.validateCollection(col.map(x => x.value))) {

    markColValid(col);
  } else {
    markColInvalid(col);
  }
}

function assessSquare(rowIndex, colIndex) {
  const square = buildSquare(rowIndex, colIndex);
  if (sudoku.validateCollection(square.map(x => x.value))) {
    markSquareValid(square);
  } else {
    markSquareInvalid(square);
  }
}

function buildCol(colIndex) {
  const boxes = Array.from(document.getElementsByClassName('box-input'));
  return boxes.filter(box => box.id.split('-')[1] === colIndex);
}

function buildRow(rowIndex) {
  const boxes = Array.from(document.getElementsByClassName('box-input'));
  return boxes.filter(box => box.id.split('-')[0] === rowIndex);
}

function buildSquare(rowIndex, colIndex) {
  const boxes = Array.from(document.getElementsByClassName('box-input'));
  const indexMap = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']];
  const rowGroup = Math.floor(parseInt(rowIndex) / 3);
  const colGroup = Math.floor(parseInt(colIndex) / 3);
  const square = boxes.filter(function (box) {
    
    const [rowIndex, colIndex] = box.id.split('-');
    return indexMap[rowGroup].includes(rowIndex) && indexMap[colGroup].includes(colIndex);
  });
  return square;
}

document.addEventListener("paste", function(e) {
  let data = e.clipboardData.getData('Text');
  data = data.replaceAll('\r\n','').replaceAll('\n','').replaceAll(' ', '').replaceAll('],', ',').replaceAll('[', '').replaceAll(']', '').replaceAll("'", '').split(',');
  [].forEach.call(document.querySelectorAll("input[type=number]"), (node, index) => {
    node.value = data[index];
  });
});

generateForm();

//9x9 grid of number inputs 


//    -event handler on "change", set attribute of input to allow numbers from 1-9
//  -styling classes? for each square??? # thicker border
// - Notification for bad puzzle
// stretch goals
// - if false is recieved square, row or column that the false => add class => css will draw a red border
// - different difficulty settings for autocheck etc
