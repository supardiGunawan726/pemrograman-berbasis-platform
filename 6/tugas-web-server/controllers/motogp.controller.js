const {
  getAllMotogp,
  groupByWinnerCountry,
  groupByWinner,
} = require("../services/motogp.service");

function getAll(req, res) {
  const data = getAllMotogp();
  res.status(200).json(data);
}

function getAllGroupedByWinnerCountry(req, res) {
  const data = groupByWinnerCountry();
  res.status(200).json(data);
}

function getAllGroupedByByWinner(req, res) {
  const data = groupByWinner();
  res.status(200).json(data);
}

module.exports = {
  getAll,
  getAllGroupedByWinnerCountry,
  getAllGroupedByByWinner,
};
