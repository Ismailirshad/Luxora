import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(500).send({message:"User already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPassword });

        // authenticate 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        })

        const { _id } = user;
        res.status(201).json({ message: "User created successfully", user: { _id, name, email } }) //removed password from response for security purpose
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const login = async (req, res) => {
    try {
        // checks if the user already loggedIn 
        const { email, password } = req.body;
        const { token } = req.cookies;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const existingUser = await User.findById(decoded.id);
                if (existingUser && existingUser.email === email) {
                    return res.status(200).json({ message: "User already logged in" })
                }
            } catch (error) {
                console.log("Invalid or expired token ");
            }
        }

        const user = await User.findOne({ email })
        if (!user) return res.status(404).send({message:"User does not exists"});
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(400).json({message:"Invalid Credentials"});

        // Generating the token for the user
        const newtoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', newtoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        })

        res.status(200).json({ message: "User logged in successfully",user })    
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
        });
        res.status(200).json({ message: "User logged out successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
        res.send("logout failed");
    }

}

export const getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({message:"Server error", error: error.message});
    }
}