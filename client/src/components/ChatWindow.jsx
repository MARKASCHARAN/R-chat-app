import { useEffect, useRef } from 'react';
import './ChatWindow.css';

function ChatWindow({ messages }) {
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window" ref={chatWindowRef}>
      {messages.length === 0 ? (
        <div className="empty-state">
          <p className="text-gray-400">No messages yet. Start chatting!</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="message-container">
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
            <p className="message-text">
              <span className="username">{msg.username}</span>: {msg.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ChatWindow;
