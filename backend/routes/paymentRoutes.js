import express from 'express'
import { protectRoute } from '../middleware/authMiddleware.js';
import { checkoutSuccess, createCheckoutSession } from '../controllers/paymentController.js';

const router = express.Router();

router.post("/create-checkout-session",protectRoute,createCheckoutSession )
router.post("/checkout-success", protectRoute,checkoutSuccess )


export default router;