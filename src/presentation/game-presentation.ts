import { Table } from 'console-table-printer';
import { ColumnOptionsRaw } from 'console-table-printer/dist/src/models/external-table';

import {
  Board,
  BoardCell,
  Game,
  GenericBoard,
  MoveCell,
  MovesBoard,
} from '../types';

function printBoardCell(cell: BoardCell): string {
  switch (cell.state) {
    case 'mine':
      return '💣';
    default:
      return '🟨';
  }
}

function printMoveCell(cell: MoveCell): string {
  if (cell.flagged) {
    return '🚩';
  }

  if (cell.clicked) {
    if (cell.neighbours > 0) {
      return `${cell.neighbours}`;
    }

    switch (cell.value) {
      case 'mine':
        return '💥';
      default:
        return '☑️';
    }
  }

  return '🟨';
}

function printBoard<C, T extends GenericBoard<C>>(
  board: T,
  printCell: (cell: C) => string
) {
  if (board.cells.length === 0) {
    throw new Error('Cannot print board');
  }

  const printableBoard: string[][] = [];

  for (let i = 0; i < board.cells.length; i++) {
    const column = board.cells[i];

    if (printableBoard[i] == null) {
      printableBoard[i] = [];
    }

    for (let j = 0; j < column.length; j++) {
      if (j === 0) {
        printableBoard[i][j] = String.fromCharCode(65 + i);
      }

      const cell = column[j];

      printableBoard[i][j + 1] = printCell(cell);
    }
  }

  return printableBoard;
}

function setupTable(game: Game) {
  const columns: ColumnOptionsRaw[] = [
    ...Array(game.columns + 1)
      .fill(0)
      .map((_, i) => {
        return {
          title: i === 0 ? '/' : `${i - 1}`,
          name: `${i}`,
          maxLen: 1,
        } as ColumnOptionsRaw;
      }),
  ];

  const table = new Table({
    columns,
    rowSeparator: true,
  });

  return table;
}

export function printGame(game: Game) {
  const printableBoard = printBoard<BoardCell, Board>(
    game.board,
    printBoardCell
  );

  const boardTable = setupTable(game);
  for (const row of printableBoard) {
    boardTable.addRow(row);
  }

  boardTable.printTable();

  const printableMoves = printBoard<MoveCell, MovesBoard>(
    game.moves,
    printMoveCell
  );

  const movesTable = setupTable(game);
  for (const row of printableMoves) {
    movesTable.addRow(row);
  }

  movesTable.printTable();
  const gameInfo = {
    id: game.id,
    state: game.state,
  };

  console.table(gameInfo);
}
