function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500).json({
      success: "HELLO ERROR",
      message: err.message || "Server Error",
    });
  }
  
  module.exports = { errorHandler };
  