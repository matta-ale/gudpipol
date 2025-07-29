const { Order,Product, OrderProduct, Pay } = require('../../models');

const getOrderByIdHandler = async (id) => {
  const foundOrder = await Order.findByPk(id,{
    include: [
      {
        model: Product,
        as: 'products',
        through: {
          attributes: ['quantity', 'color'],
        },
      },
      {
        model: Pay,
        as: 'pay',
        attributes: ['status'], // agregá más si querés
      },
    ],
  });

  if (!foundOrder) {
    const error = new Error(`Order "${id}" not found in database`);
    error.statusCode = 400;
    throw error;
  } else {
    return foundOrder
  }
};

module.exports = getOrderByIdHandler;
