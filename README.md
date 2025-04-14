# DayMate ✅☀️🗓️  
**Your all-in-one productivity companion!**

![Screenshot (31)](https://github.com/user-attachments/assets/9a5411f4-6a74-4e1d-9bc6-fb01770cb4d8)

## Overview  
DayMate is a **Single Page Application (SPA)** designed to help users stay organized and efficient. It integrates three essential productivity tools:  

- **✅ To-Do List App** – Manage tasks with ease.  
- **☀️ Weather App** – Stay updated with real-time weather information.  
- **📅 Calendar** – Keep track of important dates and events.  

Before accessing these features, users can sign in using **Google authentication** or their **email and password**.  

## Tech Stack  
DayMate is built using modern web technologies to ensure performance, scalability, and a great user experience:  

### 🔹 Frontend  
- **Tailwind CSS** – Utility-first styling for a sleek and responsive design.
- **JavaScript** – The backbone of dynamic functionality. 
- **React.js** – A powerful library for building interactive UIs.    
- **Material UI** – Pre-designed components for a polished look.  

### 🔹 Backend  
- **Django** – A high-level Python web framework for handling server-side logic.  
- **Django REST Framework (DRF)** – API development and authentication management.  
- **PostgreSQL** – A reliable and scalable relational database.  

### 🔹 Additional Tools  
- **Docker** – Containerization for seamless deployment.  
- **Postman** – API testing and development.  

## Installation & Setup  
To run DayMate locally, follow these steps:  

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/daymate.git
cd daymate
```

### 2️⃣ Set Up the Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3️⃣ Set Up the Frontend (React)
```bash
cd frontend
npm install
npm start
```

### 4️⃣ Docker (Optional)
```bash
docker-compose up --build
```

## Features  
✔️ **User Authentication** – Login via Google or email/password.  
✔️ **To-Do List** – Add, edit, and delete tasks.  
✔️ **Weather App** – Get real-time weather updates.  
✔️ **Calendar** – Organize and plan events.  
✔️ **Modern UI** – A clean, responsive interface using Tailwind and Material UI.
