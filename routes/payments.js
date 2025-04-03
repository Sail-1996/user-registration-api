const express = require('express');
const router = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Order = require('../models/order');
require('dotenv').config();

// Create a payment intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        // Create a PaymentIntent with the order amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe works with cents
            currency: currency || 'usd',
            payment_method_types: ['card'],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Confirm and save payment
router.post('/confirm', async (req, res) => {
    try {
        const { orderId, paymentIntentId } = req.body;

        // Retrieve PaymentIntent status from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Update order status to "Paid"
            await Order.findByIdAndUpdate(orderId, { status: 'Paid' });

            res.json({ message: 'Payment successful', paymentIntent });
        } else {
            res.status(400).json({ message: 'Payment not completed' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
