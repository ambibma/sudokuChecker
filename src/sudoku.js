

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