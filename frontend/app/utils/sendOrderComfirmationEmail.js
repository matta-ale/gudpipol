'use client';
import emailjs from '@emailjs/browser';

const sendOrderConfirmationEmail = async (orderData, template_id) => {
  try {
    // Calcular el multiplicador para el método de pago
    const multiplier =
      orderData.paymentMethod === 'CUOTAS'
        ? 1 + (parseFloat(process.env.NEXT_PUBLIC_RATE_6_CUOTAS) / 100 || 0)
        : 1;

    // Calcular el total del carrito
    const total = orderData.cart.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0; // Asegurarse de que price sea un número
      const quantity = parseInt(item.quantity, 10) || 0; // Asegurarse de que quantity sea un número entero
      return acc + price * quantity;
    }, 0); // Inicializar acumulador en 0

    // Preparar los parámetros del correo
    const emailParams = {
      to_email: orderData.email,
      user_name: orderData.fullName,
      user_phone: orderData.phone,
      user_idNumber: orderData.idNumber,
      user_address: orderData.address,
      user_postalCode: orderData.postalCode,
      user_province: orderData.province,
      user_city: orderData.city,
      order_id: orderData.id,
      cart_items: orderData.cart
        .map(
          (item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            const itemTotal = (price * quantity * multiplier).toFixed(2);
            return `${quantity} x ${item.name} ${item.color} - $${itemTotal}`;
          }
        )
        .join('\n'),
      total_price: (multiplier * total).toFixed(2),
      payment_method: orderData.paymentMethod,
    };

    // Enviar el correo
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
      template_id,
      emailParams,
      process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
    );

    console.log('Correo de confirmación enviado con éxito');
    return { status: 'OK' };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { status: 'ERROR' };
  }
};

export default sendOrderConfirmationEmail; // Cambiado a export default para Next.js