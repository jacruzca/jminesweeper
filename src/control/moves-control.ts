import { Board, MoveCell, MovesBoard } from '../types';
import { iterateOnNeighbors } from '../util';
import { hasMine } from './board-control';

function generateDefaultCell(): MoveCell {
  return {
    clicked: false,
    flagged: false,
    neighbours: 0,
    value: 'blank',
  };
}

export function createDefaultMoves(rows: number, columns: number) {
  const cells: MoveCell[][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (cells[i] == null) {
        cells[i] = [];
      }

      cells[i][j] = generateDefaultCell();
    }
  }

  return { cells };
}

export function clickMine(
  moveBoard: MovesBoard,
  row: number,
  column: number
): MovesBoard {
  const updatedCells = [...moveBoard.cells];
  updatedCells[row][column] = {
    clicked: true,
    flagged: false,
    neighbours: 0,
    value: 'mine',
  };

  return { cells: updatedCells };
}

function countMines(
  board: Board,
  cells: MoveCell[][],
  row: number,
  column: number
): number {
  let mineCount = 0;
  iterateOnNeighbors(cells, row, column, (i: number, j: number) => {
    const isMine = hasMine(board, i, j);
    if (isMine) {
      mineCount++;
    }
  });

  return mineCount;
}

export function makeMove(
  board: Board,
  movesBoard: MovesBoard,
  row: number,
  column: number
): MovesBoard {
  let updatedCells = [...movesBoard.cells];
  const totalMines = countMines(board, updatedCells, row, column);
  if (totalMines > 0) {
    updatedCells[row][column] = {
      clicked: true,
      flagged: false,
      neighbours: totalMines,
      value: 'blank',
    };
  } else {
    updatedCells[row][column] = {
      clicked: true,
      flagged: false,
      neighbours: 0,
      value: 'blank',
    };
    iterateOnNeighbors(updatedCells, row, column, (i: number, j: number) => {
      const moves = makeMove(board, { cells: updatedCells }, i, j);
      updatedCells = moves.cells;
    });
  }

  return { cells: updatedCells };
}

export function flagMove(
  moveBoard: MovesBoard,
  row: number,
  column: number
): MovesBoard {
  const updatedCells = [...moveBoard.cells];
  const wasAlreadyFlagged = updatedCells[row][column].flagged;
  updatedCells[row][column] = {
    clicked: false,
    flagged: !wasAlreadyFlagged,
    neighbours: 0,
    value: 'blank',
  };

  return { cells: updatedCells };
}

export function hasFlag(movesBoard: MovesBoard, row: number, column: number) {
  return movesBoard.cells[row][column].flagged;
}

export function hasWon(board: Board, movesBoard: MovesBoard) {
  let totalMines = 0;
  let totalNonClickedMoves = 0;
  for (let i = 0; i < board.cells.length; i++) {
    for (let j = 0; j < board.cells[i].length; j++) {
      const moveCell = movesBoard.cells[i][j];
      const boardCell = board.cells[i][j];
      if (boardCell.state === 'mine') {
        totalMines++;
      }

      if (!moveCell.clicked) {
        totalNonClickedMoves++;
      }
    }
  }

  return totalMines === totalNonClickedMoves;
}
