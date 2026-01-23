const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const mercadopago = require('mercadopago');
require('dotenv').config();

const createPaymentUrl = async (req, res) => {
  const { ACCESS_TOKEN, APP_URL,APP_URL_FRONTEND} = process.env;
  const mp = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN,
  });

  const {items, orderId, fullName} = req.body

  const backUrls = {
    success: `${APP_URL_FRONTEND}/success`,
    failure: `${APP_URL_FRONTEND}`,
    pending: `${APP_URL}/pending`,
  };
  const notificationUrl = `${APP_URL}/webhook`;

  const preferenceArray = [];
  items.forEach((item) => {
    arrayItem = {
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      currency_id: 'ARS',
      unit_price: item.price,
    };
    preferenceArray.push(arrayItem);
  });

  const preference = {
    body: {
      items: preferenceArray,
      back_urls: backUrls,
      notification_url: notificationUrl,
      external_reference: orderId,
      auto_return: "approved",
    },
  };

  try {
    //Acá iría una validacion de la orden,si fuese necesaria
    //     const order = await Order.findOne({
    //       where: { id: product.id, PayId: null },
    //     }); // cambiar id por valor dinámico

    //     if (!booking) {
    //       throw Error(
    //         'It is not possible to create the payment for this reservation. The reservation already has an associated payment',
    //       );
    //     }
    const response = await new Preference(mp).create(preference);
    const payLink = response.init_point;
    res.send(payLink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMpOrder = async (req, res) => {
  res.send('Crear orden');
};

module.exports = { createPaymentUrl, createMpOrder };
