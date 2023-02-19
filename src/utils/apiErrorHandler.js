class UnauthorizedError extends Error {
  constructor(message) {
    super();

    this.status = 401;
    this.message = message || 'Unauthorized Error';
  }
}
class BadRequestError extends Error {
  constructor(message) {
    super();

    this.status = 403;
    this.message = message || 'Bad Request Error';
  }
}

export { UnauthorizedError, BadRequestError };
