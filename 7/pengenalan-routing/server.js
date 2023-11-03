const express = require("express");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.get("/about", (req, res) => {
  res.status(200);
  res.send("About");
});

app.get("/users", (req, res) => {
  res.send("Users");
});

app.post("/login", (req, res) => {
  res.send("Login");
});

app.post("/signup", (req, res) => {
  res.send("Signup");
});

app.get("/signup", (req, res) => {
  res.send("Signup");
});

app.get("*", (req, res) => {
  res.status(404).send("Kamu tersesat, halaman tidak ditemukan");
});

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
