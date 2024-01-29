const data = [
  {
    nim: "20220040084",
    nama: "Supardi G",
    kelas: "TI22H",
    umur: 20,
  },
  {
    nim: "20220040085",
    nama: "Widhi Pebrianti H",
    kelas: "TI22H",
    umur: 19,
  },
];

function getAll() {
  return data;
}

function get(nim) {
  const mahasiswa = data.find((a) => a.nim === nim);

  if (!mahasiswa) {
    throw new Error("mahasiswa is not found");
  }

  return mahasiswa;
}

module.exports = { getAll, get };
