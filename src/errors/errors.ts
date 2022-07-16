export class AlreadyFlaggedError extends Error {
  constructor(message: string) {
    super(message); // (1)
    this.name = 'AlreadyFlaggedError'; // (2)
  }
}
