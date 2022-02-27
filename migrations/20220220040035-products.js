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
  return db.createTable('products', {
    // KEY will be the column name of the table
    // VALUE will be attributes of column (i.e. data type whether null or not null)
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      unsigned: true // unsigned used to permit only non-negative numbers or when need a larger upper numeric range
    },
    name: {
      type: 'string',
      length: 100,
      notNull: true
    },
    price: {
      type: 'decimal',
      notNull: true
    },
    description: 'text',
  });
};

exports.down = function(db) {
  return db.dropTable('products');
};

exports._meta = {
  "version": 1
};
