const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require('@google/generative-ai');
  
  const MODEL_NAME = 'gemini-1.5-flash';
  const API_KEY = 'AIzaSyCUGnlIXYN1Ui-kZzXPS7S3ti4XKg7pJ_s';
  
  // Create a new instance of GoogleGenerativeAI
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
  // Configuration for the generation
  const generationConfig = {
    temperature: 1,
    topK: 64,
    topP: 0.95,
    maxOutputTokens: 8192,
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  
  async function getChatResponse(userInput) {
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: 'user',
          parts: [{ text: 'hello' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Hello! How can I help you today?' }],
        },
        {
          role: 'user',
          parts: [{ text: 'i feel blood sugar level is increased what i have to do?' }],
        },
        {
          role: 'model',
          parts: [{ text: 'If you feel your blood sugar level is increased, you should first check your blood sugar level with a blood glucose meter. If your blood sugar level is above 200 milligrams per deciliter (mg/dL), you should seek medical attention immediately. You can also try to lower your blood sugar level by eating a healthy meal, drinking plenty of fluids, and taking your prescribed medications. If you have diabetes, it is important to monitor your blood sugar level regularly and to follow your doctor\'s treatment plan.\n\nHere are some tips to help you lower your blood sugar level:\n\n* Eat a healthy diet. A healthy diet is important for everyone, but it is especially important for people with diabetes. A healthy diet includes plenty of fruits, vegetables, and whole grains. It is also important to limit your intake of unhealthy fats, sugar, and salt.\n* Exercise regularly. Exercise helps to lower blood sugar levels and improve overall health. Aim for at least 30 minutes of moderate-intensity exercise most days of the week.\n* Take your medications as prescribed. If you have been prescribed medication for diabetes, it is important to take it as prescribed. Do not stop taking your medication without talking to your doctor.\n* Monitor your blood sugar level. It is important to monitor your blood sugar level regularly. This will help you to see how your diet, exercise, and medications are affecting your blood sugar level.\n* Get regular checkups. It is important to see your doctor for regular checkups. Your doctor can monitor your blood sugar level, check for complications of diabetes, and make sure that you are taking care of yourself.\n\nIf you have any questions or concerns about your blood sugar level, please talk to your doctor.' }],
        },
        {
          role: 'user',
          parts: [{ text: 'hai' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Hi there! How can I help you today?' }],
        },
        {
          role: 'user',
          parts: [{ text: 'i think you are little bit fast' }],
        },
        {
          role: 'model',
          parts: [{ text: "You're right! I can sometimes get a little carried away with providing information. 😅  \n\nIs there anything specific you'd like to talk about?  I'm happy to slow down and go at your pace. \n\nPerhaps you'd like to ask me a question about something else? Or tell me more about what's on your mind? \n\nLet me know! 😊" }],
        },
        {
          role: 'user',
          parts: [{ text: 'hel' }],
        },
        {
          role: 'model',
          parts: [{ text: "It seems like you might need a bit more help. 😊 \n\nCould you try finishing that word or telling me a bit more about what you need? \n\nI'm ready to listen!" }],
        },
      ],
    });
  
    const result = await chat.sendMessage(userInput);
    return result.response.text();
  }
  
  module.exports = { getChatResponse };
  