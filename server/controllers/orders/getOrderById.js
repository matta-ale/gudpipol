// controllers/orderController.js
const { Order, OrderProduct } = require('../../models');
const getOrderByIdHandler = require('../../handlers/orders/getOrderByIdHandler')

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await getOrderByIdHandler(id);
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};
module.exports = getOrderById
