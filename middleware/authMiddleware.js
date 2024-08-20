import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // req.userID = decoded.userID;
            const user = await User.findById(decoded.userID).select('-password');
            req.user = user;
            next();
        } catch (error) {
            console.log('error==>', error)
            res.status(401);
            throw new Error('Not authorized, token verification failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, token missing');
    }
});

export { protect };