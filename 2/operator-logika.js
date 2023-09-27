const nilaiUjian = 76;
const nilaiAbsensi = 70;

const lulusUjian = nilaiUjian > 75;
const lulusAbsensi = nilaiAbsensi > 75;

const lulus = lulusUjian || lulusAbsensi;
console.log(lulus);
