import React, { useState } from 'react';

interface TranslateButtonProps {
  chapterText: string; // Current chapter content
  onTranslate: (translatedText: string, isRTL: boolean) => void; // Callback to update chapter
}

interface TranslationResponse {
  translated: string;
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
      const res = await fetch("http://127.0.0.1:8000/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: chapterText }),
      });

      const data: TranslationResponse = await res.json();
      onTranslate(data.translated, true); // Update parent content
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
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={handleTranslate}
      disabled={loading}
    >
      {loading ? 'Translating...' : translated ? 'Show English' : 'Translate to Urdu'}
    </button>
  );
}
