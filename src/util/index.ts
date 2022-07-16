import { MoveCell } from '../types';

export function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function iterateOnNeighbors(
  cells: MoveCell[][],
  row: number,
  column: number,
  callback: (i: number, j: number) => void
) {
  for (let i = Math.max(0, row - 1); i < Math.min(cells.length, row + 2); i++) {
    const fullRow = cells[i];
    for (
      let j = Math.max(0, column - 1);
      j < Math.min(fullRow.length, column + 2);
      j++
    ) {
      if (cells[i][j].clicked === false) {
        // console.log('row, column', row, column);
        callback(i, j);
      }
    }
  }
}
