import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/userController.js';
import { AUTH_ROUTE_NAMES } from '../constants/auth.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router
    .post(AUTH_ROUTE_NAMES.AUTH, authUser)
    .post('/', authUser)
    .post(AUTH_ROUTE_NAMES.LOGOUT, logoutUser)
    .post(AUTH_ROUTE_NAMES.REGISTER, registerUser)
    .route(AUTH_ROUTE_NAMES.PROFILE)
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
