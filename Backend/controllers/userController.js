const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const createToken = (_id) => {
return jwt.sign(
    {_id}, 
    process.env.JWT_SECRET,
     {expiresIn: "3d"})
}



// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if fields are empty
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid password" });
    }

    // Generate token
    const token = createToken(user._id);

    // If login is successful, send token with response
    res.status(200).json({ 
        message: "Login successful!", 
        user,
        token
    });
};


// Signup user
const signup = async (req, res) => {
    const { email, password } = req.body;

    // Check if fields are empty
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate strong password (at least 6 characters, no number requirement)
    if (!validator.isStrongPassword(password, { minLength: 6, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 })) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ email, password: hashedPassword });

    try {
        await user.save();

        // Generate a token after the user is saved
        const token = createToken(user._id);

        res.status(201).json({
            message: "User registered successfully!",
            user,
            token // Send token as part of the response
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginUser,
    signup,
}