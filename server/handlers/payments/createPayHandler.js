const { Pay, Order, OrderProduct } = require('../../models');

async function createPayHandler({ id, idMP, amount, date, method, status }) {
  try {
    const order = await Order.findOne({
      where: { id: id },
      include: [{ model: OrderProduct, as: 'orderProducts' }]
    });

    const existingPayment = await Pay.findOne({
      where: { orderId: order.id, status: 'approved' }
    });

    if (existingPayment) {
      // Si ya existe un pago aprobado, retornar el pago existente
      return {existing: true, payment: existingPayment};
    }

    const payment = await Pay.create({
      idMP,
      amount,
      date,
      method,
      status,
      orderId: order.id  // Relaciona el pago con la orden
    });

    return {existing: false, payment: payment};
  } catch (error) {
    throw new Error(error.message, 500);
  }
}

module.exports = createPayHandler;
