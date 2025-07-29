const getPaymentByIdHandler = require('../../handlers/payments/getPaymentByIdHandler');

const getPaymentById = async (req, res) => {
  const {idMP} = req.params 

  try {
    const payment = await getPaymentByIdHandler(idMP);

    if (!payment) {
      return res.status(200).json({ message: 'Pago no encontrado' });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get payment', error: error.message });
  }
};



module.exports = getPaymentById;