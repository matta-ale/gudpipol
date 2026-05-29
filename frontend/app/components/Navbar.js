import { useState } from 'react';
import Image from 'next/image';
import Cart from './Cart';
import { useSelector } from 'react-redux';
import { FaHome, FaBoxOpen, FaUsers, FaQuestionCircle, FaEnvelope, FaTimes, FaChevronDown, FaLeaf } from 'react-icons/fa';

export default function Navbar({ sloganHeight, sloganVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false);
  const myCollections = useSelector((state) => state.products.allCollections);

  const handleMenuToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsProductsOpen(false);
      setIsNosotrosOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleProductsToggle = () => setIsProductsOpen((v) => !v);
  const handleNosotrosToggle = () => setIsNosotrosOpen((v) => !v);

  return (
    <nav
      className='fixed left-0 w-full h-20 flex items-center px-5 z-30 bg-white transition-all duration-500 '
      style={{ top: window.innerWidth <= 640 ? 0 : `${sloganHeight}px` }} // Ajusta top con la altura del SloganHeader
    >
      {/* Botón hamburguesa — pill style */}
      <div className='xl:hidden flex items-center z-50'>
        <button
          onClick={handleMenuToggle}
          aria-label='Abrir menú'
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all duration-200 shadow-sm focus:outline-none active:scale-95 ${
            isOpen
              ? 'bg-white text-custom-green5 shadow-md scale-100'
              : 'bg-custom-green5 text-white hover:bg-custom-green4 hover:shadow-lg hover:scale-105'
          }`}
        >
          {isOpen ? (
            <FaTimes size={12} />
          ) : (
            <span className='flex flex-col gap-[4px]'>
              <span className='block w-[15px] h-[2px] bg-current rounded-full' />
              <span className='block w-[11px] h-[2px] bg-current rounded-full' />
              <span className='block w-[15px] h-[2px] bg-current rounded-full' />
            </span>
          )}
          {isOpen ? 'Cerrar' : 'Menú'}
        </button>
      </div>

      {/*logo*/}
      <div className='flex-1 flex items-center justify-center xl:absolute xl:left-1/2 xl:transform xl:-translate-x-1/2'>
        <a href='/' className='relative h-10 w-48'>
          <Image
            src='/img/logo2.jpg'
            alt='Gudpipol logo'
            fill
            style={{ objectFit: 'contain' }}
          />
        </a>
      </div>

      {/*links pantallas grandes*/}
      <div className={`hidden xl:flex flex-1 justify-end space-x-6 pr-5`}>
        <ul className='flex flex-row space-x-6 text-custom-green4 font-semibold'>
          <li className='flex items-center'>
            <a href='/' className='hover:text-custom-green3'>
              Inicio
            </a>
          </li>
          <li className='flex items-center'>
            <a href='/products' className='hover:text-custom-green3'>
              Productos
            </a>
          </li>
          <li className='relative flex items-center group'>
            <button className='flex items-center gap-1 hover:text-custom-green3'>
              Nosotros
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m19.5 8.25-7.5 7.5-7.5-7.5'
                />
              </svg>
            </button>
            <div className='absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-white shadow-lg rounded-xl py-2 min-w-max z-50 border border-gray-100'>
              <a
                href='/aboutUs'
                className='block px-5 py-2.5 text-custom-green4 hover:text-custom-green3 hover:bg-gray-50 transition-colors duration-150'
              >
                Sobre nosotros
              </a>
              <a
                href='/prensa'
                className='block px-5 py-2.5 text-custom-green4 hover:text-custom-green3 hover:bg-gray-50 transition-colors duration-150'
              >
                Prensa
              </a>
              <a
                href='/clientes'
                className='block px-5 py-2.5 text-custom-green4 hover:text-custom-green3 hover:bg-gray-50 transition-colors duration-150'
              >
                Nuestros clientes
              </a>
            </div>
          </li>
          <li className='flex items-center'>
            <a
              href='/faq'
              className='hover:text-custom-green3 leading-tight text-center'
            >
              Preguntas
              <br />
              Frecuentes
            </a>
          </li>
          <li className='flex items-center'>
            <a href='/contact' className='hover:text-custom-green3'>
              Contacto
            </a>
          </li>
        </ul>
      </div>

      {/* cart*/}
      <a href='/cart' className='hover:text-gray-300'>
        <Cart />
      </a>

      {/* Overlay oscuro */}
      {isOpen && (
        <div
          className='xl:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[39]'
          onClick={handleMenuToggle}
        />
      )}

      {/* Panel del menú */}
      <div
        className={`xl:hidden fixed left-0 w-full sm:w-[320px] flex flex-col z-40 transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sloganVisible ? 'top-28' : 'top-20'} bottom-0 overflow-hidden shadow-2xl`}
      >
        {/* Cabecera del panel */}
        <div className='bg-custom-green5 px-5 py-4 flex items-center justify-between flex-shrink-0'>
          <a href='/' onClick={handleMenuToggle}>
            <Image
              src='/img/logo_transp.png'
              alt='GudPipol'
              width={130}
              height={34}
              style={{ objectFit: 'contain' }}
            />
          </a>
          <button
            onClick={handleMenuToggle}
            className='text-white/60 hover:text-white transition-colors p-1'
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className='flex-1 overflow-y-auto bg-white'>
          <a
            href='/'
            onClick={handleMenuToggle}
            className='flex items-center gap-3.5 px-5 py-4 text-custom-black hover:bg-custom-green3/15 hover:text-custom-green5 transition-colors border-b border-gray-100 font-semibold'
          >
            <FaHome size={14} className='text-custom-green4 flex-shrink-0' />
            Inicio
          </a>

          {/* Productos acordeón */}
          <button
            onClick={handleProductsToggle}
            className='w-full flex items-center gap-3.5 px-5 py-4 text-custom-black hover:bg-custom-green3/15 hover:text-custom-green5 transition-colors border-b border-gray-100 font-semibold'
          >
            <FaBoxOpen size={14} className='text-custom-green4 flex-shrink-0' />
            <span className='flex-1 text-left'>Productos</span>
            <FaChevronDown
              size={11}
              className={`text-custom-green4 transition-transform duration-300 ${
                isProductsOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 bg-gray-50 border-b border-gray-100 ${
              isProductsOpen ? 'max-h-[360px]' : 'max-h-0'
            }`}
          >
            <a
              href='/products'
              onClick={handleMenuToggle}
              className='flex items-center pl-12 pr-5 py-3 text-sm text-custom-green5 font-bold hover:text-custom-green3 hover:bg-white transition-colors border-b border-gray-100'
            >
              Ver todos los productos
            </a>
            {myCollections?.map((collection) => (
              <a
                key={collection.id}
                href={`/products/${collection.name}`}
                onClick={handleMenuToggle}
                className='flex items-center pl-12 pr-5 py-2.5 text-sm text-custom-green4 hover:text-custom-green5 hover:bg-white transition-colors border-b border-gray-100'
              >
                {collection.name}
              </a>
            ))}
          </div>

          {/* Nosotros acordeón */}
          <button
            onClick={handleNosotrosToggle}
            className='w-full flex items-center gap-3.5 px-5 py-4 text-custom-black hover:bg-custom-green3/15 hover:text-custom-green5 transition-colors border-b border-gray-100 font-semibold'
          >
            <FaUsers size={14} className='text-custom-green4 flex-shrink-0' />
            <span className='flex-1 text-left'>Nosotros</span>
            <FaChevronDown
              size={11}
              className={`text-custom-green4 transition-transform duration-300 ${
                isNosotrosOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 bg-gray-50 border-b border-gray-100 ${
              isNosotrosOpen ? 'max-h-48' : 'max-h-0'
            }`}
          >
            <a href='/aboutUs' onClick={handleMenuToggle} className='flex items-center pl-12 pr-5 py-2.5 text-sm text-custom-green4 hover:text-custom-green5 hover:bg-white transition-colors border-b border-gray-100'>
              Sobre nosotros
            </a>
            <a href='/prensa' onClick={handleMenuToggle} className='flex items-center pl-12 pr-5 py-2.5 text-sm text-custom-green4 hover:text-custom-green5 hover:bg-white transition-colors border-b border-gray-100'>
              Prensa
            </a>
            <a href='/clientes' onClick={handleMenuToggle} className='flex items-center pl-12 pr-5 py-2.5 text-sm text-custom-green4 hover:text-custom-green5 hover:bg-white transition-colors border-b border-gray-100'>
              Nuestros clientes
            </a>
          </div>

          <a
            href='/faq'
            onClick={handleMenuToggle}
            className='flex items-center gap-3.5 px-5 py-4 text-custom-black hover:bg-custom-green3/15 hover:text-custom-green5 transition-colors border-b border-gray-100 font-semibold'
          >
            <FaQuestionCircle size={14} className='text-custom-green4 flex-shrink-0' />
            Preguntas Frecuentes
          </a>

          <a
            href='/contact'
            onClick={handleMenuToggle}
            className='flex items-center gap-3.5 px-5 py-4 text-custom-black hover:bg-custom-green3/15 hover:text-custom-green5 transition-colors border-b border-gray-100 font-semibold'
          >
            <FaEnvelope size={14} className='text-custom-green4 flex-shrink-0' />
            Contacto
          </a>
        </nav>

        {/* Footer del panel */}
        <div className='bg-gray-50 border-t border-gray-200 px-5 py-4 flex items-center gap-2 flex-shrink-0'>
          <FaLeaf size={12} className='text-custom-green4' />
          <p className='text-xs text-gray-400'>Muebles de plástico reciclado</p>
        </div>
      </div>
    </nav>
  );
}
