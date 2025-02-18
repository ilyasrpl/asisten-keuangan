const Keuangan = require("../models/keuangan")

const addExpenseDeclaration = {
  name: "addExpense",
  description: `Add an expense`,
  parameters: {
    type: "OBJECT",
    properties: {
      name: {
        type: "STRING",
        description: "Name of the expense",
      },
      amount: {
        type: "NUMBER",
        description: "Amount of the expense",
      },
    },
    required: ["name", "amount"],
  },
}

async function addExpense({ name, amount }) {
  let balance = new Keuangan();
  let res = await balance.addExpense(name, amount);
  return res
}

module.exports = { addExpenseDeclaration, addExpense }