import Coupon from "../models/coupon.js";
import Order from "../models/order.js";
import { stripe } from "../config/stripe.js";
import User from "../models/User.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;
        // checks if the products is in array 
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }

        let totalAmount = 0;

        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100)
            totalAmount += amount * product.quantity

            return {
                price_data: {
                    currency: "aed",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount
                },
                quantity: product.quantity || 1,
            };
        });

        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
            if (coupon) {
                totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100);
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: coupon ? [
                {
                    coupon: await createStripeCoupon(coupon.discountPercentage),
                },
            ]
                : [],
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode || "",
                products: JSON.stringify(
                    products.map((p) => ({
                        _id: p._id.toString(),
                        quantity: p.quantity,
                        price: p.price,
                    }))
                )
            }
        });

        if (totalAmount >= 20000) {
            await createNewCoupon(req.user._id)
        }
        res.status(200).json({ url: session.url, totalAmount: totalAmount / 100 })
    } catch (error) {
        console.error("Error in createCheckoutSession:", error);
        res.status(500).json({ error: error.message });
    }

}


export const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
        if (existingOrder) {
            return res.status(200).json({
                success: true,
                message: "Order already processed",
                orderId: existingOrder._id,
            });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate(
                    {
                        code: session.metadata.couponCode,
                        userId: session.metadata.userId,
                    },
                    {
                        isActive: false,
                    }
                );
            }

            //create a new order
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user: session.metadata.userId,
                products: products.map((product) => ({
                    product: product._id,
                    quantity: product.quantity,
                    price: product.price,
                })),
                totalAmount: session.amount_total / 100,
                stripeSessionId: sessionId,
            });

            await newOrder.save();
            // Clear user's cart in the database
            await User.findByIdAndUpdate(session.metadata.userId, { cartItems: [] });
            res.status(201).json({ success: true, message: "Order created successfully", orderId: newOrder._id })
        }
    } catch (error) {
        console.log("Error in processing successfull checkout", error);
        res.status(500).json({ message: "Error processing successful checkout", error: error.message });
    }
};



async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    });
    return coupon.id;
}

async function createNewCoupon(userId) {
    await Coupon.findOneAndDelete({ userId });

    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: userId
    })

    await newCoupon.save();

    return newCoupon;
}