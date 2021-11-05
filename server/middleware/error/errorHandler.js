//Page not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error handler in express takes four arguments.
// This middleware allows for us to send our errors in json format.
const errorHandler = (err, req, res, next) => {
  // Creating this variable because sometimes the error will return as 200 even though there is actually an error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // appends the error to the response
  res.status(statusCode);
  // send message to user
  // stack is the file
  res.json({
    message: err?.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler, notFound };
