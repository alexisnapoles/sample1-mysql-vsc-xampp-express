// ON CREATING MODELS:
// by definition MODEL is a JS class representing ONE TABLE.
// MODEL INSTANCE represents ONE ROW in the table.

// add new model
const bookshelf = require('../bookshelf');

// Product model
// first arg == 'Product' (singular, First letter of word is Capitalized)
// second arg == tableName: 'products' (plural, first letter of word is NOT capitalized)
const Product = bookshelf.model('Product', {

    tableName: 'products'
});

// stored in Product object
module.exports = { Product };