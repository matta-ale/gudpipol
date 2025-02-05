"use client";
import emailjs from '@emailjs/browser';

const sendOrderDataEmail = async (orderData,template_id) => {
  try {
    const emailParams = {
      to_email: process.env.NEXT_PUBLIC_EMAIL2_ADDRESS,
      from_email: process.env.NEXT_PUBLIC_EMAIL2_ADDRESS,
      order_id: orderData.id, // Número de pedido
      user_name: orderData.fullName,  
      user_email: orderData.email,  
      user_phone: orderData.phone,  
      user_idNumber: orderData.idNumber,  
      user_address: orderData.address,  
      user_postalCode: orderData.postalCode,  
      user_province: orderData.province,  
      user_postalCode: orderData.postalCode,  
      user_city: orderData.city,  
      cart_items: orderData.cart.map(item => `${item.quantity} x ${item.name} ${item.color} - $${item.price*item.quantity}`).join('\n'),
      total_price: orderData.cart.reduce((total, item) => total + item.price * item.quantity, 0),
      payment_method: orderData.paymentMethod
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL2_SERVICE_ID,   // Reemplázalo con tu Service ID de EmailJS2
      template_id,  // Reemplázalo con tu Template ID
      emailParams,
      process.env.NEXT_PUBLIC_EMAIL2_PUBLIC_KEY       // Reemplázalo con tu Public Key de EmailJS2
    );

    console.log('Correo de datos del pedido enviado con éxito');
    return {status:'OK'}
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return {status:'ERROR'}
  }
};

module.exports = sendOrderDataEmail