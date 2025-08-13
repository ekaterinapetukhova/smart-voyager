export class NotFoundError extends Error {
  code = 404;

  public constructor(message: string) {
    super(message);
  }
}
