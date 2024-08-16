const { Product,ProductImage } = require('../../models');

const getProductByIdHandler = async (id) => {

  const foundProduct = await Product.findOne({
    where: { id },
    include: [{ model: ProductImage, as: 'images' }],
  });
  if (!foundProduct) {
    const error = new Error(`Product with id "${id}" not found in database`)
    error.statusCode = 400
    throw error;
  } else {
    return foundProduct
  }
};

module.exports = getProductByIdHandler;
