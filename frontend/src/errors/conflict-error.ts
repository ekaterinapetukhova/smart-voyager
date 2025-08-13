export class ConflictError extends Error {
  code = 409;

  public constructor(message: string) {
    super(message);
  }
}
