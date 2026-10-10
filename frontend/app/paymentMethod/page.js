'use client';
import { useMemo, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [discountInput, setDiscountInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState('');
  const [discountLoading, setDiscountLoading] = useState(false);
  const dispatch = useDispatch();
  const cantCuotas = Number(process.env.NEXT_PUBLIC_CANT_CUOTAS);
  const rate3 = Number(process.env.NEXT_PUBLIC_RATE_3_CUOTAS);
  const rate6 = Number(process.env.NEXT_PUBLIC_RATE_6_CUOTAS);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const alias = process.env.NEXT_PUBLIC_ALIAS;
  const cvu = process.env.NEXT_PUBLIC_CVU;
  const aNombreDe = process.env.NEXT_PUBLIC_A_NOMBRE_DE;
  const cuit = process.env.NEXT_PUBLIC_CUIT;

  const discountPercent = appliedDiscount?.percent || 0;
  const totalPrice = useMemo(() => {
    return cartTotalPrice * (1 - discountPercent / 100);
  }, [cartTotalPrice, discountPercent]);

  const handleMethodChange = (method) => {
    if (!orderConfirmed) {
      setSelectedMethod(method);
      setOrderConfirmed(false);
    }
  };

  const handleApplyDiscount = async () => {
    const code = discountInput.trim();
    if (!code) {
      setDiscountError('Ingresá un código');
      return;
    }
    setDiscountLoading(true);
    setDiscountError('');
    try {
      const { data } = await axios.post('/discounts/validate', { code });
      if (data.valid) {
        setAppliedDiscount({ code: data.code, percent: data.percent });
        setDiscountError('');
      } else {
        setAppliedDiscount(null);
        setDiscountError('Código inválido');
      }
    } catch (error) {
      setAppliedDiscount(null);
      setDiscountError(
        error.response?.data?.message || 'Código de descuento inválido'
      );
    } finally {
      setDiscountLoading(false);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountInput('');
    setDiscountError('');
  };

  const buildOrderData = (paymentMethod) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const orderData = { ...userData };
    orderData.cart = cartItems;
    orderData.paymentMethod = paymentMethod;
    if (appliedDiscount) {
      orderData.discountCode = appliedDiscount.code;
      orderData.discountPercent = appliedDiscount.percent;
    }
    return orderData;
  };

  const handleConfirmTransferOrder = async () => {
    setIsLoading(true);
    const orderData = buildOrderData('TRANSFERENCIA/EFECTIVO');

    try {
      const data = await axios.post('/orders', orderData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (data.status === 201) {
        orderData.id = data.data.order.id;

        const res = await axios.get(`/orders/${orderData.id}`);
        const existingOrder = res.data;

        if (existingOrder.emailSent) {
          console.log('Email ya fue enviado, abortando...');
          setOrderNumber(orderData.id);
          setOrderConfirmed(true);
          dispatch(clearCart());
          return;
        }

        const confirmStatus = await sendOrderConfirmationEmail(
          orderData,
          process.env.NEXT_PUBLIC_EMAIL_TRANSF_TEMPLATE
        );

        if (confirmStatus.status !== 'OK') {
          console.error('Error enviando primer mail');
          return;
        }

        const dataStatus = await sendOrderDataEmail(
          orderData,
          process.env.NEXT_PUBLIC_EMAIL2_DATA_TEMPLATE
        );

        if (dataStatus.status !== 'OK') {
          console.error('Error enviando segundo mail');
          return;
        }

        await axios.put(`/orders/${orderData.id}/email-sent`);

        setOrderNumber(orderData.id);
        setOrderConfirmed(true);
        dispatch(clearCart());
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmInstallmentsOrder = async () => {
    setIsLoading(true);
    const orderData = buildOrderData('CUOTAS');

    // Precio con recargo de cuotas; el descuento lo aplica el server en createPaymentUrl
    const cartData = orderData.cart.map((item) => ({
      id: item.id,
      name: item.name,
      collection: item.collection,
      price: item.price * (1 + rate6 / 100),
      quantity: item.quantity,
      image: item.image,
      color: item.color,
    }));

    try {
      const data = await axios.post('/orders', orderData, {
        headers: { 'Content-Type': 'application/json' },
      });
      const orderId = data.data.order.id;
      const body = {
        orderId,
        items: cartData,
        ...(appliedDiscount ? { discountCode: appliedDiscount.code } : {}),
      };

      if (data.status === 201) {
        const response = await axios.post('/createPaymentUrl', body, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          setOrderNumber(orderId);
          setOrderConfirmed(true);
          dispatch(clearCart());
          orderData.id = orderId;

          const mercadoPagoUrl = response.data;
          router.push(mercadoPagoUrl);
        }
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='w-[95%] min-h-[350px] md:w-[800px] mx-auto mt-24 md:mt-52 py-6 rounded-lg bg-white'>
      <h1 className='text-custom-black text-2xl mx-4 md:mx-7 mb-6 font-bold'>
        Seleccione forma de pago:
      </h1>

      {!orderConfirmed && (
        <div className='mx-4 md:mx-6 mb-6 p-4 border border-gray-200 rounded-md'>
          <label className='block text-custom-black font-semibold mb-2'>
            Código de descuento
          </label>
          <div className='flex flex-col sm:flex-row gap-2'>
            <input
              type='text'
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              placeholder='Ej: VERANO'
              disabled={!!appliedDiscount}
              className='flex-1 border border-gray-300 rounded-lg px-3 py-2 text-custom-black disabled:bg-gray-100'
            />
            {appliedDiscount ? (
              <button
                type='button'
                onClick={handleRemoveDiscount}
                className='bg-gray-600 text-white font-bold py-2 px-4 rounded-lg'
              >
                Quitar
              </button>
            ) : (
              <button
                type='button'
                onClick={handleApplyDiscount}
                disabled={discountLoading}
                className={`bg-custom-green3 text-black font-bold py-2 px-4 rounded-lg ${
                  discountLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {discountLoading ? 'Validando...' : 'Aplicar'}
              </button>
            )}
          </div>
          {discountError && (
            <p className='text-red-600 text-sm mt-2'>{discountError}</p>
          )}
          {appliedDiscount && (
            <div className='mt-3 text-sm text-custom-black space-y-1'>
              <p>
                Código <span className='font-bold'>{appliedDiscount.code}</span>:{' '}
                {appliedDiscount.percent}% de descuento
              </p>
              <p>
                Subtotal: ${' '}
                {cartTotalPrice.toFixed(2).toLocaleString('es-ES')}
              </p>
              <p className='font-bold'>
                Total con descuento: ${' '}
                {totalPrice.toFixed(2).toLocaleString('es-ES')}
              </p>
            </div>
          )}
        </div>
      )}

      <form className='space-y-4 mx-4 md:mx-6'>
        <div className='flex flex-col gap-0 bg-white rounded-md'>
          <label
            className={`block text-custom-black font-semibold p-4 py-6 rounded-md cursor-pointer ${
              selectedMethod === 'transfer' ? 'border-2 border-custom-green3' : ''
            } ${
              orderConfirmed && selectedMethod === 'installments'
                ? 'text-gray-600'
                : 'text-custom-black'
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
              selectedMethod === 'installments' ? 'border-2 border-custom-green3' : ''
            } ${
              orderConfirmed && selectedMethod === 'transfer'
                ? 'text-gray-600'
                : 'text-custom-black'
            }`}
          >
            <div className='flex items-center mb-2'>
              <input
                type='radio'
                name='paymentMethod'
                value='installments'
                checked={selectedMethod === 'installments'}
                onChange={() => handleMethodChange('installments')}
                className='mr-2 accent-gray-500'
                disabled={totalPrice === 0 || orderConfirmed}
              />
              Pago en cuotas con tarjeta de crédito:
            </div>
            <br />
            <div className='ml-6 space-y-2 font-normal'>
              <div>
                <span className='font-semibold'>
                  <span>💳</span> 3 cuotas de
                </span>{' '}
                ${' '}
                {((totalPrice * (1 + rate3 / 100)) / 3).toFixed(2).toLocaleString('es-ES')}
                &nbsp;- Total: ${' '}
                {(totalPrice * (1 + rate3 / 100)).toFixed(2).toLocaleString('es-ES')}
              </div>
              <div>
                <span className='font-semibold'>💳 {cantCuotas || 6} cuotas de</span> ${' '}
                {((totalPrice * (1 + rate6 / 100)) / (cantCuotas || 6))
                  .toFixed(2)
                  .toLocaleString('es-ES')}
                &nbsp;- Total: ${' '}
                {(totalPrice * (1 + rate6 / 100)).toFixed(2).toLocaleString('es-ES')}
              </div>
            </div>
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
                          <h2 className='text-lg font-bold mt-8'>Resumen de su orden:</h2>
                          {cartItems.map((item, index) => (
                            <div key={index} className='mt-2'>
                              <p>
                                {item.quantity} x {item.name} - ${' '}
                                {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                          {appliedDiscount && (
                            <p className='mt-4'>
                              Descuento ({appliedDiscount.code}): -{appliedDiscount.percent}%
                            </p>
                          )}
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
                              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-95 active:scale-90'
                            }`}
                            onClick={handleConfirmTransferOrder}
                            disabled={isLoading}
                          >
                            <span className='invisible'>Pre-confirmar (voy a transferir)</span>
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
                        Orden {orderNumber} pre-confirmada. Ya recibimos su pedido. Prosiga con el
                        siguiente paso para confirmarla.
                      </p>
                    )}
                  </li>
                  <li>
                    Realice una transferencia bancaria por&nbsp;$&nbsp;
                    {totalPrice.toFixed(2).toLocaleString('es-ES')} a la siguiente cuenta: <br />
                    <span className='block mt-4'>Alias:&nbsp; {alias}</span>
                    <span className='block'>CBU:&nbsp; {cvu}</span>
                    <span className='block'>A nombre de:&nbsp; {aNombreDe}</span>
                    <span className='block mb-4'>CUIT:&nbsp; {cuit}</span>
                  </li>
                  <li>
                    Envíe el comprobante a nuestro número de WhatsApp:{' '}
                    <a
                      href={`https://wa.me/549${whatsappNumber}`}
                      className='text-custom-green3 underline'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {whatsappNumber}
                    </a>
                    .<br />
                    Una vez que recibamos el comprobante, la orden queda confirmada. Un
                    representante comercial te confirmará la recepción del pago.
                  </li>
                </ol>
              </>
            ) : (
              <>
                <p className='text-center'>
                  Puede proceder al pago en cuotas seleccionando el botón a continuación.
                </p>
                <div className='flex justify-center'>
                  <button
                    type='button'
                    className={`relative w-full md:max-w-96 bg-custom-green3 text-black font-bold py-2 rounded-lg mt-4 transition-transform transform ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-95 active:scale-90'
                    }`}
                    onClick={handleConfirmInstallmentsOrder}
                    disabled={isLoading}
                  >
                    <span className='invisible'>Proceder al pago en cuotas</span>
                    <span className='absolute inset-0 flex items-center justify-center'>
                      {isLoading ? (
                        <div className='flex items-center'>
                          <div
                            className='animate-spin border-b-2 border-black rounded-lg'
                            style={{ width: '1rem', height: '1rem' }}
                          ></div>
                          <span className='ml-2'>Procesando...</span>
                        </div>
                      ) : (
                        'Proceder al pago en cuotas'
                      )}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </form>
    </main>
  );
}
