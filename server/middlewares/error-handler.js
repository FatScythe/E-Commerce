const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customErr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:
      err.message ||
      "Something went wrong, our engineeers are currently working on it",
  };

  if (err.code && err.code === 11000) {
    customErr.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field(s), Please choose another value`;
    customErr.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customErr.msg = `No item found with id : ${err.value}`;
    customErr.statusCode = 404;
  }
  console.log(err.name, err.code, err.value);
  res.status(customErr.statusCode).json({ msg: customErr.msg });
};

module.exports = errorHandlerMiddleware;
