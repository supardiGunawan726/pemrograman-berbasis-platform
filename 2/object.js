const orang = {};

// Menambah atau Mengubah
orang.nama = "Eko Kurniawan";
orang.alamat = "Indonesia";
orang.umur = 20;

// menghapus
delete orang["umur"];

console.table(orang);
