import Conf from 'conf';
import { Board, BoardCell, Game, MoveCell, MovesBoard } from '../types';

const GAME_KEY = 'game';
const LAST_GAME_KEY = 'lastGame';

function deserializeMoveCell(parsedCell: any): MoveCell {
  return {
    clicked: JSON.parse(parsedCell.clicked),
    value: parsedCell.value,
    flagged: JSON.parse(parsedCell.flagged),
    neighbours: Number.parseInt(parsedCell.neighbours, 10),
  };
}

function deserializeBoardCell(parsedCell: any): BoardCell {
  return {
    state: parsedCell.state,
  };
}

function deserializeBoard(parsedBoard: any): Board {
  const cells: BoardCell[][] = [];
  for (let i = 0; i < parsedBoard.cells.length; i++) {
    const row = parsedBoard.cells[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (cells[i] == null) {
        cells[i] = [];
      }

      cells[i].push(deserializeBoardCell(cell));
    }
  }

  const board: Board = {
    cells,
  };

  return board;
}

function deserializeMoves(parsedBoard: any): MovesBoard {
  const cells: MoveCell[][] = [];
  for (let i = 0; i < parsedBoard.cells.length; i++) {
    const row = parsedBoard.cells[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (cells[i] == null) {
        cells[i] = [];
      }

      cells[i].push(deserializeMoveCell(cell));
    }
  }

  const moves: MovesBoard = {
    cells,
  };

  return moves;
}

function deserialize(parsed: any): Game {
  const game: Game = {
    id: parsed.id,
    columns: Number.parseInt(parsed.columns, 10),
    rows: Number.parseInt(parsed.rows, 10),
    state: parsed.state,
    board: deserializeBoard(parsed.board),
    moves: deserializeMoves(parsed.moves),
  };

  return game;
}

function getGlobalStore() {
  return new Conf<{ lastGame: string }>({
    configName: 'global',
  });
}

export function setLastGame(id: string) {
  const store = getGlobalStore();
  store.set(LAST_GAME_KEY, id);
}

export function getLastGame() {
  const store = getGlobalStore();
  return store.get<string, string | null>(LAST_GAME_KEY, null);
}

function getStore(id: string) {
  return new Conf({ configName: id });
}

export function saveGame(game: Game): void {
  const store = getStore(game.id);
  store.set(GAME_KEY, game);
  setLastGame(game.id);
}

export function retrieveGame(id: string) {
  const store = getStore(id);
  const a = store.get<string>(GAME_KEY, null);
  return deserialize(a);
}
