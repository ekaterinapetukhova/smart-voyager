export class ServerError extends Error {
  private code = 500;

  public constructor(message: string = "Server Error") {
    super(message);
  }

  public getCode(): number {
    return this.code;
  }
}
