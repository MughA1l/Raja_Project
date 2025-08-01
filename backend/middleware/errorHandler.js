

function errorHandler(err, req, res, next) {
    // 500 for internal server error
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: {
      code: statusCode,
      type: err.type || 'SERVER_ERROR',
    },
  });
}

export default errorHandler;