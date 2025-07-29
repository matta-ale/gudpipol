const { Order } = require('../../models');

const deleteOrderByIdHandler = async (id) => {
  const foundOrder = await Order.findOne({
    where: { id },
  });
  if (!foundOrder) {
    const error = new Error(`Order "${id}" not found in database`);
    error.statusCode = 400;
    throw error;
  } else {
    await foundOrder.destroy();
    return;
  }
};

module.exports = deleteOrderByIdHandler;
