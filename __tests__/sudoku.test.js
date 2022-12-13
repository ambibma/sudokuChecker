import Sudoku from "../src/sudoku";

describe('Sudoku', () => {
  test ('it should return a sudoku object that has an empty 2d array with 9 rows and 9 columns', () => {
    const sudoku = new Sudoku();
    expect(sudoku.grid.length).toEqual(9);
    sudoku.grid.forEach(function(row) {
      expect(row.length).toEqual(9);
    });
  });
  
  test('it should return true if the given row does not contain duplicate numbers', () =>{ 
    const sudoku = new Sudoku();
    sudoku.grid[0] = ['1','2','3','4','5','6','7','8','9'];
    sudoku.grid[1] = [,'1','3','4','5','6','7','8','9'];
    expect(sudoku.validateRow(0)).toEqual(true);
    expect(sudoku.validateRow(1)).toEqual(true);
  });

  test('it should return false if the given row does contain duplicate numbers', () =>{ 
    const sudoku = new Sudoku();
    sudoku.grid[0] = ['1','1','3','4','5','6','7','8','9'];
    sudoku.grid[1] = [,'1','1','4','5','6','7','8','9'];
    expect(sudoku.validateRow(0)).toEqual(false);
    expect(sudoku.validateRow(1)).toEqual(false);
  });
});
  