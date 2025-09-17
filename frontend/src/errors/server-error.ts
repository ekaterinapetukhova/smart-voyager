export class ServerError extends Error {
  code = 500;

  public constructor(message: string) {
    super(message);
  }
}
