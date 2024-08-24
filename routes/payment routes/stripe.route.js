import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PAYMENT_CONSTANTS } from '../../constants/payment_constants.js';
import { confirm_payment, create_payment_intent, serve_publishable_key, serve_static } from '../../controllers/payment related/stripeController.js';

const router = express.Router();

router
    .get(PAYMENT_CONSTANTS.STRIPE_STATIC, serve_static)
    .get(PAYMENT_CONSTANTS.STRIPE_CONFIG, serve_publishable_key)
    .post(PAYMENT_CONSTANTS.STRIPE_PAYMENT_INTENT, create_payment_intent)
    .post(PAYMENT_CONSTANTS.STRIPE_CONFIRM_PAYMENT, confirm_payment);
export default router;