const errorHandler = (err, req, res, next) => {
  let code = 500;
  let error = "[Internal server error] Initial Server Error";

  if (err.message === "Page Not Found") {
    code = 404;
    error = `[Not found] ${err.message}!`;
  } else if (
    err.message.includes("validation failed") ||
    err.message.includes("length must be") ||
    err.message.includes("is required")
  ) {
    code = 400;
    error = `[Bad Request] ${err.message}. Check inputted data, route or params!`;
  } else if (
    err.message === "No Access" ||
    err.message.includes("jwt malformed")
  ) {
    code = 401;
    error = `[Not Authorized] ${err.message}!`;
  } else if (err.message.includes("E11000 duplicate key error collection")) {
    code = 409;
    error = `[Conflict] ${err.message}. Data already exist!`;
  }

  res.status(code).json({ code, message: error });
};

module.exports = errorHandler;
