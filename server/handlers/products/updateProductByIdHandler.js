const { Product } = require('../../models');

const updateProductByIdHandler = async (data) => {
  const { id } = data;
  const updated = await Product.update(data, {
    where: { id: id },
    return: true,
    raw: true,
  });

  if (updated[0] === 0) {
    const error = new Error(`Can't update product with id "${id}"`);
    error.statusCode = 400;
    throw error;
  } else {
    return updated;
  }
};

module.exports = updateProductByIdHandler;
