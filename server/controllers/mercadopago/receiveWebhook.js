const {
  MercadoPagoConfig,
  Preference,
  Payment,
  MerchantOrder,
} = require('mercadopago');
const axios = require('axios');
require('dotenv').config();

const receiveWebhook = async (req, res) => {
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', JSON.stringify(req.query, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('RecieveWebhook');

  const { APP_URL, ACCESS_TOKEN} = process.env;
  const mercadopago = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN,
  });

  try {
    const { query } = req;
    console.log('Query:', query);
    const topic = query.topic || query.type;
    switch (topic) {
      case 'payment':
        console.log('payment');
        const paymentId = query['data.id'] || query['id'];
        console.log('getting', topic, paymentId);
        const payment = await new Payment(mercadopago).get({ id: paymentId });

        console.log('Payment');
        console.log(payment);
        const pay = {
          id: payment.external_reference,
          idMP: payment.id,
          amount: payment.transaction_amount,
          date: payment.date_approved,
          method: payment.payment_type_id,
          status: payment.status,
        };
        console.log('Pay');
        if (pay.status === 'approved') {
          const response = await axios.post(`${APP_URL}/payments`, pay);

          console.log('Respuesta de la creación de pago:', response.data);

          //envío los dos correos notificando

        }
        break;
      // case 'merchant_order':
      //   console.log('merchant_order');
      //   const orderId = query['id'] || query['data.id'];
      //   console.log('Merchant order ID: ' + orderId);
      //   const merchantOrder = await new MerchantOrder(mercadopago).get({id:orderId});
      //   console.log(merchantOrder);
      //   break;
    }
    res.sendStatus(200);
  } catch (error) {
    console.error('error notification payment:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = receiveWebhook;
