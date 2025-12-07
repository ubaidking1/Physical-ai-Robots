import React, { useState } from "react";

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Add user message
    setMessages([...messages, { sender: "user", text: input }]);

    // Call backend
    const response = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    }).then((res) => res.json());

    // Add bot response
    setMessages((prev) => [...prev, { sender: "bot", text: response.reply }]);
    setInput("");
  };

  return (
    <>
      <div className={styles.chatButton} onClick={() => setOpen(!open)}>
        💬 Chat
      </div>

      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            AI Assistant
            <span className={styles.closeButton} onClick={() => setOpen(false)}>
              ✖
            </span>
          </div>
          <div className={styles.chatBody}>
            {messages.map((m, i) => (
              <div key={i} className={m.sender === "user" ? styles.userMsg : styles.botMsg}>
                {m.text}
              </div>
            ))}
          </div>
          <div className={styles.chatInput}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
