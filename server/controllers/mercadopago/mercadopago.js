const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const mercadopago = require('mercadopago');
const { resolveDiscount } = require('../../utils/discounts');
require('dotenv').config();

const createPaymentUrl = async (req, res) => {
  const { ACCESS_TOKEN, APP_URL, APP_URL_FRONTEND } = process.env;
  const mp = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN,
  });

  const { items, orderId, fullName, discountCode } = req.body;

  const backUrls = {
    success: `${APP_URL_FRONTEND}/success`,
    failure: `${APP_URL_FRONTEND}`,
    pending: `${APP_URL}/pending`,
  };
  const notificationUrl = `${APP_URL}/webhook`;

  let discountPercent = 0;
  if (discountCode) {
    const resolved = resolveDiscount(discountCode);
    if (!resolved.valid) {
      return res.status(400).json({ error: 'Código de descuento inválido' });
    }
    discountPercent = resolved.percent;
  }

  const discountFactor = 1 - discountPercent / 100;

  const preferenceArray = [];
  items.forEach((item) => {
    const unitPrice = Math.round(item.price * discountFactor * 100) / 100;
    preferenceArray.push({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      currency_id: 'ARS',
      unit_price: unitPrice,
    });
  });

  const preference = {
    body: {
      items: preferenceArray,
      back_urls: backUrls,
      notification_url: notificationUrl,
      external_reference: orderId,
      auto_return: 'approved',
    },
  };

  try {
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
