'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();
  
  if (cartItems.length === 0) {
    return (
      <div
      className=' flex flex-col justify-center w-[320px] md:w-[544px] h-64 mx-auto mt-28 md:mt-56 md:mb-16 py-6 rounded-lg items-center text-center text-white font-semibold text-xl'
      style={{ backgroundColor: 'rgba(45, 46, 50, 0.75)' }}
      >
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
    <main
      className='w-[320px] md:w-[544px] mx-auto mt-60 md:mt-56 py-6 rounded-lg'
      style={{ backgroundColor: 'rgba(45, 46, 50, 0.75)' }}
    >
      <h1 className='text-white text-2xl mx-7 mb-6 font-bold'>
        Carrito de compras
      </h1>
      {cartItems.map((item) => (
        <CartItem item={item} />
      ))}

      {/* Total Price Section */}
      <div className='bg-custom-black text-white p-4 rounded-lg shadow-md mt-6 mx-6'>
        <div className='flex justify-between items-center'>
          <span className='text-lg font-bold'>Total:</span>
          <div className='flex items-center bg-custom-black-2 h-9 w-32 rounded-full justify-around mr-[54px]'>
            <span className='text-md font-bold'>
              $ {calculateTotal().toLocaleString('es-ES')}
            </span>
          </div>
        </div>
        <button
          onClick={checkout}
          className='mt-4 w-full bg-yellow-400 text-black font-bold py-2 rounded-lg'
        >
          Proceder al Pago
        </button>
      </div>
    </main>
  );
}
