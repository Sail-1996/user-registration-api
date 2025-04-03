// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Create an order
router.post('/', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an order
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/:id", async (req, res) => {
  //update status
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }


})

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('user products payment');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
