'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import sendOrderConfirmationEmail from '../utils/sendOrderComfirmationEmail';
import sendOrderDataEmail from '../utils/sendOrderDataEmail';

let emailSendInProgress = false; // Global para evitar dobles ejecuciones

export default function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('external_reference');

  const transformOrderData = (order) => ({
    id: order.id,
    fullName: order.fullName,
    phone: order.phone,
    idNumber: order.idNumber,
    address: order.address,
    postalCode: order.postalCode,
    province: order.province,
    city: order.city,
    email: order.email,
    paymentMethod: order.paymentMethod,
    cart: order.products.map((p) => ({
      name: p.name,
      quantity: p.OrderProducts.quantity,
      price: p.price,
      color: p.OrderProducts.color,
    })),
  });

  useEffect(() => {
    const fetchAndNotify = async () => {
      if (!orderId || emailSendInProgress) return;
      emailSendInProgress = true;

      try {
        const response = await axios.get(`/orders/${orderId}`);
        const rawOrderData = response.data;

        if (rawOrderData.emailSent) {
          console.log('Correo ya enviado para la orden:', orderId);
          return;
        }

        if (rawOrderData?.pay?.status !== 'approved') {
          console.log('Pago no aprobado para la orden:', orderId);
          return;
        }

        // Marcar en la base de datos como "correo enviado"
        await axios.put(`/orders/${orderId}/email-sent`, { emailSent: true });

        const orderData = transformOrderData(rawOrderData);

        const [confirmStatus, dataStatus] = await Promise.all([
          sendOrderConfirmationEmail(orderData, process.env.NEXT_PUBLIC_EMAIL_CUOTAS_TEMPLATE),
          sendOrderDataEmail(orderData, process.env.NEXT_PUBLIC_EMAIL2_DATA_TEMPLATE),
        ]);

        if (confirmStatus.status !== 'OK') {
          console.error('Error enviando correo de confirmación:', confirmStatus);
          return;
        }

        if (dataStatus.status !== 'OK') {
          console.error('Error enviando correo de datos:', dataStatus);
          return;
        }

        // Si ambos OK
        localStorage.removeItem('cart');
        console.log('Correos enviados y carrito limpiado.');
      } catch (error) {
        console.error('Error al procesar la orden:', error);
      }
    };

    fetchAndNotify();
  }, [orderId]);

  return (
    <main className="w-[95%] md:w-[800px] mx-auto mt-24 md:mt-44 py-6 rounded-lg text-center text-custom-black bg-white">
      <h1 className="text-2xl font-bold mb-4">¡Compra Exitosa!</h1>
      <p className="mb-6">
        Tu pago ha sido aprobado y tu pedido está en proceso.
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-custom-green3 text-black font-bold py-2 px-6 rounded-lg"
      >
        Volver al Inicio
      </button>
    </main>
  );
}
