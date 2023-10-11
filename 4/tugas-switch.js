let nilai = "C";
let ucapan = null;

switch (nilai) {
  case "A":
    ucapan = "Wow anda lulus, hebat";
    break;
  case "B":
    ucapan = "Selamat anda lulus dengan baik";
    break;
  case "C":
    ucapan = "Anda lulus";
    break;
  case "D":
    ucapan = "Anda tidak lulus";
    break;
  default:
    ucapan = "Anda mungkin salah jurusan";
}

console.log(ucapan);
