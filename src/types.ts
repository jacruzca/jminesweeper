type BoardCellValue = 'mine' | 'blank';

export type BoardCell = {
  state: BoardCellValue;
};

export type MoveCell = {
  clicked: boolean;
  value: BoardCellValue;
  neighbours: number;
  flagged: boolean;
};

export type GenericBoard<T> = {
  cells: T[][];
};

export type Board = GenericBoard<BoardCell>;
export type MovesBoard = GenericBoard<MoveCell>;

type GameState = 'in_progress' | 'won' | 'lost';

export interface Game {
  id: string;
  rows: number;
  columns: number;
  state: GameState;
  board: Board;
  moves: MovesBoard;
}
