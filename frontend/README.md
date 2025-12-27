# 📚 Library Management System

A full-stack Library Management System built using:

- **Django + Django REST Framework** for the backend API
- **React + Vite + Tailwind CSS** for the frontend

The backend exposes REST APIs, while the frontend consumes them for managing library resources.

---

<p align="center">
  <img src="public\screenshot01.png" alt="Library System UI" width="900">
</p>


## 📂 Project Structure

```
library-system/
│
├── backend/        # Django backend API
└── frontend/       # React frontend using Vite + Tailwind
```

---

## 🛠 Prerequisites

Before running the project, install:

- Python 3.9 or higher
- Node.js (LTS recommended)
- Git

---

## 🚀 Backend Setup (Django + DRF)

### Step 1 — go to backend folder

```bash
cd backend
```

### Step 2 — create virtual environment

Windows:

```bash
python -m venv venv
```

Mac/Linux:

```bash
python3 -m venv venv
```

### Step 3 — activate virtual environment

Windows:

```bash
venv\Scripts\activate
```

Mac/Linux:

```bash
source venv/bin/activate
```

### Step 4 — install backend dependencies

```bash
pip install -r requirements.txt
```

### Step 5 — run migrations

```bash
python manage.py migrate
```

### Step 6 — start backend server

```bash
python manage.py runserver
```

Backend will be available at:

```
http://127.0.0.1:8000
```

---

## 💻 Frontend Setup (React + Vite + Tailwind)

### Step 1 — go to frontend folder

```bash
cd frontend
```

### Step 2 — install node modules

```bash
npm install
```

### Step 3 — run development server

```bash
npm run dev
```

Frontend usually runs at:

```
http://localhost:5173
```

---

## 🔗 Connecting Frontend & Backend

Use this backend base URL in API calls:

```
http://127.0.0.1:8000
```

Example Axios request:

```javascript
axios.get("http://127.0.0.1:8000/api/books/");
```

---


