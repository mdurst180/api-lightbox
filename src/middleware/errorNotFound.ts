// src/errors/NotFoundError.ts
export class NotFoundError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 404;  // Set HTTP status code for Not Found
    this.name = "NotFoundError";
  }
}
