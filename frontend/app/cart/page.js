'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { FaWhatsapp, FaBox, FaCity, FaTruck } from 'react-icons/fa';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();
  const costoEnvíoRosario = process.env.NEXT_PUBLIC_COSTO_ENVIO_ROSARIO;
  const semanasEntrega = process.env.NEXT_PUBLIC_SEMANAS_ENTREGA;

  if (cartItems.length === 0) {
    return (
      <div className='flex flex-col justify-center w-[320px] md:w-[544px] h-64 mx-auto mt-28 md:mt-56 md:mb-16 py-6 rounded-lg items-center text-center text-custom-black bg-white font-semibold text-xl'>
        <p>Tu carrito está vacío</p>
      </div>
    );
  }

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const checkout = async () => {
    router.push('/checkout');
  };

  return (
    <main className='w-[360px] md:w-[544px] mx-auto mt-60 md:mt-56 py-6 rounded-lg bg-white'>
      <h1 className='text-custom-black text-2xl mx-7 mb-6 font-bold'>
        Carrito de compras
      </h1>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}


      {/* Total Price Section */}
      <div className='text-custom-black bg-white p-6 rounded-lg shadow-md mt-6 mx-6 border-2'>
        {/* Delivery Information with improved design */}
        <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200'>
          {/* Plazo de entrega */}
          <div className='flex items-start mb-4 pb-4 border-b border-green-200'>
            <div className='min-w-[40px] h-[40px] bg-custom-green3 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
              <FaBox className='text-white text-lg' />
            </div>
            <div className='flex-1'>
              <div className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>
                Plazo de entrega
              </div>
              <div className='text-base font-semibold text-gray-800'>
                {semanasEntrega} semanas aprox.
              </div>
            </div>
          </div>

          {/* Costo envío Rosario */}
          <div className='flex items-start mb-4 pb-4 border-b border-green-200'>
            <div className='min-w-[40px] h-[40px] bg-custom-green3 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
              <FaTruck className='text-white text-lg' />
            </div>
            <div className='flex-1'>
              <div className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>
                Costo de envío Rosario
              </div>
              <div className='text-base font-semibold text-gray-800'>
                $ {parseFloat(costoEnvíoRosario).toLocaleString('es-ES')}
              </div>
            </div>
          </div>

          {/* Costo envío resto del país */}
          <div className='flex items-start'>
            <div className='min-w-[40px] h-[40px] bg-custom-green3 rounded-lg flex items-center justify-center mr-4 flex-shrink-0'>
              <FaTruck className='text-white text-lg' />
            </div>
            <div className='flex-1'>
              <div className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>
                Costo de envío resto del país
              </div>
              <a
                href='https://wa.me/5493415924709?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20sus%20muebles'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-green-200 hover:bg-green-200 text-green-600 font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:translate-x-1'
              >
                <FaWhatsapp className='text-lg' />
                <span className="text-sm">Consultar</span>
              </a>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center my-6'>
          <span className='text-2xl font-bold'>Total:</span>
          <div className='flex items-center bg-gray-600 px-8 py-3 rounded-full text-white'>
            <span className='text-xl font-semibold'>
              $ {calculateTotal().toLocaleString('es-ES')}
            </span>
          </div>
        </div>
        
        <button
          onClick={checkout}
          className='mb-8 w-full bg-custom-green3 text-white font-semibold py-4 rounded-xl hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
        >
          Proceder al Pago
        </button>
      </div>
    </main>
  );
}