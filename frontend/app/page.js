'use client';
import { React, useEffect } from 'react';
import Link from 'next/link';
import {getFavoriteProducts, getProducts } from './redux/features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteProductsContainer from './components/FavoriteProductsContainer';


export default function HomePage() {
  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.products.myProducts);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getFavoriteProducts());
      dispatch(getProducts());
    };
    fetchData();
  }, [dispatch]);
  
  const instagramPost1 = process.env.NEXT_PUBLIC_INSTAGRAM_POST_1
  const instagramPost2 = process.env.NEXT_PUBLIC_INSTAGRAM_POST_2
  const instagramPost3 = process.env.NEXT_PUBLIC_INSTAGRAM_POST_3
  return (
    <div className='text-black'>
      {/* HERO */}
      <section
        className='relative h-[90vh] bg-cover bg-center flex items-center justify-center  mt-44'
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/di7oltk6y/image/upload/v1751900199/IMG_2930_chpmeq.jpg)',
        }}
      >
        <div className='bg-black bg-opacity-50 p-8 rounded-2xl shadow-2xl text-center max-w-2xl h-80 flex flex-col justify-between'>
          <h1 className='text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight'>
            Muebles sustentables para disfrutar sin mantenimiento
          </h1>
          <div className='flex justify-center gap-4 flex-wrap'>
            <Link
              href='/products'
              className='bg-custom-green3 text-white px-6 py-3 rounded-full text-lg hover:bg-custom-green4 transition font-bold'
            >
              Ver productos
            </Link>
            <Link
              href='/aboutUs'
              className='bg-white text-custom-green3 px-6 py-3 rounded-full text-lg hover:bg-gray-200 transition font-bold'
            >
              Quienes somos
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className='py-16 px-6 sm:px-12 bg-gray-200'>
        <div className='max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-gray-700'>
          <div>
            <p className='text-5xl'>♻️</p>
            <p className='font-semibold mt-6'>100% Plástico reciclado</p>
          </div>
          <div>
            <p className='text-5xl'>💪</p>
            <p className='font-semibold mt-6'>Resistentes y duraderos</p>
          </div>
          <div>
            <p className='text-5xl'>🌧️</p>
            <p className='font-semibold mt-6'>Aptos todo clima</p>
          </div>
          <div>
            <p className='text-5xl'>
              <p>💸</p>
            </p>
            <p className='font-semibold mt-6'>Sin costos de mantenimiento</p>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className='py-16 px-6 sm:px-12 bg-gray-100'>
        <div className='max-w-6xl mx-auto text-left space-y-8'>
          <h2 className='text-4xl font-bold text-gray-700 text-center'>
            Productos destacados
          </h2>
          <br></br>
          <FavoriteProductsContainer products={myProducts} />
        </div>
      </section>

      {/* NOSOTROS PREVIEW */}
      <section className='py-16 px-6 sm:px-12 bg-gray-50'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h2 className='text-4xl font-bold text-gray-700'>
            Transformamos residuos en espacios con vida
          </h2>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Desde muebles funcionales hasta diseño consciente. En Gudpipol
            creemos en las segundas oportunidades y en la belleza de lo simple.
          </p>
          <Link
            href='/nosotros'
            className='inline-block text-custom-green3 font-semibold underline hover:text-custom-green4 transition'
          >
            Conocé más sobre nosotros →
          </Link>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className='py-16 px-6 sm:px-12 bg-white'>
        <div className='max-w-6xl mx-auto text-center space-y-6'>
          <h2 className='text-4xl font-bold text-gray-700'>
            Seguinos en Instagram
          </h2>
          <br></br>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
            <div className='aspect-[4/5] w-full'>
              <iframe
                src={instagramPost1}
                className='w-full h-full rounded-xl shadow-lg'
                frameBorder='0'
                scrolling='no'
                allowTransparency
              ></iframe>
            </div>
            <div className='aspect-[4/5] w-full'>
              <iframe
                src={instagramPost2}
                className='w-full h-full rounded-xl shadow-lg'
                frameBorder='0'
                scrolling='no'
                allowTransparency
              ></iframe>
            </div>
            <div className='aspect-[4/5] w-full'>
              <iframe
                src={instagramPost3}
                className='w-full h-full rounded-xl shadow-lg'
                frameBorder='0'
                scrolling='no'
                allowTransparency
              ></iframe>
            </div>
          </div>

          {/* Botón "Ver más" */}
          <div className='mt-10'>
            <a
              href='https://www.instagram.com/gudpipolok/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-custom-green3 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-custom-green4 transition'
            >
              Ver más en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className='bg-custom-green3 text-white py-16 text-center px-4'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
          Explorá nuestra colección completa
        </h2>
        <Link
          href='/productos'
          className='inline-block bg-white text-custom-green3 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition'
        >
          Ver todos los productos
        </Link>
      </section>
    </div>
  );
}
