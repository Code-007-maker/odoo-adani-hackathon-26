# Odoo x Adani University Hackathon 2026

## Team Details
- Team Name: Xcalibur
- Team Leader: Arbaj Khan
- Members:
  - Mitul Rishi
  - Dhruv Kanojia
  - Hassan Khan

 
# 🛠️ GearGuard – Smart Maintenance Management System

GearGuard is a full-stack **maintenance management platform** designed to streamline equipment maintenance workflows in industrial environments.  
It enables employees to raise maintenance requests, managers to assign technicians, and teams to track work through Kanban boards and calendar scheduling.

Built for **speed, clarity, and real-world usability**, GearGuard supports role-based access, secure authentication, and modern UI interactions.

---

## 🚀 Features

### 👥 Role-Based Access
- **Employee**
  - Create maintenance requests
  - View request status
- **Manager**
  - Assign technicians & teams
  - Schedule maintenance
  - Change status (Kanban)
- **Technician**
  - View assigned work
  - Track progress

---

### 🧾 Maintenance Request System
- Corrective Maintenance (breakdown fixes)
- Preventive Maintenance (scheduled tasks)
- Priority levels: Low / Medium / High
- Equipment & category selection
- Internal notes & instructions

---

### 📋 Kanban Board
- Drag & drop workflow
- Statuses:
  - New
  - In Progress
  - Repaired
  - Scrap
- Manager-only assignment via dialog
- Real-time UI updates

---

### 📅 Calendar View
- Scheduled maintenance visualization
- Technician workload overview
- Date & time based planning

---

### 🔐 Authentication & Security
- JWT based authentication
- Access & Refresh tokens
- HTTP-only cookies
- Secure password hashing (bcrypt)
- Role & permission checks

---

## 🧠 Tech Stack

### Frontend
- **React + Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide Icons**
- React Router
- Context API (Auth & User)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **bcrypt**
- **Multer** (file handling)
- Cookie-based auth

---


---

## 🔄 Application Flow

1. **Employee** logs in and creates a maintenance request
2. Request appears in **Kanban → New**
3. **Manager** assigns technician via dialog
4. Status moves to **In Progress**
5. Work completion updates status to **Repaired** or **Scrap**
6. Preventive tasks appear in **Calendar**


## ⚙️ Environment Variables

Create a `.env` file in backend:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gearguard
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
NODE_ENV=development
```


🧩 Key Highlights
Clean UI inspired by real industrial dashboards
Secure cookie-based authentication
Role-aware UI rendering
Scalable backend architecture
Hackathon-ready project

🏆 Use Cases
Manufacturing plants
Industrial facilities
IT infrastructure maintenance
Smart factories
Campus or facility management

👨‍💻 Team Contribution
Frontend: UI/UX, Kanban, Calendar, Forms
Backend: Auth, JWT, Models, APIs
System Design: Workflow & role logic

📌 Future Enhancements
Real-time updates (WebSockets)
Email / WhatsApp notifications
Analytics dashboard
Mobile app
Equipment history & logs

📄 License
This project is developed for hackathon & educational purposes.

