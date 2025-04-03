const express = require('express');
const router = express.Router();
const Order = require('../models/order');


// Get all orders (Admin only)


// Update order status (Admin only)


// Delete an order (Admin only)
router.delete('/admin/orders/:orderId', (req, res) => {
   
    Order.findByIdAndDelete(req.params.orderId)
        .then(() => res.status(200).json({ message: 'Order deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
}
);

module.exports = router;
