import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the backend server
    const socketInstance = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
    });

    socketInstance.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setError(null);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Failed to connect to server. Please make sure the backend is running.');
      setIsConnected(false);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socketInstance.on('receive-messages', (data) => {
      const { chatHistory, username: receivedUsername } = data || {};
      if (receivedUsername !== undefined) {
        setUsername(receivedUsername);
      }
      if (chatHistory) {
        setMessages(chatHistory);
      }
    });

    socketRef.current = socketInstance;

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = (message) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('post-message', { message });
    }
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="chat-header">
          <h2 className="chat-title">Chat Window</h2>
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{error}</span>
            </div>
          )}
          {!isConnected && !error && (
            <div className="connecting-message">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Connecting...</span>
            </div>
          )}
        </div>
        
        <ChatWindow messages={messages} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} username={username} />
    </div>
  );
}

export default App;
