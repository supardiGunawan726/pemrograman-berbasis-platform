const express = require("express");
const mainRoutes = require("./routes/main.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use(mainRoutes);
app.use(authRoutes);
app.use((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(404);
  res.send(`<h1>Halaman tidak ditemukan</h1>`);
});

module.exports = app;
