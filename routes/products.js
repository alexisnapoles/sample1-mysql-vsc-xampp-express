// this is where we are going to register all routes pertaining to products.
// import all dependencies / packages
const express = require('express');
const router = express.Router();
// importing from forms/index
const { bootstrapField, createProductForm } = require('../forms');

// #1 import the Product model via models folder
const { Product, Category } = require('../models');


async function getProductById(productId){
    const product = await Product.where({
        'id': productId
    }).fetch({
        'require': false,
        // withRelated: ['tags']
    });
    return product;
};

router.get('/', async (req, res) => {
    // #2 fetch all products using SQL commands (i.e. SELECT * from products)
    let products = await Product.collection().fetch({
        withRelated: ['category']
    });
    res.render('products/index', {
        // #3 converting collection to JSON
        'products': products.toJSON()
    });
});

router.get('/create', async (req, res) => {
    const allCategories = await Category.fetchAll().map((category) => {
        return [ 
            category.get('id'),
            category.get('name')
        ]
    })
    // getting instance of the form via createProductForm function.
    const productForm = createProductForm(allCategories);

    res.render('products/create', {
        'form': productForm.toHTML(bootstrapField)
    })
});

router.post('/create', async(req, res) => {
    // pass all existing categories to the form
    const allCategories = await Category.fetchAll().map((category) => {
        return [
            category.get('id'),
            category.get('name')
        ];
    })

    const productForm = createProductForm(allCategories);

    // .handle funtion is used to process request
    productForm.handle(req, {
        // success function runs when form successfully processed
        // success(arg1): arg1 = form itself
        // retrieving data can be done through form.data
        'success': async(form) => {
            // created a new instance of Product model (Product();)
            // model instance === one row in the table

            // this is a shortcut form of passing all the data in the form to the product via constructor
            // what will happen here is the name of fields in the form MUST MATCH the name of all columns in the table
            const product = new Product(form.data);
            // product.set('name', form.data.name);
            // product.set('price', form.data.price);
            // product.set('description', form.data.description);
            // since this process is asyncrnous we need to put await to save
            await product.save();
            res.redirect('/products');
        },
        'error': async(form) => {
            res.render('products/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
    // after creating route, add a form validator for erroneous inputs
    // i.e. user enters alphabets or words for our price field
});

router.get('/:products_id/update', async function(req, res) {
    // this will retrieve the product via the function created above
    // getProductById
    const productId = req.params.products_id;
    const product = await getProductById(productId);

    // fetching all existing categories
    const allCategories = await Category.fetchAll().map(function(category){
        return [ category.get('id'), category.get('name') ]
    });

    const productForm = createProductForm(allCategories);

    productForm.fields.name.value = product.get('name');
    productForm.fields.price.value = product.get('price');
    productForm.fields.description.value = product.get('description');
    productForm.fields.category_id.value = product.get('category_id');

    res.render('products/update', {
        'form': productForm.toHTML(bootstrapField),
        'product': product.toJSON()
    })
});

router.post('/:products_id/update', async (req, res) => {
    const product = await Product.where({
        'id': req.params.products_id
    }).fetch({
        require: true,
        // withRealated: ['tags']
    })

    const allCategories = await Category.fetchAll().map((category) => {
        return [ 
            category.get('id'), 
            category.get('name')
        ];
    })

    const productForm = createProductForm(allCategories);

    productForm.handle(req, {
        'success': async function(form){
            product.set(form.data);
            await product.save();
            res.redirect('/products');
        },
        'error': function(form) {
            res.render('products/update', {
                'form': form.toHTML(bootstrapField),
                'product': product.toJSON()
            })
        }    
    })
});

router.get('/:products_id/delete', async function(req, res){
    const product = await getProductById(req.params.products_id);
    res.render('products/delete', {
        'product': product.toJSON()
    })
});

router.post('/:products_id/delete', async function(req, res){
    const product = await getProductById(req.params.products_id);
    await product.destroy(); // same as MySQL command: DELETE FROM products where id = ?
    res.redirect('/products')
});

module.exports = router;
