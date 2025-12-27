// middleware/errorMiddleware.js
module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Server error",
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined
  });
};
