
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a friendly English tutor. Correct the user's English and explain gently, in natural and simple English. Do not translate. Be encouraging."
        },
        { role: "user", content: message }
      ]
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: "There was an error processing your message." });
  }
}
