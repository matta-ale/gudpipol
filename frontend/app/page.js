'use client';
import { React, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  getFavoriteProducts,
  getProducts,
} from './redux/features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteProductsContainer from './components/FavoriteProductsContainer';

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const myProducts = useSelector((state) => state.products.myProducts);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingAbout, setIsLoadingAbout] = useState(false);
  const [isLoadingInstagram, setIsLoadingInstagram] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
      dispatch(getFavoriteProducts());
    };
    fetchData();
  }, [dispatch]);

  
  const favorites = useSelector(
    (state) => state.products.favoriteProducts
  );

  const handleProductsClick = async (e) => {
    e.preventDefault();
    setIsLoadingProducts(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((resolve) => setTimeout(resolve, 500)); // Reduced delay
    router.push('/products');
    setIsLoadingProducts(false);
  };

  const handleAboutClick = async (e) => {
    e.preventDefault();
    setIsLoadingAbout(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((resolve) => setTimeout(resolve, 500)); // Reduced delay
    router.push('/aboutUs');
    setIsLoadingAbout(false);
  };

  const handleInstagramClick = async (e) => {
    setIsLoadingInstagram(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoadingInstagram(false);
  };

  const instagramPost1 = process.env.NEXT_PUBLIC_INSTAGRAM_POST_1;
  const instagramPost2 = process.env.NEXT_PUBLIC_INSTAGRAM_POST_2;
  const instagramPost3 = process.env.NEXT_PUBLIC_INSTAGRAM_POST_3;

  return (
    <div className='text-black'>
      <section
        className='hidden md:flex relative h-[90vh] bg-cover bg-center items-center justify-center mt-44'
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/di7oltk6y/image/upload/v1753878375/home_ztb51w.webp)',
        }}
      >
        <div className='bg-black bg-opacity-50 p-8 rounded-2xl shadow-2xl text-center max-w-2xl h-80 flex flex-col justify-between'>
          <h1 className='text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight'>
            Muebles sustentables para disfrutar sin mantenimiento
          </h1>
          <div className='flex justify-center gap-4 flex-wrap'>
            <Link
              href='/products'
              onClick={handleProductsClick}
              className={`bg-custom-green3 w-52 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-custom-green4 active:animate-press transition-all duration-200 shadow-lg flex items-center justify-center ${
                isLoadingProducts ? 'cursor-not-allowed opacity-75' : ''
              }`}
            >
              {isLoadingProducts ? (
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                'Ver productos'
              )}
            </Link>
            <Link
              href='/aboutUs'
              onClick={handleAboutClick}
              className={`bg-white w-52 text-custom-green3 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 active:animate-press transition-all duration-200 shadow-lg flex items-center justify-center ${
                isLoadingAbout ? 'cursor-not-allowed opacity-75' : ''
              }`}
            >
              {isLoadingAbout ? (
                <svg
                  className='animate-spin h-5 w-5 text-custom-green3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                'Quienes somos'
              )}
            </Link>
          </div>
        </div>
      </section>
      {/* Mobile */}
      <section
        className='flex md:hidden relative h-[90vh] bg-no-repeat bg-contain bg-center items-center justify-center mt-[-40px]'
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/di7oltk6y/image/upload/v1753879098/Home-mobile_nuxo6m.webp)',
        }}
      >
        <div className='bg-black bg-opacity-40 p-6 rounded-2xl shadow-2xl text-center max-w-md h-80 flex flex-col justify-between mx-4'>
          <h1 className='text-3xl font-bold text-white mb-4 leading-tight'>
            Muebles sustentables para disfrutar sin mantenimiento
          </h1>
          <div className='flex justify-center gap-3 flex-wrap'>
            <Link
              href='/products'
              onClick={handleProductsClick}
              className={`bg-custom-green3 w-52 text-white px-5 py-2 rounded-full text-base font-semibold hover:bg-custom-green4 active:animate-press focus:ring-4 focus:ring-custom-green4 transition-all duration-200 shadow-lg flex items-center justify-center ${
                isLoadingProducts ? 'cursor-not-allowed opacity-75' : ''
              }`}
            >
              {isLoadingProducts ? (
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                'Ver productos'
              )}
            </Link>
            <Link
              href='/aboutUs'
              onClick={handleAboutClick}
              className={`bg-white w-52 text-custom-green3 px-5 py-2 rounded-full text-base font-semibold hover:bg-gray-200 active:animate-press focus:ring-4 focus:ring-custom-green4 transition-all duration-200 shadow-lg flex items-center justify-center ${
                isLoadingAbout ? 'cursor-not-allowed opacity-75' : ''
              }`}
            >
              {isLoadingAbout ? (
                <svg
                  className='animate-spin h-5 w-5 text-custom-green3'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                'Quienes somos'
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className='py-16 px-6 sm:px-12 bg-gray-200 my-[-120px] mb-2 md:my-0'>
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
      <section className='py-16 md:px-12 bg-gray-100'>
        <div className='max-w-6xl mx-auto text-left space-y-8'>
          <h2 className='text-4xl font-bold text-gray-700 text-center'>
            Productos destacados
          </h2>
          <br />
          <FavoriteProductsContainer products={favorites} />
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
            href='/aboutUs'
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
          <br />
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
          <div className='mt-10 flex justify-center'>
            <a
              href='https://www.instagram.com/gudpipolok/'
              target='_blank'
              rel='noopener noreferrer'
              onClick={handleInstagramClick}
              className={`inline-block bg-custom-green3 mt-8 h-12 w-60 text-white px-4 py-2.5 rounded-full text-base font-semibold hover:bg-custom-green4 active:animate-press transition-all duration-200 shadow-lg flex items-center justify-center ${
                isLoadingInstagram ? 'cursor-not-allowed opacity-75' : ''
              }`}
            >
              {isLoadingInstagram ? (
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                'Ver más en Instagram'
              )}
            </a>
          </div>
        </div>
      </section>
      {/* CTA FINAL */}
      <section className='bg-custom-green3 text-white py-16 text-center px-4 flex flex-col justify-evenly items-center'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
          Explorá nuestra colección completa
        </h2>
        <Link
          href='/productos'
          onClick={handleProductsClick}
          className={`bg-white w-64 h-12 text-custom-green3 px-4 py-2.5 rounded-full text-base font-semibold hover:bg-gray-200 active:animate-press transition-all duration-200 shadow-lg flex items-center justify-center ${
            isLoadingProducts ? 'cursor-not-allowed opacity-75' : ''
          }`}
        >
          {isLoadingProducts ? (
            <svg
              className='animate-spin h-5 w-5 text-custom-green3'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          ) : (
            'Ver todos los productos'
          )}
        </Link>
      </section>
    </div>
  );
}