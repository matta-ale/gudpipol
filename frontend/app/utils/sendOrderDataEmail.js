"use client";
import emailjs from '@emailjs/browser';

const sendOrderDataEmail = async (orderData, template_id) => {
  try {
    const emailParams = {
      to_email: process.env.NEXT_PUBLIC_EMAIL2_ADDRESS,
      from_email: process.env.NEXT_PUBLIC_EMAIL2_ADDRESS,
      order_id: orderData.id,
      user_name: orderData.fullName,
      user_email: orderData.email,
      user_phone: orderData.phone,
      user_idNumber: orderData.idNumber,
      user_address: orderData.address,
      user_postalCode: orderData.postalCode,
      user_province: orderData.province,
      user_city: orderData.city,
      cart_items: orderData.cart
        .map(item => {
          const totalItemPrice = (item.price * item.quantity).toFixed(2);
          return `${item.quantity} x ${item.name} ${item.color} - $${totalItemPrice}`;
        })
        .join('\n'),
      total_price: orderData.cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2),
      payment_method: orderData.paymentMethod
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL2_SERVICE_ID,
      template_id,
      emailParams,
      process.env.NEXT_PUBLIC_EMAIL2_PUBLIC_KEY
    );

    console.log('Correo de datos del pedido enviado con éxito');
    return { status: 'OK' };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { status: 'ERROR' };
  }
};

module.exports = sendOrderDataEmail;
