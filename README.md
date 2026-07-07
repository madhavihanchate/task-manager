# Task Management Web Application

A full-stack task management app built with React, Express, and MongoDB.

## Features

- User registration, login, logout with JWT authentication and bcrypt password hashing
- Create, view, edit tasks (title, description, due date, priority, status)
- Delete tasks (only allowed once a task is marked **Completed**)
- Filter and sort tasks by status, priority, and due date; search by title
- Responsive UI, REST API, input validation, centralized error handling

## Project Structure

```
task-manager/
├── backend/
│   ├── config/db.js
│   ├── controllers/authController.js
│   ├── controllers/taskController.js
│   ├── middleware/auth.js
│   ├── middleware/errorHandler.js
│   ├── models/User.js
│   ├── models/Task.js
│   ├── routes/authRoutes.js
│   ├── routes/taskRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── components/ (Navbar, TaskItem, TaskForm, FilterBar, PrivateRoute)
│   │   ├── pages/ (Login, Register, Dashboard, TaskDetails, TaskCreate, TaskEdit)
│   │   ├── context/AuthContext.js
│   │   ├── hooks/useAuth.js
│   │   ├── services/ (api.js, authService.js, taskService.js)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── Procfile
└── README.md
```

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI and JWT_SECRET
npm run dev
```

The API runs on `http://localhost:5000`.

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
# .env already points to http://localhost:5000/api
npm start
```

The app runs on `http://localhost:3000`.

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive a JWT |
| GET | /api/auth/me | Get current user (protected) |
| POST | /api/auth/logout | Logout (protected) |

### Tasks (all protected, require `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | List tasks — supports `?status=&priority=&search=&sortBy=&order=&page=&limit=` |
| POST | /api/tasks | Create a task |
| GET | /api/tasks/:id | Get a single task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task (only if status is Completed) |

## Deployment to Heroku

The included `Procfile` runs the backend, which also serves the built React
frontend when `NODE_ENV=production`.

```bash
# 1. Build the frontend
cd frontend
npm install
npm run build
cd ..

# 2. From the project root
heroku create your-app-name
heroku config:set MONGO_URI="your-mongo-atlas-uri"
heroku config:set JWT_SECRET="your-secret"
heroku config:set NODE_ENV="production"
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

Heroku will run `web: cd backend && npm start`, and `server.js` serves the
`frontend/build` folder for all non-API routes in production.

## Notes

- Passwords are hashed with bcrypt; never stored in plain text.
- JWT tokens are stored in `localStorage` on the client and attached via an
  axios interceptor.
- Deleting a task is intentionally restricted to tasks with status
  `Completed`, per the app's workflow (mark as completed, then delete).
