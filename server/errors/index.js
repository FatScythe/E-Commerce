const BadRequestError = require("./badrequest-error");
const CustomAPIError = require("./custom-error");
const NotFoundError = require("./notfound-error");
const UnauthenticatedError = require("./unauthentication-error");
const UnauthorizedError = require("./unauthorize-error");

module.exports = {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
