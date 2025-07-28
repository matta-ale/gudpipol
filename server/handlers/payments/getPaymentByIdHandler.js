const { Pay } = require('../../models');

async function getPaymentByIdHandler(idMP) {
  try {
    const payment = await Pay.findOne({ where: { idMP }});

    return payment;
  } catch (error) {
    throw new Error(error.message, 500);
  }
}

module.exports = getPaymentByIdHandler;
