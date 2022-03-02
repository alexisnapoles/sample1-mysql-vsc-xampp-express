// ON CREATING MODELS:
// by definition MODEL is a JS class representing ONE TABLE.
// MODEL INSTANCE represents ONE ROW in the table.

// add new model
const bookshelf = require('../bookshelf');

const Product = bookshelf.model('Product', {
    tableName: 'products',
    // function name() is the relationship name
    // relationship name format === model name of migration in lowercase
    // this will be singular becaus of 'belongsTo' (1:1)
    category() {
        return this.belongsTo('Category')
        // belongsTo relation adds a foreign key and singular association mixins to the source (Category)
        // definition via https://sequelize.org/v3/api/associations/
    }
});

const Category = bookshelf.model('Category', {
    tableName: 'categories',
    products() {
        // hasMany (1:m)
        return this.hasMany('Product');
    }
});


// stored in Product object
module.exports = { Product, Category };

/**
 * NOTE!!!
 * Product model
 * FIRST arg == 'Product' (singular, First letter of word is Capitalized)
 * SECOND arg == tableName: 'products' (plural, first letter of word is NOT capitalized)
 * 
 * ON FK COLUMN WITH Bookshelf ORM:
 * format MUST BE:
 * `<table_name_in_singular_form>_id`
 */