class ApiErrorHandler extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiErrorHandler(401, 'No token provided');
  }

  static BadRequestError(message, errors = []) {
    return new ApiErrorHandler(403, message, errors);
  }
}

export default ApiErrorHandler;
