const globalErrorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "internal server error";
  res.status(err.statusCode).render("error", {
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
  });
};

export { globalErrorHandlerMiddleware };
