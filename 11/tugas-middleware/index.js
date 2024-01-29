const express = require("express");
const { logger, error } = require("./middleware");
const { ResponseError } = require("./error");

const PORT = 3000;
const app = express();

app.use(logger);
app.get("/", (req, res) => {
  res.status(200).json({ data: "hello world" });
});
app.get("/error", (req, res, next) => {
  try {
    throw new ResponseError(404, "not found example error");
  } catch (err) {
    next(err);
  }
});
app.use(error);

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
