export class NotFoundError extends Error {
  private code = 404;

  public constructor(message: string = "Not Found", id?: string) {
    if (id) {
      super(`${message} with ID: ${id}`);
    } else {
      super(message);
    }
  }

  public getCode(): number {
    return this.code;
  }
}
