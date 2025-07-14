'use client'
import SmallColorSelector from '../components/SmallColorSelector';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import Image from 'next/image';

export default function CartItem({ item }) {
  const productQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  
  const handleRemoveItem = (id) => {
    dispatch({ type: 'cart/removeItemFromCart', payload: id });
  };

  return (
    <div
      key={item.id}
      className='sm:h-[150px] grid grid-cols-2 md:grid-cols-[120px_130px_200px] gap-4 mb-6 text-custom-black bg-white p-4 rounded-lg shadow-md relative z-50 mx-6 border-2'
    >
      {/* Trash Icon */}
      <button
        onClick={() => handleRemoveItem(item.id)}
        className='absolute top-3 right-3 text-gray-400 hover:text-yellow-400'
      >
        <FaTrashAlt size={16} />
      </button>

      {/* Image Section */}
      <div className='relative h-[110px] w-28 mt-1 ml-2'>
        <Image
          src={item.image}
          layout='fill'
          objectFit='cover'
          alt={item.name}
          className='rounded-lg'
        />
      </div>

      {/* Controls: Quantity and Color Selector */}
      <div className='flex md:flex-col md:items-center justify-between h-[118px] mt-[-2px]'>
        <div className='flex-col items-center'>
          <div className='mt-1'>
            <SmallColorSelector item={item} />
          </div>
          <span className='ml-2 text-xs font-semibold mb-0'>CANTIDAD</span>
          <div className='flex items-center bg-gray-600 h-9 w-20 rounded-full justify-around'>
            <button
              onClick={() => {
                dispatch({
                  type: 'cart/decreaseQuantity',
                  payload: item.id,
                });
              }}
              className='text-white font-bold'
            >
              -
            </button>
            <span className=' text-white'>{item.quantity}</span>
            <button
              onClick={() =>
                dispatch({
                  type: 'cart/increaseQuantity',
                  payload: item.id,
                })
              }
              className='text-white  font-bold'
            >
              +
            </button>
          </div>
        </div>
      </div>
      {/* Product Info Section */}
      <div className='flex md:flex-col justify-between'>
        <div>
          <p className='text-custom-black text-sm'>{item.collection}</p>
          <h2 className='text-md font-bold'>{item.name}</h2>
        </div>
        <div className='flex items-center bg-gray-600 text-white h-9 w-32 rounded-full justify-around'>
          <p className='font-semibold text-md'>
            $ {(item.price * item.quantity).toLocaleString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
}
