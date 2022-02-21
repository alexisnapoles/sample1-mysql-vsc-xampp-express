// this is where we are going to register all routes pertaining to products.
// import all dependencies / packages
const express = require('express');
const router = express.Router();

// #1 import the Product model via models folder
const { Product } = require('../models');

router.get('/', async (req, res) => {
    // #2 fetch all products using SQL commands (i.e. SELECT * from products)
    let products = await Product.collection().fetch();
    res.render('products/index', {
        // #3 converting collection to JSON
        'products': products.toJSON()
    });
});

module.exports = router;