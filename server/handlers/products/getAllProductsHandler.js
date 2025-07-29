const { Product, ProductImage, Collection } = require('../../models');

const getAllProductsHandler = async (page, pageSize) => {
  const products = await Product.findAndCountAll({
    where: {isActive:true},
    include: [
      { model: ProductImage, as: 'images' },
      { model: Collection, as: 'collection' },
    ],
  });
  if (products.rows.length === 0) {
    const error = new Error('No products in database');
    error.statusCode = 400;
    throw error;
  }

  return products.rows;
};

module.exports = getAllProductsHandler;
