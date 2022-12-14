import Sudoku from "../src/sudoku";

describe('Sudoku', () => {
  let sudoku;

  beforeEach(() => {
    sudoku = new Sudoku();
    // confirmed valid sudoku grid
    sudoku.grid = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      ['7', '8', '9', '1', '2', '3', '4', '5', '6'],
      ['4', '5', '6', '7', '8', '9', '1', '2', '3'],
      ['3', '1', '2', '8', '4', '5', '9', '6', '7'],
      ['6', '9', '7', '3', '1', '2', '8', '4', '5'],
      ['8', '4', '5', '6', '9', '7', '3', '1', '2'],
      ['2', '3', '1', '5', '7', '4', '6', '9', '8'],
      ['9', '6', '8', '2', '3', '1', '5', '7', '4'],
      ['5', '7', '4', '9', '6', '8', '2', '3', '1'],
    ]
  });

  test ('it should return a sudoku object that has an empty 2d array with 9 rows and 9 columns', () => {
    expect(sudoku.grid.length).toEqual(9);
    sudoku.grid.forEach(function(row) {
      expect(row.length).toEqual(9);
    });
  });

  test('it should return true if the given array does not contain duplicate numbers', () =>{ 
    sudoku.grid[1] = ['1', '3', '4', '5', '6', '7', '8', '9'];
    expect(sudoku.validateCollection(sudoku.grid[1])).toEqual(true);
  });

  test('it should return false if the given array does contain duplicate numbers', () =>{ 
    sudoku.grid[0] = ['1', '1', '3', '4', '5', '6', '7', '8', '9'];
    sudoku.grid[1] = [, '1', '1', '4', '5', '6', '7', '8', '9'];
    expect(sudoku.validateCollection(sudoku.grid[0])).toEqual(false);
    expect(sudoku.validateCollection(sudoku.grid[1])).toEqual(false);
  });
  test('it should return true if the given grid does not contain rows with duplicate numbers', () =>{
    expect(sudoku.validateRows()).toEqual(true);
  });
  test('it should return false if the given grid does contain rows with duplicate numbers', () =>{
    sudoku.grid[0] = ['1', '1', '3', '4', '5', '6', '7', '8', '9'];
    expect(sudoku.validateRows()).toEqual(false);
  });
});

  