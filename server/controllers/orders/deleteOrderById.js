// controllers/orderController.js
const { Order, OrderProduct } = require('../../models');
const deleteOrderByIdHandler = require('../../handlers/orders/deleteOrderByIdHandler')

const deleteOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteOrderByIdHandler(id);
    res.status(200).send(`Order ${id} has been deleted`);
  } catch (error) {
    next(error);
  }
};
module.exports = deleteOrderById
