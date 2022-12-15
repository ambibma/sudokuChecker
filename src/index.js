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
};

function generateBox(row, col){
  // create the element
  // <input type="Number" min="1" max="9" step="1" id="0-0"></input>
  const box = document.createElement('input');
  box.setAttribute('id', `${row}-${col}`);
  box.setAttribute('type', 'Number');
  box.setAttribute('min', '1');
  box.setAttribute('max', '9');
  box.setAttribute('step', '1');
  box.classList.add('box-input');
  box.onpaste = box => box.preventDefault();
  
  return box;
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
  //pull the form inputs into the grid
  const boxes = Array.from(document.getElementsByClassName('box-input'));
  boxes.forEach(insertIntoPuzzle);
  puzzleResult();
  //console.log(sudoku.validatePuzzle());
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
