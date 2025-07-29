const Product = require('./Product');
const Collection = require('./Collection');
const ProductImage = require('./ProductImage');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');
const Pay = require('./Pay');

// Relación Collection -> Product
Collection.hasMany(Product, { foreignKey: 'collectionId' });
Product.belongsTo(Collection, { foreignKey: 'collectionId', as: 'collection' });

// Relación Product -> ProductImage
Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Relación Order <-> Product (a través de OrderProduct)
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

// Relación Order -> OrderProduct (Uno a Muchos)
Order.hasMany(OrderProduct, { foreignKey: 'orderId', as: 'orderProducts' });
OrderProduct.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Relación Pay -> Order (Uno a Uno)
Order.hasOne(Pay, { foreignKey: 'orderId', as: 'pay' });
Pay.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });


module.exports = {
  Product,
  Collection,
  ProductImage,
  Order,
  OrderProduct,
  Pay,
};
