const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    method: { type: String, required: false },
    amount: { type: Number, required: false },
    // other payment details
});

module.exports = mongoose.model('Payment', paymentSchema);