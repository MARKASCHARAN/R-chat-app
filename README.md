# 🗣️ Anonymous Random Chat App

A real-time **anonymous chat application** where users instantly connect with strangers.  
Each user receives an auto-generated username like **Blue Falcon** or **Red Tiger**, and they can start chatting immediately — **no login required**.

Built using **Node.js**, **Express**, **Socket.io**, and **TailwindCSS**.

---

## 🚀 Features

- 🔥 **Instant real-time chat** using Socket.io  
- 🎭 **Anonymous usernames** (auto-generated with unique-names-generator)  
- 💬 **Typing indicator**  
- 👋 **User joined / User left notifications**  
- 📜 **Auto-scroll to latest message**  
- 🧊 **Modern glass-morphism UI**  
- ⚡ Extremely lightweight  
- 🛜 **Works instantly — no signup, no login**

---

## 📂 Project Structure

R-chat-app/
├── backend/
│ ├── server.js
│ └── package.json
└── frontend/
├── index.html
└── script.js

yaml
Copy code

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd R-chat-app
2️⃣ Install Backend Dependencies
bash
Copy code
cd backend
npm install
Installed Packages:

express

socket.io

unique-names-generator

3️⃣ Run the Backend Server
bash
Copy code
node server.js
You should see:

arduino
Copy code
Server running at http://localhost:3000
4️⃣ Open the Frontend
You can simply open:

bash
Copy code
frontend/index.html