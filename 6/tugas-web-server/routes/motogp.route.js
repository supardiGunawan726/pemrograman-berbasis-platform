const motoGpRoute = require("express").Router();
const {
  getAll,
  getAllGroupedByWinnerCountry,
  getAllGroupedByByWinner,
} = require("../controllers/motogp.controller");

motoGpRoute.get("/", getAll);
motoGpRoute.get("/country", getAllGroupedByWinnerCountry);
motoGpRoute.get("/name", getAllGroupedByByWinner);
motoGpRoute.use((req, res) => {
  res.status(200).send("Bad request");
});

module.exports = motoGpRoute;
