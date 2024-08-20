import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // req.userID = decoded.userID;
            req.user = await User.findById(decoded.userID).select('-password');
            next();
        } catch (error) {
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