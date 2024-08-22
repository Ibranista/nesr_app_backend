import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { loginUser, getUserProfile, logoutUser, registerUser, updateUserProfile, registerUserTobeFunded } from '../controllers/userController.js';
import { AUTH_ROUTE_NAMES } from '../constants/auth.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router
    .post(AUTH_ROUTE_NAMES.LOGIN, loginUser)
    .post('/', loginUser)
    .post(AUTH_ROUTE_NAMES.LOGOUT, logoutUser)
    .post(AUTH_ROUTE_NAMES.REGISTER, registerUser)
    .post(AUTH_ROUTE_NAMES.REGISTER_USER_TO_BE_FUNDED, protect, registerUserTobeFunded)
    .route(AUTH_ROUTE_NAMES.PROFILE)
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
