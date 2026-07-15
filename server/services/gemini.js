import { GoogleGenAI } from "@google/genai";

export async function generateResponse(userMessage) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate AI response");
  }
}