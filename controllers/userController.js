import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import FundedUser from '../models/fundedUser.model.js';
import generateToken from '../utils/generateToken.js';
// register user
// @desc    Register a new user
// @route   POST /api/users
// @access  Public

export const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, address } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        address,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});

// const createAdminUser = asyncHandler(async (req, res, next) => {
//     const adminUserData = {
//         name: 'Ibraheem Khedir',
//         email: 'techofreact@gmail.com',
//         password: '123456',
//         role: 'admin',
//         sex: 'male'
//     };

//     const userExists = await User.findOne({ email: adminUserData.email });

//     if (userExists) {
//         res.status(400);
//         throw new Error('Admin already exists');
//     };

//     await User.create(adminUserData);
// });

// createAdminUser();

// @desc    Auth user & get token
// @route   POST /api/users/auth/login
// @access  Public

export const registerUserTobeFunded = asyncHandler(async (req, res, next) => {
    const role = req.user.role;

    if (role !== 'admin') {
        res.status(401);
        throw new Error('Only Admins can register users to be funded!');
    }

    const {
        name,
        hasFamily,
        sex,
        address,
        specificNeeds
    } = req.body;

    const funded_user = await FundedUser.create({
        name,
        hasFamily,
        sex,
        address,
        specificNeeds,
        createdBy: req.user._id
    });

    if (funded_user) {
        res.status(201).json({
            _id: funded_user._id,
            name: funded_user.name,
            hasFamily: funded_user.hasFamily,
            sex: funded_user.sex,
            address: funded_user.address,
            specificNeeds: funded_user.specificNeeds,
            createdBy: funded_user.createdBy
        });
    }

    // update the user who created the funded user to include the funded user in their list of registered funded users
    const user = await User.findById(req.user._id);
    user.registered_funded_users_by_admin.push(funded_user._id);

});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const token = req.cookies.jwt;

    if (token) {
        res.status(400);
        throw new Error('User already logged in');
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address
        });
    } else {
        res.status(401);
        throw new Error('Invalid user data');
    }

});


// logout user
// @desc    Logout user
// @route   GET /api/users/logout
// @access  Public

export const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: 'User logged out' });
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
        const user = await User.findById(req.user._id);

        if (user) {
            const { name, email, address } = req.body;
            // Update only the fields that are provided in the request body
            if (name) user.name = name;
            if (email) user.email = email;
            if (address) user.address = address;

            const updatedUser = await user.save();

            res.status(201).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                address: updatedUser.address
            });

        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        // Send the error message as a response to the client
        res.status(401);
        throw new Error('Not Authorized');
    }
});
