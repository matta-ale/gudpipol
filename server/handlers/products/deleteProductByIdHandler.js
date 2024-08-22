const { Product } = require('../../models');

const deleteProductByIdHandler = async (id) => {
  const foundProduct = await Product.findOne({
    where: { id },
  });
  if (!foundProduct) {
    const error = new Error(`Product with id "${id}" not found in database`);
    error.statusCode = 400;
    throw error;
  } else {
    await foundProduct.destroy();
    return;
  }
};

module.exports = deleteProductByIdHandler;
