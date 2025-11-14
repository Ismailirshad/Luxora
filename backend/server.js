import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js'
import connectDB from './config/db.js';
import cors from 'cors';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));


app.use(express.json({limit: '10mb'}));
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupons", couponRoutes )
app.use("/api/payments", paymentRoutes )
app.use("/api/analytics",analyticsRoutes)

app.listen(PORT, () => {
    console.log('server is running on http://localhost:'+PORT)
    connectDB();
})