const Keuangan = require("../models/keuangan")

const addIncomeDeclaration = {
  name: "addIncome",
  description: `Add an income`,
  parameters: {
    type: "OBJECT",
    properties: {
      name: {
        type: "STRING",
        description: "Name of the income",
      },
      amount: {
        type: "NUMBER",
        description: "Amount of the income",
      },
    },
    required: ["name", "amount"],
  },
}

async function addIncome({ name, amount }) {
  let balance = new Keuangan();
  let res = await balance.addIncome(name, amount);
  return res
}

module.exports = { addIncomeDeclaration, addIncome }