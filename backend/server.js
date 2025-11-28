// backend/server.js
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const { uniqueNamesGenerator, colors, animals } = require("unique-names-generator");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messages = []; // { username, text, timestamp }
const users = new Map(); // socket.id -> username

// Serve frontend
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Socket.io logic
io.on("connection", (socket) => {
  const username = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: " ",
    style: "capital",
  });

  users.set(socket.id, username);
  console.log(`${username} connected`);

  // Send initial data to this user
  socket.emit("init", {
    username,
    messages,
    users: Array.from(users.values()),
  });

  // Notify others that someone joined
  socket.broadcast.emit("system-message", {
    text: `${username} joined the chat`,
    users: Array.from(users.values()),
  });

  // When user sends a message
  socket.on("chat-message", (text) => {
    if (!text || !text.trim()) return;

    const msg = {
      username,
      text: text.trim(),
      timestamp: Date.now(),
    };

    messages.push(msg);
    if (messages.length > 100) messages.shift(); // keep last 100

    io.emit("chat-message", msg);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    users.delete(socket.id);
    console.log(`${username} disconnected`);

    socket.broadcast.emit("system-message", {
      text: `${username} left the chat`,
      users: Array.from(users.values()),
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
