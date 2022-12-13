import Sudoku from "../src/sudoku";

describe('Sudoku', () => {
  test ('it should return a sudoku object that has an empty 2d array with 9 rows and 9 columns', () => {
    const sudoku = new Sudoku();
    expect(sudoku.grid.length).toEqual(9);
    sudoku.grid.forEach(function(row) {
      expect(row.length).toEqual(9);
    });
  });
});
  