const { Order} = require('../../models');


const updateEmailSentHandler = async (id) => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Order not found');

  order.emailSent = true;
  await order.save();

  return order;
};

module.exports = updateEmailSentHandler;
