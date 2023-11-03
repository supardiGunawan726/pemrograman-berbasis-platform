const motoGp = [
  {
    circuit: "Losail",
    location: "Qatar",
    winner: {
      firstName: "Andrea",
      lastName: "Davizioso",
      country: "Italy",
    },
  },
  {
    circuit: "Autodromo",
    location: "Argentine",
    winner: {
      firstName: "Cal",
      lastName: "Crutchlow",
      country: "UK",
    },
  },
  {
    circuit: "De Jerez",
    location: "Spain",
    winner: {
      firstName: "Valentino",
      lastName: "Rossi",
      country: "Italy",
    },
  },
  {
    circuit: "Mugello",
    location: "Italy",
    winner: {
      firstName: "Andrea",
      lastName: "Davizioso",
      country: "Italy",
    },
  },
];

function getAllMotogp() {
  return motoGp;
}

function groupByWinnerCountry() {
  const data = [];

  motoGp.forEach((motoGpItem) => {
    const { country, ...racer } = motoGpItem.winner;
    const currentWinnerCountry = data.find(
      (dataItem) => dataItem.country === country
    );
    if (currentWinnerCountry) {
      const currentRacer = currentWinnerCountry.racers.find(
        (racerItem) =>
          racerItem.firstName === racer.firstName &&
          racerItem.lastName === racer.lastName
      );
      if (!currentRacer) {
        currentWinnerCountry.racers.push(racer);
      }
    } else {
      data.push({
        country,
        racers: [racer],
      });
    }
  });

  return data;
}

function groupByWinner() {
  const data = [];

  motoGp.forEach((motoGpItem) => {
    const { winner, circuit, location } = motoGpItem;
    const currentWinner = data.find(
      (item) =>
        item.firstName === winner.firstName && item.lastName === winner.lastName
    );
    if (currentWinner) {
      currentWinner.circuits.push({ circuit, location });
    } else {
      data.push({
        firstName: winner.firstName,
        lastName: winner.lastName,
        circuits: [{ circuit, location }],
      });
    }
  });

  return data;
}

module.exports = {
  getAllMotogp,
  groupByWinnerCountry,
  groupByWinner,
};
