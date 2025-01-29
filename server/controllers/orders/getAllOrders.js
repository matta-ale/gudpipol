const { getAllOrdersHandler } = require('../../handlers');

const getAllOrders = async (req, res,next) => {
  try {
    const orders = await getAllOrdersHandler();
    res.status(200).json(orders);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

module.exports = getAllOrders;
