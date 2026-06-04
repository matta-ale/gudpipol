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
import HeroCarousel from './components/HeroCarousel';

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const myProducts = useSelector((state) => state.products.myProducts);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
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
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push('/products');
    setIsLoadingProducts(false);
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
      <HeroCarousel />

      {/* BENEFICIOS */}
      <section className='bg-custom-green5 py-12 px-6 sm:px-12'>
        <div className='max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0'>
          <div className='flex flex-col items-center text-center px-6 py-4 gap-3 border-r border-b md:border-b-0 border-white/10'>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-7 h-7 text-custom-green3' fill='none' viewBox='0 0 24 24' strokeWidth={1.6} stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99' />
            </svg>
            <p className='text-white font-semibold text-sm leading-snug'>100% Plástico reciclado</p>
          </div>
          <div className='flex flex-col items-center text-center px-6 py-4 gap-3 border-b md:border-b-0 md:border-r border-white/10'>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-7 h-7 text-custom-green3' fill='none' viewBox='0 0 24 24' strokeWidth={1.6} stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z' />
            </svg>
            <p className='text-white font-semibold text-sm leading-snug'>Resistentes y duraderos</p>
          </div>
          <div className='flex flex-col items-center text-center px-6 py-4 gap-3 border-r md:border-r border-white/10'>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-7 h-7 text-custom-green3' fill='none' viewBox='0 0 24 24' strokeWidth={1.6} stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z' />
            </svg>
            <p className='text-white font-semibold text-sm leading-snug'>Aptos todo clima</p>
          </div>
          <div className='flex flex-col items-center text-center px-6 py-4 gap-3'>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-7 h-7 text-custom-green3' fill='none' viewBox='0 0 24 24' strokeWidth={1.6} stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z' />
            </svg>
            <p className='text-white font-semibold text-sm leading-snug'>Sin costos de mantenimiento</p>
          </div>
        </div>
      </section>
      {/* DESTACADOS */}
      <section className='bg-white py-14 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex items-end justify-between mb-2 px-4 md:px-14'>
            <div>
              <p className='text-xs font-semibold tracking-widest uppercase text-custom-green3 mb-1'>Selección</p>
              <h2 className='text-3xl md:text-4xl font-extrabold text-custom-green5 leading-tight'>
                Productos destacados
              </h2>
            </div>
            <Link
              href='/products/destacados'
              className='hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-custom-green4 hover:text-custom-green5 transition-colors whitespace-nowrap'
            >
              Ver todos →
            </Link>
          </div>
          <FavoriteProductsContainer products={favorites} />
          <div className='flex justify-center mt-2 sm:hidden'>
            <Link
              href='/products/destacados'
              className='text-sm font-semibold text-custom-green4 hover:text-custom-green5 transition-colors'
            >
              Ver todos los destacados →
            </Link>
          </div>
        </div>
      </section>
      {/* NOSOTROS PREVIEW */}
      <section className='bg-gray-50 py-16 px-6 sm:px-12'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-xs font-semibold tracking-widest uppercase text-custom-green3 mb-3'>Quiénes somos</p>
          <h2 className='text-3xl md:text-4xl font-extrabold text-custom-green5 leading-tight mb-5'>
            Transformamos residuos en espacios con vida
          </h2>
          <p className='text-base md:text-lg text-gray-500 leading-relaxed mb-8'>
            Desde muebles funcionales hasta diseño consciente. En Gudpipol
            creemos en las segundas oportunidades y en la belleza de lo simple.
          </p>
          <Link
            href='/aboutUs'
            className='inline-flex items-center gap-2 bg-custom-green5 hover:bg-custom-green4 active:scale-95 transition-all duration-200 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md'
          >
            Conocé más sobre nosotros →
          </Link>
        </div>
      </section>
      {/* INSTAGRAM */}
      <section className='bg-white py-16 px-6 sm:px-12 border-t border-gray-100'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex items-end justify-between mb-8'>
            <div>
              <p className='text-xs font-semibold tracking-widest uppercase text-custom-green3 mb-1'>Comunidad</p>
              <h2 className='text-3xl md:text-4xl font-extrabold text-custom-green5 leading-tight'>
                Seguinos en Instagram
              </h2>
            </div>
            <a
              href='https://www.instagram.com/gudpipolok/'
              target='_blank'
              rel='noopener noreferrer'
              className='hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-custom-green4 hover:text-custom-green5 transition-colors whitespace-nowrap'
            >
              @gudpipolok →
            </a>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            <div className='aspect-[4/5] w-full'>
              <iframe src={instagramPost1} className='w-full h-full rounded-2xl shadow-md' frameBorder='0' scrolling='no' allowTransparency></iframe>
            </div>
            <div className='aspect-[4/5] w-full'>
              <iframe src={instagramPost2} className='w-full h-full rounded-2xl shadow-md' frameBorder='0' scrolling='no' allowTransparency></iframe>
            </div>
            <div className='aspect-[4/5] w-full'>
              <iframe src={instagramPost3} className='w-full h-full rounded-2xl shadow-md' frameBorder='0' scrolling='no' allowTransparency></iframe>
            </div>
          </div>
          <div className='mt-8 flex justify-center sm:hidden'>
            <a
              href='https://www.instagram.com/gudpipolok/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 bg-custom-green5 hover:bg-custom-green4 active:scale-95 transition-all duration-200 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md'
            >
              Ver más en Instagram
            </a>
          </div>
        </div>
      </section>
      {/* CTA FINAL */}
      <section className='bg-custom-green5 text-white py-20 px-6 text-center'>
        <div className='max-w-2xl mx-auto'>
          <p className='text-xs font-semibold tracking-widest uppercase text-custom-green3 mb-3'>Catálogo completo</p>
          <h2 className='text-3xl md:text-4xl font-extrabold leading-tight mb-3'>
            Explorá toda nuestra colección
          </h2>
          <p className='text-white/60 text-base mb-8'>Sillas, mesas, bancos, reposeras y más — para interiores y exteriores.</p>
          <Link
            href='/products'
            onClick={handleProductsClick}
            className={`inline-flex items-center justify-center gap-2 bg-white text-custom-green5 font-bold text-base px-8 py-3.5 rounded-full shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 ${
              isLoadingProducts ? 'cursor-not-allowed opacity-75' : ''
            }`}
          >
            {isLoadingProducts ? (
              <svg className='animate-spin h-5 w-5 text-custom-green5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
              </svg>
            ) : (
              'Ver todos los productos'
            )}
          </Link>
        </div>
      </section>
    </div>
  );
}