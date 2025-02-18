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

function addIncome({ name, amount }) {
  // This mock API returns the requested lighting values
  return {
    name,
    amount,
  };
}

module.exports = { addIncomeDeclaration, addIncome }