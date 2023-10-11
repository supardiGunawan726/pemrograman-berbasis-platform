let nilai = "C";
let ucapan = null;

if (nilai === "A") {
  ucapan = "Wow anda lulus, hebat";
} else if (nilai === "B") {
  ucapan = "Selamat anda lulus dengan baik";
} else if (nilai === "C") {
  ucapan = "Anda lulus";
} else if (nilai === "D") {
  ucapan = "Anda tidak lulus";
} else {
  ucapan = "Anda mungkin salah jurusan";
}

console.log(ucapan);
