'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import placeholderImage from '../../public/img/No-Image-Placeholder.svg';
import Link from 'next/link';
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa';
import { addItemToCart } from '../redux/features/cart/cartSlice';

const PHONE = '5493415924709';

const ProductCard = (product) => {
  const dispatch = useDispatch();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const rate6 = process.env.NEXT_PUBLIC_RATE_6_CUOTAS;

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : placeholderImage;

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        collection: product.collection.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0]?.url || '',
        color: 'Marron',
      }),
    );
  };

  const waMessage = encodeURIComponent(
    `Hola! Me interesa el producto *${product.name}* (${product.collection.name}). ¿Me pueden dar más información?`,
  );

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }
    window.open(
      `https://wa.me/${PHONE}?text=${waMessage}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <Link
      href={`/detail/${product.id}`}
      className='group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 w-[300px] md:w-[270px] flex flex-col border border-gray-100 cursor-pointer'
    >
      {/* Imagen */}
      <div
        className='relative w-full overflow-hidden'
        style={{ aspectRatio: '4/3' }}
      >
        {/* Badge destacado */}
        {product.isDestacado && (
          <span className='absolute top-3 left-3 z-10 bg-custom-green5 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm'>
            Destacado
          </span>
        )}

        {!isImageLoaded && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-100 z-10'>
            <div className='w-8 h-8 border-4 border-custom-green3 border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}

        <Image
          src={imageUrl}
          alt={product.name}
          layout='fill'
          objectFit='cover'
          className={`transition-all duration-500 group-hover:scale-105 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          placeholder='blur'
          blurDataURL='/img/No-Image-Placeholder.svg'
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Overlay hover */}
        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center'>
          <span className='text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-black/50 backdrop-blur-sm px-4 py-1.5 rounded-full'>
            Ver detalle →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className='flex flex-col flex-1 px-4 pt-3 pb-1 gap-1.5'>
        <p className='text-[10px] font-bold text-custom-green4 uppercase tracking-widest'>
          {product.collection.name}
        </p>
        <h3 className='text-base font-bold text-custom-black leading-tight'>
          {product.name}
        </h3>
        <div className='mt-1'>
          <p className='text-xl font-semibold text-custom-black'>
            $ {product.price.toLocaleString('es-ES')}
          </p>
          <p className='text-[11px] text-gray-400'>
            o 6 cuotas de ${' '}
            {Math.round((product.price * (1 + rate6 / 100)) / 6).toLocaleString(
              'es-ES',
            )}
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className='px-4 pb-4 pt-3 flex gap-2'>
        <button
          onClick={addToCart}
          className='flex-1 flex items-center justify-center gap-1.5 bg-custom-green3 hover:bg-custom-green5 text-white text-[11px] font-bold rounded-xl h-9 transition-colors shadow-sm'
        >
          <FaShoppingCart size={12} />
          Carrito
        </button>
        <button
          onClick={handleWhatsApp}
          className='flex-1 flex items-center justify-center gap-1.5 bg-[#1da850] hover:bg-[#0c7e34] text-white text-[11px] font-bold rounded-xl h-9 transition-colors shadow-sm'
        >
          <FaWhatsapp size={13} />
          WhatsApp
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
