# Random Chat App - Full Stack React Application

A real-time chat application built with React, Node.js, Express, and Socket.IO. This is a fully working full-stack website that allows multiple users to connect and chat in real-time.

## Features

- 🚀 **Modern React Frontend**: Built with React 19 and Vite for blazing-fast development
- 💬 **Real-time Communication**: Socket.IO for instant message delivery
- 🎨 **Beautiful UI**: Clean, responsive design with Tailwind CSS and custom styling
- 👤 **Auto-generated Usernames**: Unique username generation for each user
- 🔄 **Live Updates**: Messages appear instantly for all connected users
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Build**: Lightning-fast HMR (Hot Module Replacement) with Vite

## Tech Stack

### Frontend
- **React 19**: Latest version with modern hooks
- **Vite**: Next-generation frontend tooling
- **Socket.IO Client**: Real-time WebSocket communication
- **CSS**: Custom styling with modern CSS features
- **Font Awesome**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **Socket.IO**: Real-time bidirectional event-based communication
- **CORS**: Cross-Origin Resource Sharing enabled
- **unique-names-generator**: Auto-generate unique usernames

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MARKASCHARAN/R-chat-app.git
cd R-chat-app
```

2. Install root dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
cd ..
```

## Running the Application

### Development Mode (Recommended)

Run both the server and client concurrently:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3000
- React frontend on http://localhost:5173

### Run Server Only
```bash
npm run server
```

### Run Client Only
```bash
npm run client
```

### Production Mode

1. Build the React app:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

## Project Structure

```
R-chat-app/
├── backend/
│   └── server-starter.js      # Express + Socket.IO server
├── client/                     # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── ChatWindow.css
│   │   │   ├── ChatInput.jsx
│   │   │   └── ChatInput.css
│   │   ├── App.jsx            # Main App component
│   │   ├── App.css
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── index.html
│   ├── vite.config.js         # Vite configuration
│   └── package.json
├── frontend/                   # Legacy vanilla JS frontend
│   ├── index.html
│   ├── script.js
│   └── style.css
├── package.json
└── README.md
```

## How It Works

1. **Connection**: When a user opens the app, the client establishes a WebSocket connection to the server
2. **Username Assignment**: The server generates a unique username for each user
3. **Message Sending**: Users type messages and click send
4. **Broadcasting**: The server receives messages and broadcasts them to all connected clients
5. **Real-time Updates**: All users see new messages instantly

## API / Socket Events

### Client → Server
- `post-message`: Send a new message to the chat
  ```javascript
  socket.emit('post-message', { message: 'Hello!' });
  ```

### Server → Client
- `receive-messages`: Receive chat history and username
  ```javascript
  socket.on('receive-messages', (data) => {
    // data = { chatHistory: [...], username: 'John Blue' }
  });
  ```

## Configuration

### CORS Settings
The backend allows connections from:
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (Backend server)

To add more origins, edit `backend/server-starter.js`:
```javascript
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000", "your-domain.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
```

## Scripts

- `npm run dev` - Run both server and client in development mode
- `npm run server` - Run only the backend server
- `npm run client` - Run only the React client
- `npm run build` - Build the React app for production
- `npm start` - Start the server in production mode
- `npm run serve` - Run server with nodemon (legacy)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use:
- Stop the process using that port
- Or change the port in the respective config files

### Connection Issues
- Make sure both server and client are running
- Check browser console for errors
- Verify CORS settings in backend

### Build Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Author

MARKASCHARAN

## Acknowledgments

- Socket.IO for real-time communication
- React team for the amazing framework
- Vite for the build tool
- unique-names-generator for username generation
