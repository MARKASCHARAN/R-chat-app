const socket = io();

const messagesEl = document.getElementById("messages");
const formEl = document.getElementById("chat-form");
const inputEl = document.getElementById("message-input");
const usernameBadgeEl = document.getElementById("username-badge");
const typingIndicatorEl = document.getElementById("typing-indicator");

let myUsername = "";
let typingTimeout = null;

// Initial data from server
socket.on("init", (data) => {
  myUsername = data.username;
  usernameBadgeEl.textContent = myUsername;

  messagesEl.innerHTML = "";
  (data.messages || []).forEach(addMessage);
  scrollToBottom();
});

socket.on("chat-message", (msg) => {
  addMessage(msg);
  scrollToBottom();
});


socket.on("system-message", (data) => {
  addSystemMessage(data.text);
  scrollToBottom();
});


socket.on("typing", () => {
  typingIndicatorEl.classList.remove("hidden");

  if (typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    typingIndicatorEl.classList.add("hidden");
  }, 1200);
});


formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;

  socket.emit("chat-message", text);
  inputEl.value = "";
});

// Emit typing event on input
inputEl.addEventListener("input", () => {
  socket.emit("typing");
});


function addMessage({ username, text, timestamp }) {
  const isMe = username === myUsername;
  const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString() : "";

  const wrapper = document.createElement("div");
  wrapper.className = `flex ${isMe ? "justify-end" : "justify-start"}`;

  const bubble = document.createElement("div");
  bubble.className =
    "max-w-xs px-3 py-2 rounded-2xl text-white text-sm shadow " +
    (isMe
      ? "bg-indigo-600 rounded-br-none"
      : "bg-gray-700 rounded-bl-none");

  bubble.innerHTML = `
    <div class="flex items-center justify-between space-x-2">
      <span class="font-semibold text-xs opacity-80">${username}</span>
      <span class="text-[10px] opacity-70">${timeStr}</span>
    </div>
    <div class="mt-1 break-words">${escapeHtml(text)}</div>
  `;

  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);
}

function addSystemMessage(text) {
  const el = document.createElement("div");
  el.className = "text-center text-xs text-gray-400 italic";
  el.textContent = text;
  messagesEl.appendChild(el);
}

function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
