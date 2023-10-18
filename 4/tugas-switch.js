const penjualan = 300_000;
let uang_jasa;
let uang_komisi;

// NOTE: sangat tidak umum untuk menggunakan switch case dengan menggunakan operator perbandingan
switch (true) {
  case penjualan > 500_000:
    uang_jasa = 30_000;
    uang_komisi = 0.2 * penjualan;
    break;
  case penjualan > 200_000:
    uang_jasa = 20_000;
    uang_komisi = 0.15 * penjualan;
    break;
  default:
    uang_jasa = 10_000;
    uang_komisi = 0.1 * penjualan;
    break;
}

console.log("PENJUALAN: ", toIDR(penjualan));
console.log("UANG JASA: ", toIDR(uang_jasa));
console.log("UANG KOMISI: ", toIDR(uang_komisi));
console.log("TOTAL: ", toIDR(uang_jasa + uang_komisi));


function toIDR(num) {
  return num.toLocaleString("id", { style: "currency", currency: "idr" });
}
