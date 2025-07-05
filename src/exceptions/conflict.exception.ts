export class ConflictException extends Error {
  private code = 409;

  public constructor(message: string = "Conflict") {
    super(message);
  }

  public getCode(): number {
    return this.code;
  }
}
