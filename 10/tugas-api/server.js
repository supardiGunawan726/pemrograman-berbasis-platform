const express = require("express");
const bodyParser = require("body-parser");
const mahasiswaController = require("./controllers/mahasiswaController");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/mahasiswa", mahasiswaController);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
