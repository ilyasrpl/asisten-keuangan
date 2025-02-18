const Keuangan = require("../models/keuangan")

const getTransactionDeclaration = {
  name: "getTransaction",
  description: `mendapatkan transaksi pada hari tertentu, kamu bisa gunakan getTime untuk mendapatkan hari ini`,
  parameters: {
    type: "OBJECT",
    properties: {
      tanggal: {
        type: "NUMBER",
        description: "tanggal transaksi yang dicari",
      },
      bulan: {
        type: "NUMBER",
        description: "bulan transaksi yang dicari, dimulai dari angka 0, januari adalah 0",
      },
      tahun: {
        type: "NUMBER",
        description: "tahun transaksi yang dicari",
      }
    },
    required: ["tanggal","bulan","tahun"],
  },
}

async function getTransaction({tanggal, bulan, tahun}) {
  let transaksi = new Keuangan();
  let date = new Date(tahun, tanggal, bulan);
  let res = await transaksi.getTransaction(date);
  return { log :res };
}

module.exports = { getTransactionDeclaration, getTransaction }