let bahasa = "French";
let salam = null;

switch (bahasa) {
  case "English":
    salam = "Good Morning!";
    break;
  case "French":
    salam = "Bonjour!";
    break;
  case "Japanese":
    salam = "Ohayou Gozaimasu!";
    break;
  default:
    salam = "Selamat Pagi!";
}

console.log(salam);
