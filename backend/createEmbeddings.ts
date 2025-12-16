import fs from 'fs';
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const docs = fs.readdirSync('./data/docs/');
const embeddings: any[] = [];

(async () => {
  for (const file of docs) {
    const text = fs.readFileSync(`./data/docs/${file}`, 'utf-8');
    const embRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    embeddings.push({ text, vector: embRes.data[0].embedding });
  }

  fs.writeFileSync('embeddings.json', JSON.stringify(embeddings));
  console.log('Embeddings saved.');
})();
