# DeshSainik Backend

Backend API for the DeshSainik defence exam preparation platform.

## Tech Stack
- Node.js + Express
- MongoDB (Atlas)
- JWT for auth

## Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8002
```

Run the server:
```bash
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login

### Courses
- `GET /api/courses` - Get all courses (supports pagination, search, filter, sort)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (auth required)
- `PUT /api/courses/:id` - Update course (auth required)
- `DELETE /api/courses/:id` - Delete course (auth required)

### Jobs
- `GET /api/jobs` - Get all jobs (supports pagination, search, filter, sort)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (auth required)
- `PUT /api/jobs/:id` - Update job (auth required)
- `DELETE /api/jobs/:id` - Delete job (auth required)

## Query Parameters

For courses and jobs listing:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search in title/description
- `category` - Filter by category
- `sortBy` - Field to sort by
- `sortOrder` - asc or desc

Example:
```
GET /api/courses?page=1&limit=10&search=NDA&category=SSB&sortBy=price&sortOrder=asc
```

## Folder Structure
```
backend/
├── controllers/    # Request handlers
├── models/         # MongoDB schemas
├── routes/         # API routes
├── middlewares/    # Auth middleware
├── config/         # DB config
└── server.js       # Entry point
```
