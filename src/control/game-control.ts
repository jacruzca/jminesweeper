import { AlreadyFlaggedError } from '../errors/errors';
import { getLastGame, retrieveGame, saveGame } from '../state/game-persistence';
import { Game } from '../types';
import { createBoard, hasMine } from './board-control';
import {
  clickMine,
  createDefaultMoves,
  flagMove,
  hasFlag,
  hasWon,
  makeMove,
} from './moves-control';

type Options = {
  rows: number;
  columns: number;
  numberOfMines?: number;
};

export function createNewGame(options: Options) {
  const id = `${Date.now()}`;
  const game: Game = {
    id,
    rows: options.rows,
    columns: options.columns,
    state: 'in_progress',
    board: createBoard(options.rows, options.columns, options.numberOfMines),
    moves: createDefaultMoves(options.rows, options.columns),
  };

  saveGame(game);
  return game;
}

export function getGameStatus(id?: string) {
  const gameId = id ?? getLastGame();
  if (gameId === null) {
    throw new Error('No last game found. Start a new game');
  }

  const game = retrieveGame(gameId);
  if (game === null) {
    throw new Error(
      `Game with id ${gameId} not found. Pass a valid id or start a new game.`
    );
  }

  return game;
}

function checkIfLost(game: Game, row: number, column: number): Game {
  const updatedGame = { ...game };
  const isMine = hasMine(game.board, row, column);
  if (isMine) {
    updatedGame.state = 'lost';
    const moves = clickMine(game.moves, row, column);
    updatedGame.moves = moves;
  }

  return updatedGame;
}

function checkIfWon(game: Game): Game {
  const updatedGame = { ...game };
  const won = hasWon(game.board, game.moves);
  console.log('won', won);
  if (won) {
    updatedGame.state = 'won';
  }

  return updatedGame;
}

export function click(game: Game, row: number, column: number): Game {
  const alreadyFlagged = hasFlag(game.moves, row, column);
  if (alreadyFlagged) {
    throw new AlreadyFlaggedError('This cell is alreayd flagged');
  }

  const updatedGame = checkIfLost(game, row, column);

  if (updatedGame.state === 'in_progress') {
    const moves = makeMove(updatedGame.board, updatedGame.moves, row, column);
    updatedGame.moves = moves;
  }

  const checkedGame = checkIfWon(updatedGame);

  saveGame(checkedGame);
  return checkedGame;
}

export function flag(game: Game, row: number, column: number): Game {
  const updatedGame = { ...game };
  const moves = flagMove(game.moves, row, column);
  updatedGame.moves = moves;
  saveGame(updatedGame);
  return updatedGame;
}
