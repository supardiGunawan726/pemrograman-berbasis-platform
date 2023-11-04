const routes = require("express").Router();

const dataMahasiswa = [
  {
    nim: 20220040084,
    nama: "Supardi G",
    kelas: "TI22H",
  },
  {
    nim: 20220040021,
    nama: "Moch Adriq",
    kelas: "TI22H",
  },
  {
    nim: 20220040032,
    nama: "Muhammad Rifda",
    kelas: "TI22H",
  },
];

routes.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/json");
  res.status(200);
  res.json(dataMahasiswa);
});

routes.get("/:nim", (req, res) => {
  const nim = Number(req.params.nim);
  const mahasiswa = dataMahasiswa.find((m) => m.nim === nim);

  if (mahasiswa) {
    res.setHeader("Content-Type", "text/json");
    res.status(200);
    res.json(mahasiswa);
  } else {
    res.status(404);
    res.json({
      error: true,
      message: "Mahasiwa tidak ditemukan",
    });
  }
});

routes.use((req, res) => {
  res.status(400).send("400 Bad Request.");
});

module.exports = routes;
