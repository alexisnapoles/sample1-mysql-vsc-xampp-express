// setting up db connection via knex
const knex = require('knex') ({
    client: process.env.DB_DRIVER,
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
});

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf;

/**
 * route to display the form 
 * another to process the form
 * BOOKSHELF == to create product queries == ORM Object-relational mapping
 * ORM is a programming technique for converting data b/w incompatible type systems using object-oriented programming
 */
