const {
  MercadoPagoConfig,
  Payment,
} = require('mercadopago');
const axios = require('axios');
require('dotenv').config();

const receiveWebhook = async (req, res) => {
  console.log('ReceiveWebhook');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', JSON.stringify(req.query, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));

  const { APP_URL, ACCESS_TOKEN } = process.env;
  const mercadopago = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN,
  });

  try {
    const { query } = req;
    const topic = query.topic || query.type;

    if (topic === 'payment') {
      const paymentId = query['data.id'] || query['id'];
      const payment = await new Payment(mercadopago).get({ id: paymentId });
      console.log('Payment info:', payment);

      const pay = {
        id: payment.external_reference,
        idMP: payment.id,
        amount: payment.transaction_amount,
        date: payment.date_approved,
        method: payment.payment_type_id,
        status: payment.status,
      };
      console.log('Pay object:', pay);

      const paymentByidMP = await axios.get(`${APP_URL}/payments/${pay.idMP}`);
      console.log('paymentByidMP.data:', paymentByidMP.data);

      if (
        pay.status === 'approved' &&
        paymentByidMP.data.message === 'Pago no encontrado'
      ) {
        try {
          const response = await axios.post(`${APP_URL}/payments`, pay);
          console.log('Respuesta creación pago:', response.data);
          
        } catch (error) {
          console.error(
            'Error al crear el pago:',
            error.response?.data || error.message
          );
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error en receiveWebhook:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = receiveWebhook;
