import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PAYMENT_CONSTANTS } from '../../constants/payment_constants.js';
import { initialize_transaction_and_get_payment_link } from '../../controllers/payment related/chapaController.js';

const router = express.Router();

router
    .post(PAYMENT_CONSTANTS.CHAPA_INITIALIZE_TRANSACTION, initialize_transaction_and_get_payment_link);

export default router;