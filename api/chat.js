
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const resp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a friendly English tutor. Correct the user's English gently and explain why, in English only. Use simple, natural language and brief examples. Do not translate or use any other language."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.status(200).json({ reply: resp.choices[0].message.content });
  } catch (err) {
    console.error("Erro na função chat.js:", err);
    res.status(500).json({ reply: "There was an error while processing your request." });
  }
}
