import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const onlyAdminPrivilage = asyncHandler(async (req, res, next) => {
    let role;

    role = req.user.role;

    if (role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized, this is only for admins!');
    }

});

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userID).select('-password');
            req.user = user;
            next();
        } catch (error) {
            console.log('error==>', error)
            res.status(401);
            throw new Error('Not authorized, token verification failed ' + error);
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Signed In!');
    }
});

export { protect, onlyAdminPrivilage };