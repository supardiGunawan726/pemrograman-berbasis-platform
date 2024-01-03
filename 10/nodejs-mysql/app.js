const express = require("express");
const mysql = require("mysql");

const app = express();

const mySQL = mysql.createConnection({
  host: "localhost",
  port: "6033",
  user: "develop",
  password: "123",
  database: "pbp",
});

mySQL.connect((err) => {
  if (err) {
    console.log("Error connecting: ", err.stack);
  } else {
    console.log("Connected to mySQL");
  }
});
