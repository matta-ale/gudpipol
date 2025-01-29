const Product = require('./Product');
const Collection = require('./Collection');
const ProductImage = require('./ProductImage');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');

Collection.hasMany(Product, { foreignKey: 'collectionId' });
Product.belongsTo(Collection, { foreignKey: 'collectionId', as: 'collection' });
Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Order.belongsToMany(Product, {
  through: OrderProduct,
  as: 'products',
  foreignKey: 'orderId',
  otherKey: 'productId',
});

Product.belongsToMany(Order, {
  through: OrderProduct,
  as: 'orders',
  foreignKey: 'productId',
  otherKey: 'orderId',
});


module.exports = {
  Product,
  Collection,
  ProductImage,
  Order,
  OrderProduct,
};
