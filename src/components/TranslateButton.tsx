import React, { useState } from 'react';
import { OpenAI } from 'openai';

interface TranslateButtonProps {
  chapterText: string; // Current chapter content
  onTranslate: (translatedText: string, isRTL: boolean) => void; // Callback to update chapter
}

export default function TranslateButton({ chapterText, onTranslate }: TranslateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [translated, setTranslated] = useState(false);

  const handleTranslate = async () => {
    if (translated) {
      // Toggle back to English
      onTranslate(chapterText, false);
      setTranslated(false);
      return;
    }

    setLoading(true);
    try {
      // Call OpenAI GPT for translation
      const client = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '', // Your API key
      });

      const response = await client.chat.completions.create({
        model: 'gpt-5-mini',
        messages: [
          {
            role: 'user',
            content: `Translate the following text into Urdu while preserving technical terms like "Physical AI", "ROS 2", and keep code blocks intact. Return in plain text:\n\n${chapterText}`
          }
        ],
        temperature: 0
      });

      const urduText = response.choices[0].message.content;
      onTranslate(urduText, true); // Update parent content
      setTranslated(true);

    } catch (err) {
      console.error('Translation error:', err);
      alert('Translation failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="translate-button"
      onClick={handleTranslate}
      aria-label="Translate chapter to Urdu"
      title="Translate this chapter to Urdu"
      disabled={loading}
    >
      {loading ? 'Translating...' : translated ? 'Show English' : 'Translate to Urdu'}
    </button>
  );
}
