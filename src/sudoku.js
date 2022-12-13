

export default function Sudoku () {
  this.grid = Array.from(Array(9), () =>  new Array(9));
}

Sudoku.prototype.validateCollection = function (arr) {
  const definedArr = arr.filter(x => Boolean(x));
  const arrayAsSet = new Set(definedArr);
  return arrayAsSet.size === definedArr.length;
}
