import { CliUx, Command } from '@oclif/core';
import { createNewGame } from '../../control/game-control';

export default class Start extends Command {
  static description = 'Create a new game';

  static examples = [
    `$ oex start
      new game started
    `,
  ];

  async run(): Promise<void> {
    const rows = await CliUx.ux.prompt('# of rows?', {
      required: true,
      default: '5',
    });
    const columns = await CliUx.ux.prompt('# of columns?', {
      required: true,
      default: '5',
    });
    const numberOfMines = await CliUx.ux.prompt('# of mines?', {
      default: '5',
    });

    if (numberOfMines >= rows * columns) {
      throw new Error(
        'Number of mines cannot be greater or equal than the number of cells'
      );
    }

    const game = createNewGame({
      columns: Number.parseInt(columns, 10),
      rows: Number.parseInt(rows, 10),
      numberOfMines: Number.parseInt(numberOfMines, 10),
    });

    this.log('new game created', game.id, game.state);
  }
}
