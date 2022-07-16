import { Command } from '@oclif/core';
import { getGameStatus } from '../../control/game-control';
import { printGame } from '../../presentation/game-presentation';

export default class Status extends Command {
  static description = 'Create a new game';

  static examples = [
    `$ oex status
      TODO
    `,
  ];

  async run(): Promise<void> {
    const game = getGameStatus();
    printGame(game);
  }
}
