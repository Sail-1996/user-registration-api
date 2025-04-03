// models/Order.js
const mongoose = require('mongoose');
const { populate } = require('./user');

const itemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: false },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true }
});

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: addressSchema, required: true }
});

const orderSchema = new mongoose.Schema({
  user:{
    name: { type: String, required: false },
    email: { type: String, required: false },
    mobile_no: { type: String, required: false },
  },
 date: { type: Date, default: Date.now },
 //populate all the fields
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true , populate: { path: 'products', select: 'id title price description category image rating' } }],
 // products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true , populate: { path: 'products', select: 'id title price description category image rating' } }],
  payment: { 
    method: { type: String, required: false },
    amount: { type: Number, required: false },
   },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', "Cancel", "Pay"], default: 'Pending' },
});

module.exports = mongoose.model('Order', orderSchema);
