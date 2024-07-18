const Product = require('./Product');
const Collection = require('./Collection');

Collection.hasMany(Product, { foreignKey: 'collectionId' });
Product.belongsTo(Collection, { foreignKey: 'collectionId' });

module.exports = {
  Product,
  Collection
};
