const express = require("express");
const motoGpRoute = require("./routes/motogp.route");

const app = express();
app.use("/", motoGpRoute);

module.exports = app;
