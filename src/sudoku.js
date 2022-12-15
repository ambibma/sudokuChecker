

export default function Sudoku () {
  this.grid = Array.from(Array(9), () =>  new Array(9));
}

Sudoku.prototype.validateCollection = function (arr) {
  const definedArr = arr.filter(x => Boolean(x));
  const arrayAsSet = new Set(definedArr);
  return arrayAsSet.size === definedArr.length;
}

Sudoku.prototype.validateRows = function () {
  return this.grid.every(this.validateCollection);
}

Sudoku.prototype.validateColumns = function () {
  // for i from 0 to 9
  for (let i = 0; i<9; i++){
    // construct new array
    let column = [];
    // grid.forEach
    this.grid.forEach((row)=>{
      // push the value at [i] into the new array
      column.push(row[i]);
    });
    // feed to validateCollection
    if (!this.validateCollection(column)){
      return false;
    }
  };
  return true;
}

Sudoku.prototype.validateSquares = function () {
  for (let i=0; i<9; i+=3) {
    let rows = this.grid.slice(i, i+3);
    let square;
    for (let j=0; j<9; j +=3) {
      square = [];
      rows.forEach(row =>{
        square.push(...row.slice(j, j + 3));
      });
      if(!this.validateCollection(square)){
        return false;
      }
    }
  };
  return true;
}

Sudoku.prototype.validatePuzzle = function () {
  return this.validateSquares() && this.validateRows() && this.validateColumns();
}

Sudoku.prototype.checkWin = function() {
  let counter = 0;
  this.grid.forEach((row)=>{
    const filteredArr = row.filter(x => Boolean(x));
    counter+=filteredArr.length;
  })
  console.log(counter);
  return (counter === 81);
  // return this.grid.every(row => row.filter(x => Boolean(x)).length === 9);
  // return this.grid.reduce((a, b) => a + b.filter(x => Boolean(x)).length, 0) === 81;
}

// square = [4,5,6,1,2,3,7,8,9];

// [
//   ['4', '5', '6']
//   [ '1', '2', '3', ],
//   ['7', '8', '9'],

//   ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
//   ['7', '8', '9', '1', '2', '3', '4', '5', '6'],
//   ['4', '5', '6', '7', '8', '9', '1', '2', '3'],
//   ['3', '1', '2', '8', '4', '5', '9', '6', '7'],
//   ['6', '9', '7', '3', '1', '2', '8', '4', '5'],
//   ['8', '4', '5', '6', '9', '7', '3', '1', '2'],
//   ['2', '3', '1', '5', '7', '4', '6', '9', '8'],
//   ['9', '6', '8', '2', '3', '1', '5', '7', '4'],
//   ['5', '7', '4', '9', '6', '8', '2', '3', '1'],
// ]

// if (value) (this is the Boolean(x))

// [ ,'1',,'1',,'6','7','8','9'];
// "truth table" [false, true, false, true, false, true, true, true, true]

// ['1', '1', '6', '7', '8', '9'].length = 6
// {'1', '6', '7', '8', '9'}.size = 5


// const definedArr = arr.filter(x => Boolean(x));

// const definedArr = [];

// arr.forEach( function(element) {
//   if (element !== undefined) {
//     definedArr.push(element);
//   }
// })