import express from 'express';
import { getProfile, login, logout, signup } from '../controllers/authController.js';
import { protectRoute } from '../middleware/authMiddleware.js';
import { rateLimiter } from '../middleware/rateLimter.js';

const router = express.Router();
router.use(rateLimiter);
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout",protectRoute, logout)
router.get("/profile", protectRoute, getProfile);

export default router;