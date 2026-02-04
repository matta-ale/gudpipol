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
      className='mb-6 text-custom-black bg-white p-4 rounded-lg shadow-md relative z-50 mx-6 border-2'
    >
      {/* Trash Icon */}
      <button
        onClick={() => handleRemoveItem(item.id)}
        className='absolute top-3 right-3 text-gray-400 hover:text-yellow-400 z-10'
      >
        <FaTrashAlt size={16} />
      </button>

      {/* MOBILE LAYOUT */}
      <div className='md:hidden'>
        {/* Header: Image + Title + Price */}
        <div className='flex gap-3 mb-4'>
          
          <div className='relative h-[100px] w-[100px] flex-shrink-0'>
            <Image
              src={item.image}
              layout='fill'
              objectFit='cover'
              alt={item.name}
              className='rounded-lg'
            />
          </div>
          <div className='flex-1 flex flex-col justify-between pr-6'>
            <div>
              <p className='text-xs text-gray-500 mb-1'>{item.collection}</p>
              <h2 className='text-base font-bold'>{item.name}</h2>
            </div>
            
            <div className='flex items-center bg-gray-600 text-white h-9 w-36 rounded-full justify-center self-start ml-6'>
              <p className='font-semibold text-sm'>
                $ {(item.price * item.quantity).toLocaleString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        {/* Controls Row: Color + Quantity */}
        <div className='flex items-end justify-between pt-3 border-t border-gray-100'>
          <SmallColorSelector item={item} />
          
          <div className='flex flex-col items-center'>
            <span className='text-xs font-semibold text-gray-700 mb-1'>CANTIDAD</span>
            <div className='flex items-center bg-gray-600 h-9 w-28 rounded-full justify-around'>
              <button
                onClick={() => {
                  dispatch({
                    type: 'cart/decreaseQuantity',
                    payload: item.id,
                  });
                }}
                className='text-white font-bold text-lg'
              >
                -
              </button>
              <span className='text-white font-semibold'>{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch({
                    type: 'cart/increaseQuantity',
                    payload: item.id,
                  })
                }
                className='text-white font-bold text-lg'
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className='hidden md:grid md:grid-cols-[120px_130px_1fr] gap-4'>
        {/* Image Section */}
        <div className='relative h-[110px] w-28'>
          <Image
            src={item.image}
            layout='fill'
            objectFit='cover'
            alt={item.name}
            className='rounded-lg'
          />
        </div>

        {/* Controls: Quantity and Color Selector */}
        <div className='flex flex-col items-center justify-between h-[118px]'>
          <div className='flex-col items-center'>
            <div className='mt-1'>
              <SmallColorSelector item={item} />
            </div>
            <span className='ml-2 text-xs font-semibold mb-0 text-gray-00'>CANTIDAD</span>
            <div className='flex items-center bg-gray-600 h-9 w-28 rounded-full justify-around'>
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
              <span className='text-white'>{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch({
                    type: 'cart/increaseQuantity',
                    payload: item.id,
                  })
                }
                className='text-white font-bold'
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className='flex flex-col justify-between'>
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
    </div>
  );
}