import { CliUx, Command } from '@oclif/core';
import { click, flag, getGameStatus } from '../../control/game-control';
import { AlreadyFlaggedError } from '../../errors/errors';
import { printGame } from '../../presentation/game-presentation';
import { Game } from '../../types';

/**
 * f: flag
 * c: click
 * e: exit
 */
type PlayCommand = 'f' | 'c' | 'e' | null;

type ParsedCommand = { command: PlayCommand; row: number; column: number };

function parseCommandWithCoordinates(
  plainCommand: string,
  playCommand: PlayCommand
): ParsedCommand {
  const parts = plainCommand.split(' ');

  if (parts.length !== 3) {
    throw new Error('Invalid click command');
  }

  const row = parts[1].charCodeAt(0) - 65;
  const column = Number.parseInt(parts[2], 10);
  return { command: playCommand, row, column };
}

function parseCommand(plainCommand: string): ParsedCommand {
  if (plainCommand === 'e') {
    return { command: 'e', row: 0, column: 0 };
  }

  if (plainCommand.startsWith('c')) {
    return parseCommandWithCoordinates(plainCommand, 'c');
  }

  if (plainCommand.startsWith('f')) {
    return parseCommandWithCoordinates(plainCommand, 'f');
  }

  throw new Error(`Invalid command ${plainCommand}`);
}

function checkWonOrLost(currentGame: Game) {
  if (currentGame.state !== 'in_progress') {
    console.log(`You have ${currentGame.state} the game. Start a new game`);
  }
}

export default class Play extends Command {
  static description = 'Create a new game';

  static examples = [
    `$ oex status
      TODO
    `,
  ];

  async run(): Promise<void> {
    let currentGame = getGameStatus();
    printGame(currentGame);

    let command: PlayCommand = null;

    checkWonOrLost(currentGame);

    while (command !== 'e' && currentGame.state === 'in_progress') {
      try {
        const plainCommand = await CliUx.ux.prompt('Command');

        const {
          command: parsedCommand,
          row,
          column,
        } = parseCommand(plainCommand);

        switch (parsedCommand) {
          case 'c':
            currentGame = click(currentGame, row, column);
            console.log('currentGame state', currentGame.state);
            break;
          case 'f':
            currentGame = flag(currentGame, row, column);
            break;

          default:
            break;
        }

        printGame(currentGame);

        command = parsedCommand;
      } catch (error) {
        if (error instanceof AlreadyFlaggedError) {
          console.log(
            'This cell is already flagged. Unflag it using the flag command with the same location'
          );
        }
      }
    }

    checkWonOrLost(currentGame);
  }
}
