'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import sendOrderConfirmationEmail from '../utils/sendOrderComfirmationEmail';
import sendOrderDataEmail from '../utils/sendOrderDataEmail';
import { clearCart } from '../redux/features/cart/cartSlice';
import { useRouter } from 'next/navigation';

export default function PaymentMethod() {
  const router = useRouter();
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [totalPrice, setTotalPrice] = useState(cartTotalPrice);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleMethodChange = (method) => {
    if (!orderConfirmed) {
      setSelectedMethod(method);
      setOrderConfirmed(false);
    }
  };

  const handleConfirmTransferOrder = async () => {
    setIsLoading(true);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const orderData = userData;
    orderData.cart = cartItems;
    orderData.paymentMethod = 'TRANSFERENCIA/EFECTIVO';
    console.log(orderData);
    try {
      const data = await axios.post('/orders', orderData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (data.status === 201) {
        orderData.id = data.data.order.id;
        const { status } = await sendOrderConfirmationEmail(
          orderData,
          process.env.NEXT_PUBLIC_EMAIL_TRANSF_TEMPLATE
        );
        if (status === 'OK') {
          const { status } = await sendOrderDataEmail(
            orderData,
            process.env.NEXT_PUBLIC_EMAIL2_DATA_TEMPLATE
          );
          console.log(status);
          if (status === 'OK') {
            setOrderNumber(data.data.order.id);
            setOrderConfirmed(true);
            dispatch(clearCart());
          }
        }
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmInstallmentsOrder = async () => {
    setIsLoading(true);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const orderData = userData;
    orderData.cart = cartItems;
    orderData.paymentMethod = 'CUOTAS';
    console.log(orderData);

    const cartData = orderData.cart.map((item) => ({
      id: item.id,
      name: item.name,
      collection: item.collection,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      color: item.color,
    }));
    try {
      const data = await axios.post('/orders', orderData, {
        headers: { 'Content-Type': 'application/json' },
      });
      const orderId = data.data.order.id
      const body = {orderId:orderId,items:cartData}
      if (data.status === 201) {
        const {data} = await axios.post('/createPaymentUrl', body, {
          headers: { 'Content-Type': 'application/json' },
        });
        const mercadoPagoUrl = data
        console.log('URL: '+mercadoPagoUrl);

        router.push(mercadoPagoUrl); // Use router.push to navigate
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setIsLoading(false);
    }

    //SEGUIR DESDE ACÁ: QUE CUANDO MANDE LA NOTIFICACIÖN DEL PAGO, CONSULTE LOS DATOS DE LA ORDEN CON EL ID Y ENVÏE AMBOS MAILS

    //   if (data.status === 201) {
    //     orderData.id = data.data.order.id;
    //     const { status } = await sendOrderConfirmationEmail(
    //       orderData,
    //       process.env.NEXT_PUBLIC_EMAIL_CUOTAS_TEMPLATE
    //     );
    //     if (status === 'OK') {
    //       const { status } = await sendOrderDataEmail(
    //         orderData,
    //         process.env.NEXT_PUBLIC_EMAIL2_DATA_TEMPLATE
    //       );
    //       if (status === 'OK') {
    //         setOrderNumber(data.data.order.id);
    //         setOrderConfirmed(true);
    //         dispatch(clearCart());
    //       }
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error confirming order:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const cantCuotas = Number(process.env.NEXT_PUBLIC_CANT_CUOTAS);
  const recargoCuotas = Number(process.env.NEXT_PUBLIC_RECARGO_CUOTAS);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const alias = process.env.NEXT_PUBLIC_ALIAS;
  const cvu = process.env.NEXT_PUBLIC_CVU;
  const aNombreDe = process.env.NEXT_PUBLIC_A_NOMBRE_DE;
  const cuit = process.env.NEXT_PUBLIC_CUIT;

  return (
    <main
      className='w-[95%] min-h-[350px] md:w-[800px] mx-auto mt-24 md:mt-52 py-6 rounded-lg'
      style={{ backgroundColor: 'rgba(45, 46, 50, 0.75)' }}
    >
      <h1 className='text-white text-2xl mx-4 md:mx-7 mb-6 font-bold'>
        Seleccione forma de pago:
      </h1>
      <form className='space-y-4 mx-4 md:mx-6'>
        <div className='flex flex-col gap-0 bg-gray-800 rounded-md'>
          <label
            className={`block text-white font-semibold p-4 py-6 rounded-md cursor-pointer ${
              selectedMethod === 'transfer' ? 'border-2 border-yellow-400' : ''
            } ${
              orderConfirmed && selectedMethod === 'installments'
                ? 'text-gray-600'
                : 'text-white'
            }`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='transfer'
              checked={selectedMethod === 'transfer'}
              onChange={() => handleMethodChange('transfer')}
              className='mr-2 accent-gray-500'
              disabled={totalPrice === 0}
            />
            Pago por transferencia bancaria: &nbsp;&nbsp;$&nbsp;
            {totalPrice.toFixed(2).toLocaleString('es-ES')}
          </label>

          <label
            className={`block font-semibold p-4 rounded-md cursor-pointer py-6 ${
              selectedMethod === 'installments'
                ? 'border-2 border-yellow-400'
                : ''
            } ${
              orderConfirmed && selectedMethod === 'transfer'
                ? 'text-gray-600'
                : 'text-white'
            }`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='installments'
              checked={selectedMethod === 'installments'}
              onChange={() => handleMethodChange('installments')}
              className='mr-2 accent-gray-500'
              disabled={totalPrice === 0 || orderConfirmed}
            />
            Pago en {cantCuotas} cuotas de: &nbsp;$&nbsp;
            {((totalPrice * (1 + recargoCuotas)) / cantCuotas)
              .toFixed(2)
              .toLocaleString('es-ES')}
            &nbsp; - Total &nbsp;$&nbsp;
            {(totalPrice * (1 + recargoCuotas))
              .toFixed(2)
              .toLocaleString('es-ES')}
          </label>
        </div>

        {selectedMethod && (
          <div className='mt-6 p-4 rounded-md bg-gray-800 text-white'>
            {selectedMethod === 'transfer' ? (
              <>
                <p>Siga los pasos a continuación para completar el pago:</p>
                <ol className='list-decimal pl-5 mt-8 space-y-1'>
                  <li>
                    Pre-confirme la orden:
                    {!orderConfirmed && (
                      <>
                        <div className='mt-4 mb-8'>
                          <h2 className='text-lg font-bold mt-8'>
                            Resumen de su orden:
                          </h2>
                          {cartItems.map((item, index) => (
                            <div key={index} className='mt-2'>
                              <p>
                                {item.quantity} x {item.name} - ${' '}
                                {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                          <p className='mt-8 mb-8 font-bold text-xl underline'>
                            Total a transferir: $ {totalPrice.toFixed(2)}
                          </p>
                        </div>
                        <div className='mt-4 pb-8 flex gap-4'>
                          <button
                            type='button'
                            className='bg-red-500 text-white font-bold py-2 px-4 rounded-lg'
                            onClick={() => setSelectedMethod(null)}
                          >
                            Cancelar
                          </button>
                          <button
                            type='button'
                            className={`relative w-full md:max-w-96 bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-transform transform ${
                              isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:scale-95 active:scale-90'
                            }`}
                            onClick={handleConfirmTransferOrder}
                            disabled={isLoading}
                          >
                            {/* Texto invisible para reservar el ancho */}
                            <span className='invisible'>
                              Pre-confirmar (voy a transferir)
                            </span>
                            {/* Contenido superpuesto */}
                            <span className='absolute inset-0 flex items-center justify-center'>
                              {isLoading ? (
                                <div className='flex items-center'>
                                  <div
                                    className='animate-spin border-b-2 border-white rounded-lg'
                                    style={{ width: '1rem', height: '1rem' }}
                                  ></div>
                                  <span className='ml-2'>Procesando...</span>
                                </div>
                              ) : (
                                'Pre-confirmar (voy a transferir)'
                              )}
                            </span>
                          </button>
                        </div>
                      </>
                    )}
                    {orderConfirmed && (
                      <p className='text-green-400 font-bold mt-4 pb-4'>
                        Orden {orderNumber} pre-confirmada. Ya recibimos su
                        pedido. Prosiga con el siguiente paso para confirmarla.
                      </p>
                    )}
                  </li>
                  <li>
                    Realice una transferencia bancaria por &nbsp;$&nbsp;
                    {totalPrice.toFixed(2).toLocaleString('es-ES')} a la
                    siguiente cuenta: <br />
                    <span className='block mt-4'>Alias:&nbsp; {alias}</span>
                    <span className='block'>CVU:&nbsp; {cvu}</span>
                    <span className='block'>
                      A nombre de:&nbsp; {aNombreDe}
                    </span>
                    <span className='block mb-4'>CUIT:&nbsp; {cuit}</span>
                  </li>
                  <li>
                    Envíe el comprobante a nuestro número de WhatsApp:{' '}
                    <a
                      href={`https://wa.me/549${whatsappNumber}`}
                      className='text-yellow-400 underline'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {whatsappNumber}
                    </a>
                    .<br />
                    Una vez que recibamos el comprobante, la orden queda
                    confirmada.
                  </li>
                </ol>
              </>
            ) : (
              <>
                <p>
                  Puede proceder al pago en cuotas seleccionando el botón a
                  continuación.
                </p>
                <button
                  type='button'
                  className='w-full bg-yellow-400 text-black font-bold py-2 rounded-lg mt-4'
                  onClick={handleConfirmInstallmentsOrder}
                >
                  Proceder al pago en cuotas
                </button>
              </>
            )}
          </div>
        )}
      </form>
    </main>
  );
}
