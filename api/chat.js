import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { message, context } = req.body;
  const prompt = context ? `You are simulating a situation: ${context}. ` : "";
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt +
            "You are a kind and helpful English tutor. When the user says something, correct it gently by first repeating what they said, then showing a more natural or correct way to say it. Briefly explain the reason for the correction. Always end with a follow-up question to keep the conversation going. Do not translate or use any language other than English."
        },
        { role: "user", content: message }
      ]
    });
    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch {
    res.status(500).json({ reply: "Error getting response from AI." });
  }
}
