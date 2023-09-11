const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customErr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:
      err.message ||
      "Something went wrong, our engineeers are currently working on it",
  };
  if (err.name === "ValidationError") {
    customErr.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customErr.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.code && err.code === 11000) {
    customErr.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field(s), Please choose another value`;
    customErr.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customErr.msg = `No item found with id : ${err.value}`;
    customErr.statusCode = StatusCodes.NOT_FOUND;
  }

  res.status(customErr.statusCode).json({ msg: customErr.msg });
};

module.exports = errorHandlerMiddleware;
