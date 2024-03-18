const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js');
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'dxkaffehuwye815237tgweigu'

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok')
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;


    try {
        const userdoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });

        res.json(userdoc );
    } catch (e) {
        res.status(422).json(e)
    }

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const UserDoc = await User.findOne({ email })
    if (UserDoc) {
        const passOk = bcrypt.compareSync(password, UserDoc.password)
        if (passOk) {
            jwt.sign({email:UserDoc.email, id:UserDoc._id}, jwtSecret, {}, (err,token) => {
                if(err) throw err;
                res.cookie('token',token).json('userDoc')
            })
            
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.json('not found')
    }
})

app.listen(4000);

// pwd:0YTGtVUCzh9rE7mW