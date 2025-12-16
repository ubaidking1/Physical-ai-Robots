import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Load embeddings
const embeddings = JSON.parse(fs.readFileSync('embeddings.json', 'utf-8'));

// Simple similarity search (cosine)
function cosineSim(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  // 1️⃣ Get embedding of user question
  const qEmbedding = (await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: message,
  })).data[0].embedding;

  // 2️⃣ Find most similar doc
  const bestDoc = embeddings.reduce((prev, curr) => {
    const sim = cosineSim(qEmbedding, curr.vector);
    return sim > prev.sim ? { sim, text: curr.text } : prev;
  }, { sim: -1, text: '' });

  // 3️⃣ Ask LLM using context
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant answering based on context.' },
      { role: 'user', content: `Context:\n${bestDoc.text}\n\nQuestion: ${message}` },
    ],
  });

  res.json({ reply: completion.choices[0].message.content });
});

app.listen(8000, () => console.log('RAGBot running on http://localhost:8000'));
