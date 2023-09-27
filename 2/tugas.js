const mahasiswa = {
  nama: "Supardi G",
  kelas: "TI22H",
  nim: 20220040084,
};

const nilai = {
  imk: 80,
  rpl: 100,
};

console.log("Nama: ", mahasiswa.nama);
console.log("Kelas: ", mahasiswa.kelas);
console.log("NIM: ", mahasiswa.nim);
console.log("\nNilai");
console.log("Interaksi Manusia dan komputer: ", nilai.imk);
console.log("Rekayasa Perangkat Lunak: ", nilai.rpl);

const rataRata = (nilai.imk + nilai.rpl) / 2;
console.log("Rata-rata nilai: ", rataRata);
