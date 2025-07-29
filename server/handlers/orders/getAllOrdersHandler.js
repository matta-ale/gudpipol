const { Order, Product, OrderProduct, Pay } = require('../../models');

const getAllOrdersHandler = async () => {
  const orders = await Order.findAndCountAll({
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
        as: 'pay', // este alias debe coincidir con el definido en la asociación
        attributes: ['status'], // podés incluir más campos si querés
      },
    ],
  });

  if (orders.rows.length === 0) {
    const error = new Error('No orders in database');
    error.statusCode = 400;
    throw error;
  }

  return orders.rows;
};

module.exports = getAllOrdersHandler;
