const { Product, ProductImage } = require('../../models');

const getAllProductsHandler = async (page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const products = await Product.findAndCountAll({
    offset,
    limit: pageSize,
    include: [{ model: ProductImage, as: 'images' }],
  });
  if (products.rows.length === 0) {
    const error = new Error('No products in database');
    error.statusCode = 400;
    throw error;
  }
  const totalPages = Math.ceil(products.count / pageSize);

  const pagination = {
    currentPage: page,
    pageSize: pageSize,
    totalItems: products.count,
    totalPages: totalPages,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };

  return { data: products.rows, pagination };
};

module.exports = getAllProductsHandler;
