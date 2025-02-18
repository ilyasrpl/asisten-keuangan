let { GoogleGenerativeAI } = require("@google/generative-ai");
let { getTime, getTimeDeclaration } = require("./tools/getTime");
const { addExpense, addExpenseDeclaration } = require("./tools/addExpense");
require('dotenv').config();

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function functionCalling() {

  const functions = {
    getTime: () => {
      return getTime(); 
    },
    addExpense: ({name, amount}) => {
      return addExpense({name, amount})
    }
  };

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    tools: { functionDeclarations: [getTimeDeclaration, addExpenseDeclaration] },
  });
  const chat = model.startChat();

  async function loop() {
    const prompt = await rl[Symbol.asyncIterator]().next();
    const result = await chat.sendMessage(prompt.value);
    const call = result.response.functionCalls();
  
    if (call) {
      const apiResponse = await functions[call[0].name](call[0].args);
      console.log(apiResponse);
      const result2 = await chat.sendMessage([
        {
          functionResponse: {
            name: call[0].name,
            response: apiResponse,
          },
        },
      ]);
  
      console.log(result2.response.text());
    }else{
      console.log(result.response.text())
    }
  
    loop(); // recursive call to continue the loop
  }
  
  loop();
}

functionCalling();