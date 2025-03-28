class CustomError extends Error {
  constructor(statusCode, status, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.operational = true;
  }
}

export { CustomError };
