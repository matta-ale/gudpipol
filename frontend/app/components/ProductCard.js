'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import placeholderImage from '../../public/img/No-Image-Placeholder.svg';
import Link from 'next/link';
import { addItemToCart } from '../redux/features/cart/cartSlice';

const ProductCard = (product) => {
  const dispatch = useDispatch();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const rate6 = process.env.NEXT_PUBLIC_RATE_6_CUOTAS;

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : placeholderImage;

  const addToCart = async () => {
    dispatch(addItemToCart({
      id: product.id,
      name: product.name,
      collection: product.collection.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0]?.url || '',
      color: 'Marron',
    }));
  };

  return (
    <div className='bg-white shadow-2xl shadow-black p-0 h-[430px] w-[280px] text-custom-black transform transition-transform duration-300 hover:scale-105'>
      <div className='relative h-[220px] w-[280px] flex items-center justify-center bg-gray-200'>
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-4 border-custom-green4 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={imageUrl}
          alt={product.name}
          layout='fill'
          objectFit='cover'
          className={`transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          placeholder='blur'
          blurDataURL='/img/No-Image-Placeholder.svg'
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      <div className='flex flex-col justify-between h-[150px] pb-2 pt-2'>
        <div className='flex flex-col pt-1'>
          <h3 className='text-xs font-semibold text-custom-black px-4'>
            {product.collection.name}
          </h3>
          <h3 className='text-xl font-semibold px-4'>{product.name}</h3>
        </div>
        <div className='flex justify-between items-center mt-1 mx-2 pt-1 px-2'>
          <span className='text-lg font-semibold'>
            $ {product.price.toLocaleString('es-ES')}
          </span>
        </div>
        <p className='ml-4 text-xs text-custom-black'>
            (6 cuotas de ${' '}
            {Math.round((product.price * (1 + rate6 / 100)) / 6).toLocaleString(
              'es-ES'
            )}
            )
        </p>
        <div className='flex justify-center items-center mt-2 w-full'>
          <div className='flex flex-col gap-2'>
            <Link href={`/detail/${product.id}`}>
              <button className='text-white text-xs font-bold bg-custom-black rounded-2xl h-8 w-64 py-1'>
                DETALLE
              </button>
            </Link>
            <button
              onClick={addToCart}
              className='text-black text-xs font-bold bg-custom-green3 rounded-2xl h-8 w-64 py-1 mb-2'
            >
              AGREGAR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
