import React, { useState, useRef, useEffect } from "react";

interface RAGMessage {
  id: string;
  question: string;
  answer?: string;
  translatedAnswer?: string;
}

const RAGChat: React.FC = () => {
  const [messages, setMessages] = useState<RAGMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const newMessage: RAGMessage = { id: Date.now().toString(), question };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, context: "" }) // context optional
      });
      const data = await res.json();

      const updatedMessage: RAGMessage = {
        ...newMessage,
        answer: data.answer,
        translatedAnswer: data.translated
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? updatedMessage : msg))
      );
    } catch (err) {
      console.error("RAG Error:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id
            ? { ...msg, answer: "Failed to retrieve answer." }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rag-chat border rounded p-4 w-[500px] h-[600px] flex flex-col">
      <div className="messages flex-1 overflow-y-auto mb-2">
        {messages.map((msg) => (
          <div key={msg.id} className="my-2 p-2 bg-gray-100 rounded">
            <div className="font-bold">Q: {msg.question}</div>
            <div className="mt-1">A: {msg.answer || "Waiting for response..."}</div>
            {msg.translatedAnswer && (
              <div className="text-sm text-gray-500 mt-1">({msg.translatedAnswer})</div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Ask a question..."
          className="flex-1 border rounded-l p-2"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded-r"
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>
    </div>
  );
};

export default RAGChat;
