const express = require("express");

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
  }

  const code = 500;

  res.status(code).json({
    error: {
      message: err.message,
      code: code,
    },
  });
};

const app = express();

app.get("/", (req, res, next) => {
  try {
    throw new Error("Ini contoh error");
  } catch (e) {
    next(e);
  }
});
app.use(errorMiddleware);

module.exports = { app };
