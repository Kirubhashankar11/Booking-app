const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const User = require('./models/User.js');
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)

app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}))

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res) => {
    res.json('test ok')
});

app.post('/register', async(req,res) => {
    const {name,email,password} = req.body;
    const userdoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    });

    res.json({userdoc});
})

app.listen(4000);

// pwd:0YTGtVUCzh9rE7mW