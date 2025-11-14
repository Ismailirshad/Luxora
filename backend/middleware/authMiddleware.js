import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from '../models/User.js';

dotenv.config();

export const protectRoute = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    //  fetching user from database
    const user = await User.findById(tokenDecode.id).select('-password');

    if (!user) {
      return res.status(400).json({ message: "user not found" })
    }
    req.user = user;

    next();
  } catch (error) {
    console.error('Error in middleware:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const adminRoute = async (req,res,next) => {
  if(req.user && req.user.role === "admin"){
    next();
  }else{
    return res.status(401).json({message:"Access denied - Admin only"})
  }
}

