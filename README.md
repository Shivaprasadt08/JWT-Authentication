# JWT Authentication with Access and Refresh Tokens using Node.js and Express

This project demonstrates how to implement **JWT-based authentication** using **access tokens** and **refresh tokens** in a Node.js backend with two separate servers:

- `authServer.js` (port 4000) – handles login and token generation.
- `server.js` (port 3000) – hosts protected route `/posts` that requires a valid access token.

## 📁 Project Structure

project/
│
├── authServer.js # Handles login and token generation
├── server.js # Hosts protected API endpoints
├── .env # Stores JWT secrets
├── package.json
├── request.rest # VS Code REST client test file
└── README.md # You're here

---

## ⚙️ Prerequisites

- Node.js installed
- VS Code recommended (optional: install REST Client extension)
- Create a `.env` file in root with the following content:

```env
ACCESS_TOKEN_SECRET=yourAccessSecretKey
REFRESH_TOKEN_SECRET=yourRefreshSecretKey
You can generate strong secrets using:
https://generate-secret.vercel.app/32


npm install express jsonwebtoken dotenv
🖥️ Run the Servers
1. Start authServer on port 4000

npm run devstartAuth
Add to package.json scripts:


"scripts": {
  "devstartAuth": "nodemon authServer.js"
}
2. Start server on port 3000

npm run devstart
Add to package.json scripts:


"scripts": {
  "devstart": "nodemon server.js"
}
🧪 Testing API with REST Client (or Postman)
Use the request.rest file or similar requests in Postman:

🔐 Step 1: Login to Get Tokens

POST http://localhost:4000/login
Content-Type: application/json

{
  "username": "Shivaprasad"
}
📥 Response:

{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi..."
}
🔒 Step 2: Access Protected /posts Route

GET http://localhost:3000/posts
Authorization: Bearer <accessToken>
📤 Response (if token valid):


[
  {
    "username": "Shivaprasad",
    "title": "post 1"
  }
]
🔁 Step 3: Refresh Access Token
If access token expires (e.g., after 15 seconds):


POST http://localhost:4000/token
Content-Type: application/json

{
  "token": "<refreshToken>"
}
📥 Response:

{
  "accessToken": "newAccessToken..."
}
❗ Common Issues & Fixes
❌ 403 Forbidden on /posts
Make sure both servers use the same ACCESS_TOKEN_SECRET from .env

Access token may be expired – generate a new one using refresh token

Token must be passed as:


Authorization: Bearer <accessToken>
❌ 401 Unauthorized
Missing access token in the request

📌 Notes
Access Token is short-lived (15s for demo purposes)

Refresh Token can be used to get new access tokens

Tokens are signed with secrets from .env

You can increase expiresIn in authServer.js for easier testing

// Increase expiration for access token in authServer.js
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}
📚 Learn More
JWT Introduction

Express.js Docs

dotenv

✅ Author
Shivaprasad T
🎓 Final Year CSE Student
💻 MERN Stack & Java Full Stack Developer
🌐 GitHub: shivaprasadt08
