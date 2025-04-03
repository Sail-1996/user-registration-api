const express = require('express');
const axios = require('axios');
const Product = require('../models/product');

const router = express.Router();

// GET - List all products
router.get('/', async (req, res) => {
    try {
      const { page = 1, category, search } = req.query;
  
      const filter = {};
  
      // Filter by category if provided
      if (category) {
        filter.category = { $regex: category, $options: 'i' }; // Case-insensitive match
      }
  
      // Filter by search term in title or description
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
  
      // Pagination settings
      const limit = 5; // Number of products per page
      const skip = (page - 1) * limit;
  
      const products = await Product.find(filter).skip(skip).limit(limit);
  
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// POST - Add a product from Fake Store API
router.post('/add', async (req, res) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;
  
      // Get existing product IDs from the database
      const existingProducts = await Product.find().select('id');
      const existingIds = existingProducts.map(product => product.id);
  
      // Filter out products that already exist in the database
      const newProducts = products.filter(product => !existingIds.includes(product.id));
  
      // Insert only new products into the database
      const addedProducts = await Product.insertMany(newProducts);
  
      res.status(201).json(addedProducts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
