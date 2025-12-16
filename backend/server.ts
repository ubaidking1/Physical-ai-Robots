import express from 'express';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Load embeddings if exist
let embeddings: { text: string; vector: number[] }[] = [];
if (fs.existsSync('./backend/embeddings.json')) {
  embeddings = JSON.parse(fs.readFileSync('./backend/embeddings.json', 'utf-8'));
} else {
  console.log("No embeddings found. Run 'node backend/createEmbeddings.ts' first.");
}

// Simple cosine similarity
function cosineSim(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

// API endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'No message provided' });

  try {
    // 1️⃣ Embed user query
    const embRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message,
    });
    const userVector = embRes.data[0].embedding;

    // 2️⃣ Find top matching doc
    let bestMatch = { text: '', score: -Infinity };
    for (let doc of embeddings) {
      const score = cosineSim(userVector, doc.vector);
      if (score > bestMatch.score) bestMatch = { text: doc.text, score };
    }

    // 3️⃣ Generate reply with context
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant answering from provided documents.' },
        { role: 'user', content: `Context: ${bestMatch.text}\n\nQuestion: ${message}` },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
