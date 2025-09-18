import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import boardRoutes from "./routes/boardRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import listRoutes from "./routes/listRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/boards", boardRoutes);
// Middleware for request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Request validation middleware (example for common validations)
const validateRequest = (req, res, next) => {
    // Add common validation logic here
    if (req.body && Object.keys(req.body).length > 0) {
        // Basic sanitization
        for (let key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].trim();
            }
        }
    }
    next();
};

app.use(validateRequest);

// Rate limiting middleware for scalability
const rateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
    const requests = new Map();
    
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        const windowStart = now - windowMs;
        
        if (!requests.has(ip)) {
            requests.set(ip, []);
        }
        
        const requestTimes = requests.get(ip).filter(time => time > windowStart);
        
        if (requestTimes.length >= max) {
            return res.status(429).json({ error: 'Too many requests' });
        }
        
        requestTimes.push(now);
        requests.set(ip, requestTimes);
        next();
    };
};

app.use(rateLimit());

app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// To fix the error "SyntaxError: The requested module '../index.js' does not provide an export named 'default'",
// you need to export something as default from this file. For an Express app, it's common to export the app instance.

export default app;
