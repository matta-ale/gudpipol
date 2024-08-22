const Product = require('./Product')
const Collection = require('./Collection');
const ProductImage = require('./ProductImage');

Collection.hasMany(Product, { foreignKey: 'collectionId' });
Product.belongsTo(Collection, { foreignKey: 'collectionId',as: 'collection'});
Product.hasMany(ProductImage, {foreignKey: 'productId',as: 'images'});
ProductImage.belongsTo(Product, {foreignKey: 'productId',as: 'product'});

module.exports = {
  Product,
  Collection,
  ProductImage
};
