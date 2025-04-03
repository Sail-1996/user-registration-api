// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const adminRouter = require('./routes/admin');
const paymentRoutes = require('./routes/payments');
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.use('/users', usersRoute);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/admin', adminRouter);
// app.use('/payments', paymentRoutes);
// Error handling middleware

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});
