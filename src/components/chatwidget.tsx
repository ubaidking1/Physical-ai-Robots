import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const BACKEND_URL = "http://localhost:8000/api/chat";

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const removeTyping = () => {
    setMessages((prev) => prev.filter((m) => m.text !== "Bot is typing..."));
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: userText,
        sender: "user",
      },
      {
        id: crypto.randomUUID(),
        text: "Bot is typing...",
        sender: "bot",
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      removeTyping();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: data.reply || "No reply from server",
          sender: "bot",
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);

      removeTyping();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: "❌ Server error. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: msg.sender === "user" ? "#3b82f6" : "#1f2937",
              color: msg.sender === "user" ? "#fff" : "#e5e7eb",
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: 400,
    height: 500,
    borderRadius: 12,
    background: "#111827",
    padding: 16,
    display: "flex",
    flexDirection: "column",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 10,
  },
  message: {
    padding: "10px 14px",
    borderRadius: 12,
    maxWidth: "75%",
    fontSize: 14,
    wordBreak: "break-word",
  },
  inputBox: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: "12px 0 0 12px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "0 16px",
    borderRadius: "0 12px 12px 0",
    border: "none",
    background: "#2563eb",
    color: "#fff",
  },
};
