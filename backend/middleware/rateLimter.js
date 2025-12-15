import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000,
  max: 60,
  message: {
    success: false,
    message: "Too many attempts, please try again after 1 minute."
  },
  statusCode: 429,        
  handler: (req, res, next, options) => {
    return res.status(options.statusCode).json(options.message);
  }
})