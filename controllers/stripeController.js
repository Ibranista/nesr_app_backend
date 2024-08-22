import Stripe from 'stripe';
import path from 'path';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const serve_static = (req, res) => {
    const Path = path.resolve(process.env.STATIC_DIR + '/index.html');
    res.sendFile(Path);
}

export const serve_publishable_key = (req, res) => {
    res.send({
        publishablekey: process.env.STRIPE_PUBLISHABLE_KEY
    })
}

export const create_payment_intent = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount || 2000,
            currency: currency || 'usd',
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
            headers: req.headers
        });
    }
}

export const confirm_payment = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

        res.send({
            paymentIntent: paymentIntent
        });

    } catch (error) {
        res.status(500).send({
            error: error.message,
            headers: req.headers
        });
    }
}