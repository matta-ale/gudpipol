const { Order, Product, OrderProduct } = require('../../models');

const getAllOrdersHandler = async () => {
  const orders = await Order.findAndCountAll({
    include: [
      {
        model: Product, // Incluye el modelo Product
        as: 'products', // Alias de la asociación definida en el modelo Order
        through: {
          attributes: ['quantity', 'color'], // Incluye los atributos de la tabla intermedia OrderProduct
        },
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