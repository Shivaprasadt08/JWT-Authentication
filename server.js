require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const posts = [
    {
        username: "Shivaprasad",
        title: "post 1",
    },
    {
        username: "prasad",
        title: "post 2",
    },
    {
        username: "Shiva",
        title: "post 3",
    },
    {
        username: "Sai",
        title: "post 4",
    }
];

// ✅ Protected route
app.get('/posts', authenticateToken, (req, res) => {
    const userPosts = posts.filter(post => post.username === req.user.name);
    res.json(userPosts);
});


// ✅ Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

console.log("ACCESS_TOKEN_SECRET =", process.env.ACCESS_TOKEN_SECRET);
