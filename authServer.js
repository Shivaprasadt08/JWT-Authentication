require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

let refreshTokens = [];
app.post('/token',(req,res) =>{
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err, user) => {
     if(err) return res.sendStatus(403);
     const accessToken = generateAccessToken({name: user.name})
     res.json({accessToken : accessToken})
    })
    })
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
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Received token:", token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification error:", err.message);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}


// ✅ Protected route
app.get('/posts', authenticateToken, (req, res) => {
    const userPosts = posts.filter(post => post.username === req.user.name);
    res.json(userPosts);
});

app.delete('/logout', (req,res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
 })

// ✅ Login to generate token
app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken)
    res.json({ accessToken : accessToken, refreshToken: refreshToken });
});

// ✅ Middleware to authenticate token
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})
}

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});

console.log("ACCESS_TOKEN_SECRET =", process.env.ACCESS_TOKEN_SECRET);

