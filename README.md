# MERN Authentication API

## Project Overview

This repository contains a MERN (MongoDB, Express, React, Node.js) authentication API. The API provides user authentication and authorization features using JWT tokens, including registration, login, fetching user details, password reset, and email-based password recovery.

## Features

* User registration with validation
* User login with JWT authentication
* Protected routes for authenticated users
* Password reset via email link
* Input validation using Joi
* Secure password hashing

## Technologies Used

* Node.js & Express.js
* MongoDB & Mongoose
* JWT (JSON Web Tokens) for authentication
* Nodemailer for sending password reset emails
* Joi for request validation
* Helmet and Compression for security and performance

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
```

2. Install dependencies:

**Frontend:**

```bash
cd frontend
npm install
```

**Backend:**

```bash
cd backend
npm install
```

3. Set up environment variables in a `.env` file:

**Backend:**

```
PORT=5050
DB_URL="mongodb://127.0.0.1:27017/test-db"
JWT_SECRET="myjwtsecret"
JWT_EXPIRES="1d"
MAIL_USER=
MAIL_PASS=
MAIL_SERVICE=
MAIL_PORT=
MAIL_HOST=
CLIENT_URL="http://localhost:5173"
```

**Frontend:**

```
VITE_BACKEND_URL=http://localhost:5050/api/v1
```

4. Start the servers:

**Frontend:**

```bash
cd frontend
npm run dev
```

**Backend:**

```bash
cd backend
npm run dev
```

## Base URL

```
http://localhost:5050/api/v1/auth
```

## API Endpoints

* **POST /register** - Register a new user
* **POST /login** - Login a user and return JWT token
* **GET /user-detail** - Get details of logged-in user (Protected)
* **POST /forgot-password** - Send password reset link to email
* **POST /reset-password/:resetToken** - Reset user password using token

## Middleware

* `authMiddleware` - Protects routes and validates JWT
* `validationMiddleware` - Validates incoming request bodies

## Postman Collection

A Postman collection (`Auth_API.postman_collection.json`) is included for easy testing of all API endpoints.

## License

This project is licensed under the MIT License.
