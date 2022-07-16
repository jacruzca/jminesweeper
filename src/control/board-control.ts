import { Board, BoardCell } from '../types';
import { getRandomNumberBetween } from '../util';

function generateDefaultCell(withMine?: boolean): BoardCell {
  return {
    state: withMine ? 'mine' : 'blank',
  };
}

export function createBoard(
  rows: number,
  columns: number,
  numberOfMines = 10
): Board {
  const cells: BoardCell[][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (cells[i] == null) {
        cells[i] = [];
      }

      cells[i][j] = generateDefaultCell();
    }
  }

  return distributeMinesOnAExistingBoard({ cells }, numberOfMines);
}

function columnsAndRowsForBoard(board: Board) {
  if (board.cells.length === 0) {
    throw new Error('Invalid board.');
  }

  return { columns: board.cells.length, rows: board.cells[0].length };
}

function deployMine(board: Board, row: number, column: number): Board {
  const cells = [...board.cells];
  cells[row][column] = generateDefaultCell(true);
  return { cells };
}

export function distributeMinesOnAExistingBoard(
  board: Board,
  numberOfMines: number
): Board {
  const { columns, rows } = columnsAndRowsForBoard(board);
  let remainingMines = numberOfMines;
  while (remainingMines > 0) {
    const [row, column] = [
      getRandomNumberBetween(0, columns - 1),
      getRandomNumberBetween(0, rows - 1),
    ];
    if (!hasMine(board, row, column)) {
      board = deployMine(board, row, column);
      remainingMines -= 1;
    }
  }

  return board;
}

export function hasMine(board: Board, row: number, column: number) {
  return board.cells[row][column].state === 'mine';
}
