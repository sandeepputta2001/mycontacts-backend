const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Un Authorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log("No Error  , All Good");
      break;
  }
};

module.exports = errorHandler;
