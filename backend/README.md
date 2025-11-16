# Backend API

This is a simple authentication backend built with Express.js, JWT, and bcrypt.

## Features

- User signup
- User login
- JWT-based authentication
- Password hashing with bcrypt
- File-based user storage (users.json)

## Installation

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

### Development
```
npm run dev
```

### Production
```
npm start
```

The server will run on port 5000 by default.

## API Endpoints

### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### POST /api/auth/login
Login an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### GET /api/auth/profile
Get user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "user": {
    "userId": "user_id",
    "email": "user@example.com"
  }
}
```

## Security Notes

- In production, use environment variables for JWT_SECRET and other sensitive data.
- Consider using a proper database instead of file storage for production.
- Implement rate limiting and input validation for better security.
