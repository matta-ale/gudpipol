"use client";
import emailjs from '@emailjs/browser';

const sendOrderConfirmationEmail = async (orderData,template_id) => {
  try {
    const emailParams = {
      to_email: orderData.email,  // Asegúrate de que orderData incluya el correo del cliente
      user_name: orderData.fullName,  // Nombre del cliente
      order_id: orderData.id, // Número de pedido
      cart_items: orderData.cart.map(item => `${item.quantity} x ${item.name} ${item.color} - $${item.price*item.quantity}`).join('\n'),
      total_price: orderData.cart.reduce((total, item) => total + item.price * item.quantity, 0),
      payment_method: orderData.paymentMethod
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,   // Reemplázalo con tu Service ID de EmailJS
      template_id,  // Reemplázalo con tu Template ID
      emailParams,
      process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY       // Reemplázalo con tu Public Key de EmailJS
    );

    console.log('Correo de confirmación enviado con éxito');
    return {status:'OK'}
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return {status:'ERROR'}
  
}
};

module.exports = sendOrderConfirmationEmail