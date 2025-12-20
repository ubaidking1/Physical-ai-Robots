import React, { useState, useEffect } from 'react';

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
      <button
        onClick={toggleWidget}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#2563eb',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Chat
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        width: '380px',
        height: '520px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px',
        background: 'white', // Using a generic white for now
        border: '1px solid #e0e0e0', // Generic border
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Chat with us</h2>
        <button
          onClick={toggleWidget}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#333',
          }}
        >
          &times;
        </button>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingBottom: '8px',
          borderTop: '1px solid #eee',
          paddingTop: '10px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              maxWidth: '80%',
              fontSize: '14px',
              lineHeight: '1.4',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#3b82f6' : '#f0f0f0',
              color: msg.sender === 'user' ? 'white' : '#333',
            }}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              maxWidth: '80%',
              fontSize: '14px',
              lineHeight: '1.4',
              alignSelf: 'flex-start',
              backgroundColor: '#f0f0f0',
              color: '#333',
            }}
          >
            Thinking...
          </div>
        )}
      </div>
      <form
        onSubmit={handleSendMessage}
        style={{ display: 'flex', gap: '6px', marginTop: '8px' }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            color: '#333',
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '0 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;