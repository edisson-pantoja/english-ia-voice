
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  const body = await req.json();
  const { message } = body;

  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Você é um tutor amigável de inglês. Corrija suavemente os erros e mantenha a conversa fluindo." },
      { role: "user", content: message }
    ]
  });

  return res.status(200).json({ reply: resp.choices[0].message.content });
}
