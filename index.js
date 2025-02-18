let { GoogleGenerativeAI } = require("@google/generative-ai");
let { getTime, getTimeDeclaration } = require("./tools/getTime");
require('dotenv').config();

async function functionCalling() {
  async function setLightValues(brightness, colorTemperature) {
    // This mock API returns the requested lighting values
    return {
      brightness,
      colorTemperature,
    };
  }

  const controlLightFunctionDeclaration = {
    name: "controlLight",
    parameters: {
      type: "OBJECT",
      description: "Set the brightness and color temperature of a room light.",
      properties: {
        brightness: {
          type: "NUMBER",
          description:
            "Light level from 0 to 100. Zero is off and 100 is full brightness.",
        },
        colorTemperature: {
          type: "STRING",
          description:
            "Color temperature of the light fixture which can be `daylight`, `cool` or `warm`.",
        },
      },
      required: ["brightness", "colorTemperature"],
    },
  };
  const functions = {
    controlLight: ({ brightness, colorTemperature }) => {
      return setLightValues(brightness, colorTemperature);
    },

    getTime: () => {
      return getTime(); 
    }
  };

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    tools: { functionDeclarations: [controlLightFunctionDeclaration, getTimeDeclaration] },
  });
  const chat = model.startChat();
  
  const prompt = "sekarang hari apa ?";

  const result = await chat.sendMessage(prompt);
  const call = result.response.functionCalls()[0];
  console.log(call);

  if (call) {
    const apiResponse = await functions[call.name](call.args);
    console.log(apiResponse);
    const result2 = await chat.sendMessage([
      {
        functionResponse: {
          name: call.name,
          response: apiResponse,
        },
      },
    ]);

    // Log the text response.
    console.log(result2.response.text());
  }
  // [END function_calling]
}

functionCalling();