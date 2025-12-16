
import React, { useState } from "react";

interface ChatResponse {
  answer: string;
}

const Chat: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleAsk = async () => {
    if (!question) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data: ChatResponse = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error contacting backend.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Chat with Physical AI</h2>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={3}
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ask
      </button>
      {answer && (
        <div className="mt-4 p-4 bg-gray-50 border rounded">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default Chat;
