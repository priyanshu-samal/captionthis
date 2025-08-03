require('dotenv').config();
const { GoogleGenAI } = require("@google/genai")



const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


async function generateCaption(base64ImageFile){

    const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
  config:{
    systemInstruction:`You are generating a caption for an image.
     The caption should be short, concise and descriptive,
      capturing the essence of the image.
      And use hastags and emoji according to image,
      IN Delhi slang language, Dark humour `
  }
});
return response.text;
}


module.exports = generateCaption;

