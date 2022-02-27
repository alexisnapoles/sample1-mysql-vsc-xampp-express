// this is where we are going to register all routes pertaining to products.
// import all dependencies / packages
const express = require('express');
const router = express.Router();
// importing from forms/index
const { bootstrapField, createProductForm } = require('../forms');

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

router.get('/create', async (req, res) => {
    // getting instance of the form via createProductForm function.
    const productForm = createProductForm();
    res.render('products/create', {
        'form': productForm.toHTML(bootstrapField)
    })
});

router.post('/create', async(req, res) => {
    const productForm = createProductForm();
    // .handle funtion is used to process request
    productForm.handle(req, {
        // success function runs when form successfully processed
        // success(arg1): arg1 = form itself
        // retrieving data can be done through form.data
        'success': async(form) => {
            // created a new instance of Product model (Product();)
            // model instance === one row in the table
            const product = new Product();
            product.set('name', form.data.name);
            product.set('price', form.data.price);
            product.set('description', form.data.description);
            // since this process is asyncrnous we need to put await to save
            await product.save();
            res.redirect('/products');
        }
    })
    // after creating route, add a form validator for erroneous inputs
    // i.e. user enters alphabets or words for our price field
});

module.exports = router;
