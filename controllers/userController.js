// register user
// @desc    Register a new user
// @route   POST /api/users
// @access  Public

export const registerUser = asyncHandler(async (req, res, next) => {
    try {
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        // Send the error message as a response to the client
        res.status(401);
        throw new Error('Not Authorized');
    }
});

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public

import asyncHandler from 'express-async-handler';

export const authUser = asyncHandler(async (req, res, next) => {
    try {
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        // Send the error message as a response to the client
        res.status(401);
        throw new Error('Not Authorized');
    }
});


// logout user
// @desc    Logout user
// @route   GET /api/users/logout
// @access  Public

export const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        // Send the error message as a response to the client
        res.status(401);
        throw new Error('Not Authorized');
    }
});

// get user profile

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

export const getUserProfile = asyncHandler(async (req, res, next) => {
    try {
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        // Send the error message as a response to the client
        res.status(401);
        throw new Error('Not Authorized');
    }
});

// update user profile

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

export const updateUserProfile = asyncHandler(async (req, res, next) => {
    try {
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        // Send the error message as a response to the client
        res.status(401);
        throw new Error('Not Authorized');
    }
});
