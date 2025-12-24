import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINIPRO_API_KEY);

export const generateNotesWithGemini = async (transcript) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // fast + free-tier friendly
  });

  const prompt = `
You are a teaching assistant.

From the following lecture transcript:
1. Write a short summary (5–6 sentences)
2. Create structured bullet-point notes
3. List key ideas for revision

Use simple, student-friendly language.

Transcript:
${transcript}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
