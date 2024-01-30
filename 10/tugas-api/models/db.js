const mysql = require("mysql2"); // using mysql2 for latest mysql server

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "mahasiswa",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to mysql", err);
  } else {
    console.log("Connected to mysql database");
  }
});

module.exports = connection;
