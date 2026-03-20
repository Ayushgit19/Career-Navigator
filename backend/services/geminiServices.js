import genAI from "../config/gemini.js";

export async function generateFromGemini(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

  const result = await model.generateContent(prompt);

  return result.response.text();
}