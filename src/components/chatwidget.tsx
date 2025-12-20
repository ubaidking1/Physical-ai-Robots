
import React, { useState, useEffect } from 'react';
import styles from './chatwidget.module.css';

// Mock API function to simulate a chatbot response
const getBotResponse = (message: string): Promise<{ text: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ text: `You said: "${message}". This is a mock response.` });
    }, 500);
  });
};

const ChatWidget = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ text: "Hello! I'm a friendly chatbot. How can I help you?", sender: 'bot' }]);
    }
  }, [isOpen]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await getBotResponse(inputValue);
      const botMessage = { text: botResponse.text, sender: 'bot' as const };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'Sorry, something went wrong.', sender: 'bot' as const };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button onClick={toggleWidget} className={styles.chatButton} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        Chat
      </button>
    );
  }

  return (
    <div className={styles.chatWidget}>
      <div className={styles.chatHeader}>
        <h2>Chat with us</h2>
        <button onClick={toggleWidget} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
      </div>
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.chatBubble} ${styles[msg.sender]}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className={`${styles.chatBubble} ${styles.bot}`}>Thinking...</div>}
      </div>
      <form onSubmit={handleSendMessage} className={styles.chatInputBox}>
        <input
          type="text"
          className={styles.chatInput}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button type="submit" className={styles.chatButton} disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;
