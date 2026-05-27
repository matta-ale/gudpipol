import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';

export default function Cart() {
  const productQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className='relative flex items-center justify-center w-10 h-10'>
      <FaShoppingCart className='text-custom-black text-2xl' />

      {productQuantity > 0 && (
        <span
          className='absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-custom-green text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white leading-none'
        >
          {productQuantity > 99 ? '99+' : productQuantity}
        </span>
      )}
    </div>
  );
}
