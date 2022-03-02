'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  // add category_id column to products table
  return db.addColumn('products', 'category_id', {
    type: 'int',
    unsigned: true,
    notNull: true,
    // with foreignKey from the categories table migration
    // to set relationship between Product and Category models
    foreignKey: {
      // name in fk is not used in coding;
      // this is to comply with the standard rule:
      // each FK MUST have a unique name
      name: 'product_category_fk',
      table: 'categories',
      rules: {
        // cascade onDelete means when a product within a category is deleted,
        // ALL PRODUCTS THAT BELONGS TO THE CATEGORY WILL ALSO BE DELETED
        onDelete: 'cascade',
        // restrict onUpdate prevents any changes in the primary key.
        onUpdate: 'restrict'
      },
      mapping: 'id'
    }
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
