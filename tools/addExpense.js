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

function addExpense({ name, amount }) {
  // This mock API returns the requested lighting values
  return {
    name,
    amount,
  };
}

module.exports = { addExpenseDeclaration, addExpense }