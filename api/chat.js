import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { message, context } = req.body;
  const prompt = context ? `You are simulating a situation: ${context}. ` : "";
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt + "You are a kind English tutor. Correct the user's English gently and explain briefly why. Always end your response with a follow-up question to keep the conversation going. Do not translate to other languages." },
        { role: "user", content: message }
      ]
    });
    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch {
    res.status(500).json({ reply: "Error getting response from AI." });
  }
}