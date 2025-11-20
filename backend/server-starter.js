import { uniqueNamesGenerator, colors, names } from "unique-names-generator";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());

// Serve React app in production or legacy frontend in development
const clientBuildPath = path.join(__dirname, "../client/dist");
const legacyFrontendPath = path.join(__dirname, "../frontend");

app.use(express.static(clientBuildPath));
app.use(express.static(legacyFrontendPath));

const chatHistory = [];

io.on("connection", function callback(socket) {
  const username = getUniqueUsername();
  console.log(`${username} connected`);

  socket.emit("receive-messages", {
    chatHistory: getAllMessages(),
    username,
  });

  socket.on("post-message", function receiveMessages(data) {
    const { message } = data || { message: "" };
    console.log(message);
    chatHistory.push({
      username,
      message,
    });

    io.emit("receive-messages", {
      chatHistory: getAllMessages(),
    });
  });

  socket.on("disconnect", () => {
    console.log(`${username} disconnected`);
  });
});

app.get("/", (req, res) => {
  // Try to serve the React app first, fall back to legacy frontend
  const reactIndexPath = path.join(clientBuildPath, "index.html");
  const legacyIndexPath = path.join(legacyFrontendPath, "index.html");
  
  res.sendFile(reactIndexPath, (err) => {
    if (err) {
      res.sendFile(legacyIndexPath);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
    
});

function getAllMessages() {
  return Array.from(chatHistory).reverse();
}

function getUniqueUsername() {
  return uniqueNamesGenerator({
    dictionaries: [names, colors],
    length: 2,
    style: "capital",
    separator: " ",
  });
}
