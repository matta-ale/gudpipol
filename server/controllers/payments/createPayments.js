const createPayHandler = require('../../handlers/payments/createPayHandler');
const { Pay } = require('../../models')

const createPayment = async (req, res) => {
  try {
    const payment = createPayHandler(req.body);
    res.status(201).json({ message: 'Payment created successfully', payment});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};



module.exports = createPayment;