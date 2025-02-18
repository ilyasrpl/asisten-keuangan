let { GoogleGenerativeAI } = require("@google/generative-ai");
let { readdirSync } = require("fs");
let { extname } = require("path");
require('dotenv').config();

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const functions = {}
  const functionDeclarations = []

  let toolsDir = "./tools"
  readdirSync(toolsDir).forEach(file => {
    if(extname(file) == ".js"){
      let module = require(toolsDir+"/"+file)
      let obj = Object.keys(module);
      obj.forEach(o => {
        if(typeof module[o] == "object") functionDeclarations.push(module[o])
          else functions[o] = module[o]
      })
    }
  })

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    tools: { functionDeclarations: functionDeclarations },
  });
  const chat = model.startChat();

  async function loop() {
    const prompt = await rl[Symbol.asyncIterator]().next();
    const result = await chat.sendMessage(prompt.value);
    const call = result.response.functionCalls();
  
    if (call) {
      console.log(call)
      let messages = []
      for (const v of call) {
        const apiResponse = await functions[v.name](v.args);
        messages.push({
          functionResponse: {
            name: v.name,
            response: apiResponse,
          }
        })
      }
      console.log(messages)

      const result2 = await chat.sendMessage(messages);
  
      console.log(result2.response.text());
    }else{
      console.log(result.response.text())
    }
  
    loop(); // recursive call to continue the loop
  }
  
  loop();
}

main();