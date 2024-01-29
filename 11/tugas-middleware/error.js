class ResponseError extends Error {
  code = 500;

  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

module.exports = {
  ResponseError,
};
