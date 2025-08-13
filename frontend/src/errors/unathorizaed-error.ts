export class UnauthorizedError extends Error {
  code = 401;

  public constructor(message: string) {
    super(message);
  }
}
