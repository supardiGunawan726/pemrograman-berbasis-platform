const express = require("express");
const mahasiswaService = require("./mahasiswa-service");

const web = express();

function errorMiddleware(err, req, res, next) {
  if (!err) next();

  return res.status(500).json({
    error: err.message,
  });
}

web.get("/mahasiswa", (req, res) => {
  const result = mahasiswaService.getAll();

  res.status(200).json({
    data: result,
  });
});

web.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const result = mahasiswaService.get(nim);

  res.status(200).json({
    data: result,
  });
});

web.use(errorMiddleware);

module.exports = web;
