'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function PaymentMethod() {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setOrderConfirmed(false); // Reiniciar el estado de confirmación al cambiar de método
  };

  const handleConfirmOrder = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const orderData = userData; // Ya es un objeto
    orderData.cart = cartItems; // Ahora puedes agregar la propiedad 'cart'
    const { data } = await axios.post('/orders', orderData,{headers: { 'Content-Type': 'application/json' }});
    console.log(data);
    // setOrderNumber(data.id);
    // setOrderConfirmed(true);
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
        {/* Contenedor común para las opciones */}
        <div className='flex flex-col gap-0 bg-gray-800 rounded-md'>
          {/* Opción 1: Transferencia bancaria */}
          <label
            className={`block text-white font-semibold p-4 py-6 rounded-md cursor-pointer ${
              selectedMethod === 'transfer' ? 'border-2 border-yellow-400' : ''
            }`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='transfer'
              checked={selectedMethod === 'transfer'}
              onChange={() => handleMethodChange('transfer')}
              className='mr-2 accent-gray-500'
            />
            Pago por transferencia bancaria: &nbsp;&nbsp;$&nbsp;
            {totalPrice.toFixed(2).toLocaleString('es-ES')}
          </label>

          {/* Opción 2: Pago en cuotas */}
          <label
            className={`block text-white font-semibold p-4 rounded-md cursor-pointer py-6 ${
              selectedMethod === 'installments'
                ? 'border-2 border-yellow-400'
                : ''
            }`}
          >
            <input
              type='radio'
              name='paymentMethod'
              value='installments'
              checked={selectedMethod === 'installments'}
              onChange={() => handleMethodChange('installments')}
              className='mr-2 accent-gray-500'
            />
            Pago en {cantCuotas} cuotas de: &nbsp;$&nbsp;
            {
              ((totalPrice * (1 + recargoCuotas)) / cantCuotas)
                .toFixed(2) // Redondea a 2 decimales
                .toLocaleString('es-ES') // Formatea el número según el idioma
            }
            &nbsp; - Total &nbsp;$&nbsp;
            {
              (totalPrice * (1 + recargoCuotas))
                .toFixed(2) // Redondea a 2 decimales
                .toLocaleString('es-ES') // Formatea el número según el idioma
            }
          </label>
        </div>

        {/* Contenido de la opción seleccionada */}
        {selectedMethod && (
          <div className={`mt-6 p-4 rounded-md bg-gray-800 text-white`}>
            {selectedMethod === 'transfer' ? (
              <>
                <p>Siga los pasos a continuación para completar el pago:</p>
                <ol className='list-decimal pl-5 mt-8 space-y-1'>
                  {/* Resumen de la orden y botones de confirmación */}
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
                            onClick={() => setSelectedMethod(null)} // Cancelar y volver a la selección de método
                          >
                            Cancelar
                          </button>
                          <button
                            type='button'
                            className='bg-green-500 text-white font-bold py-2 px-4 rounded-lg max-w-44 md:max-w-96'
                            onClick={handleConfirmOrder}
                          >
                            Pre-confirmar (voy a transferir)
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
                    .<br></br>
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
                  onClick={() => alert('Redirigiendo al pago en cuotas...')}
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
