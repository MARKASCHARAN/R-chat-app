import { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSendMessage, username }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-input-container">
      <h1 className="username-display">{username || 'Connecting...'}</h1>
      
      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-wrapper">
          <i className="fas fa-comment input-icon"></i>
          <input
            type="text"
            className="message-input"
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!username}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!message.trim() || !username}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
