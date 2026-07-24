# 🛡️ Raksha - Women Safety & Emergency Assistance Platform

<p align="center">


![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-RealTime-black?logo=socket.io)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

## 📌 Overview

Raksha is a **full-stack Women Safety & Emergency Assistance Platform** built to provide quick emergency response through a single SOS button.

When a user sends an emergency alert, the platform instantly shares their live location with nearby verified volunteers. Administrators can monitor incidents, verify volunteers, and manage emergency responses in real time.

The project focuses on **speed, safety, and real-time coordination**.

---

# ✨ Features

## 👤 User Module

- Secure JWT Authentication
- Emergency SOS Button
- Live Location Sharing
- Trusted Emergency Contacts
- Alert History
- Real-time SOS Status
- Profile Dashboard

---

## 🚑 Volunteer Module

- Volunteer Registration
- Admin Verification
- Receive Nearby SOS Alerts
- Accept Emergency Requests
- Real-time Notifications
- Live Incident Updates using Socket.io

---

## 🛡️ Admin Module

- Admin Dashboard
- Verify Volunteers
- View Registered Users
- Monitor Live Incidents
- Alert Statistics
- Coordination Dashboard

---

# 🚀 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- Socket.io Client

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io

---

# 📂 Project Structure

```
raksha-frontend/
│
├── public/
│
├── screenshots/
│   ├── landing.png
│   ├── signup.png
│   ├── user-dashboard.png
│   ├── volunteer-dashboard.png
│   └── admin-dashboard.png
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── api.js
│   ├── socket.js
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

<h2>🏠 Landing Page</h2>

<p align="center">
<img src="./Screenshot 2026-07-23 at 23.30.12.png" width="900">
</p>

<h2>👤 User Dashboard</h2>

<p align="center">
<img src="./Screenshot%202026-07-23%20at%2023.31.03.png" width="900">
</p>

<h2>🚑 Volunteer Dashboard</h2>

<p align="center">
<img src="./Screenshot%202026-07-23%20at%2023.31.24.png" width="900">
</p>

<h2>🛡️ Admin Dashboard</h2>

<p align="center">
<img src="./Screenshot%202026-07-23%20at%2023.31.45.png" width="900">
</p>

<p align="center">
  <img src="./alert-workflow.png" alt="How an Alert Moves" width="900"/>
</p>



# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/ganeshcoder05/raksha-frontend.git
```

## Open Folder

```bash
cd raksha-frontend
```

## Install Packages

```bash
npm install
```

## Run Project

```bash
npm run dev
```

Application will start at

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside the project root.

```env
VITE_API_URL="https://raksha-backend-0s10.onrender.com"
```

---

# 🔄 Workflow

```
User
   │
   ▼
Press SOS
   │
   ▼
Live Location Shared
   │
   ▼
Nearby Verified Volunteers
   │
   ▼
Volunteer Accepts Alert
   │
   ▼
Admin Monitors Incident
   │
   ▼
Emergency Resolved
```

---

# 🎯 Future Improvements

- 📍 Google Maps Integration
- 📱 Progressive Web App (PWA)
- 📩 SMS Alerts
- 📧 Email Notifications
- 🔔 Push Notifications
- ☎ Emergency Calling
- 🤖 AI-based Risk Detection
- 📊 Analytics Dashboard

---

# 📈 Project Highlights

- Full Stack MERN Application
- Real-time Communication using Socket.io
- Role Based Authentication
- JWT Authorization
- Responsive UI
- Dark Theme Dashboard
- Emergency Response Workflow
- Clean Component Architecture

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

## Ganesh Verma

📧 Email:
vermaganesh753@gmail.com

🔗 GitHub

https://github.com/ganeshcoder05

🔗 LinkedIn

https://www.linkedin.com/in/ganesh-verma-4b08b6315/

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.

---

<p align="center">

Made with ❤️ by **Ganesh Verma**

</p>
