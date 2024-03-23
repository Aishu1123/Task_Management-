const express = require('express');
const UserModel = require('../Model/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { blacklist } = require('../Config/blacklist');
require('dotenv').config();

const userRouter = express.Router();


// User registration
userRouter.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 6);
        const newUser = await UserModel.create({ username, email, password: hashPassword });
        res.status(201).json({ msg:"Hey! user you are registered successfully." });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// User login
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // console.log("user", user.id);
        res.json({ token });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// user logout

userRouter.get('/logout',(req,res)=> {
    const token = req.headers.authorization?.split(" ")[1];
    blacklist.push(token);
    res.status(200).send({msg:"Logout successsful"});
})

module.exports = { userRouter };
