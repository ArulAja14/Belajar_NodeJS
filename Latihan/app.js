const matematika = require("./matematika");

const hasiltambah = matematika.tambah(10, 5);
const hasilkurang = matematika.kurang(10, 5);
const hasilkali = matematika.kali(10, 5);
const hasilbagi = matematika.bagi(10, 5);

console.log("Hasil tambah:", hasiltambah);
console.log("Hasil kurang:", hasilkurang);
console.log("Hasil kali:", hasilkali);
console.log("Hasil bagi:", hasilbagi);