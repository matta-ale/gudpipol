import { useState } from 'react';
import Image from 'next/image';
import Cart from './Cart';
import { useSelector } from 'react-redux';
import { FaAngleRight } from 'react-icons/fa';

export default function Navbar({ sloganHeight, sloganVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false);
  const [canShowProductsMenu, setCanShowProductsMenu] = useState(false);
  const myCollections = useSelector((state) => state.products.allCollections);

  const handleMenuToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setCanShowProductsMenu(true);
      }, 700);
    } else {
      setIsOpen(false);
      setIsProductsOpen(false);
      setIsNosotrosOpen(false);
      setCanShowProductsMenu(false);
    }
  };

  const handleProductsToggle = () => {
    if (canShowProductsMenu) {
      setIsProductsOpen(!isProductsOpen);
    }
  };

  const handleNosotrosToggle = () => {
    if (canShowProductsMenu) {
      setIsNosotrosOpen(!isNosotrosOpen);
    }
  };

  return (
    <nav
      className='fixed left-0 w-full h-20 flex items-center px-5 z-30 bg-white transition-all duration-500 '
      style={{ top: window.innerWidth <= 640 ? 0 : `${sloganHeight}px` }} // Ajusta top con la altura del SloganHeader
    >
      {/*menú hamburguesa*/}
      <div className='xl:hidden flex items-center z-50'>
        <button
          onClick={handleMenuToggle}
          className='text-black focus:outline-none'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
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

      {/* Menú hamburguesa expandido*/}
      <div
        className={`${
          isOpen
            ? 'translate-x-0 pointer-events-auto'
            : '-translate-x-full pointer-events-none'
        } xl:hidden fixed  overflow-auto left-0 h-full w-full bg-white z-40 transform transition-transform duration-700 ease-in-out ${
          sloganVisible ? 'top-28' : 'top-20'
        }`}
      >
        <ul className='flex flex-col items-start p-6 text-custom-green4 font-semibold'>
          <li className='flex justify-between w-full py-3'>
            <a href='/' className='hover:text-custom-green3'>
              Inicio
            </a>
          </li>
          <li className='flex justify-between w-full py-3'>
            <button
              onClick={handleNosotrosToggle}
              className='hover:text-custom-green3 w-full text-left'
            >
              Nosotros
            </button>
            <FaAngleRight />
          </li>

          {/* Submenú hamburguesa nosotros */}
          {canShowProductsMenu && (
            <div
              className={`${
                isNosotrosOpen
                  ? 'translate-x-0 pointer-events-auto'
                  : 'translate-x-full pointer-events-none'
              } xl:hidden fixed overflow-y-auto top-32 left-0 w-full h-full bg-white z-40 transform transition-transform duration-700 ease-in-out`}
            >
              <ul className='ml-6 space-y-2'>
                <li className='bg-gray-200 py-2 pr-6' key='title'>
                  <button
                    onClick={() => setIsNosotrosOpen(false)}
                    className='hover:text-custom-green3 w-full flex justify-between'
                  >
                    <span className='text-black pl-4'>Nosotros</span>
                    <FaAngleRight />
                  </button>
                </li>
                <li key='sobre-nosotros'>
                  <a
                    href='/aboutUs'
                    className='hover:text-custom-green3 pl-6 py-2 font-semibold w-full block'
                  >
                    Sobre nosotros
                  </a>
                </li>
                <li key='prensa'>
                  <a
                    href='/prensa'
                    className='hover:text-custom-green3 pl-6 py-2 font-semibold w-full block'
                  >
                    Prensa
                  </a>
                </li>
                <li key='clientes'>
                  <a
                    href='/clientes'
                    className='hover:text-custom-green3 pl-6 py-2 font-semibold w-full block'
                  >
                    Nuestros clientes
                  </a>
                </li>
              </ul>
            </div>
          )}
          <li className='flex justify-between w-full py-3'>
            <button
              onClick={handleProductsToggle}
              className='hover:text-custom-green3 w-full text-left'
            >
              Productos
            </button>
            <FaAngleRight></FaAngleRight>
          </li>

          {/* Submenú hamburguesa productos */}
          {canShowProductsMenu && (
            <div
              className={`${
                isProductsOpen
                  ? 'translate-x-0 pointer-events-auto'
                  : 'translate-x-full pointer-events-none'
              } xl:hidden fixed overflow-y-auto  top-32 left-0 w-full h-full bg-white z-40 transform transition-transform duration-700 ease-in-out`}
            >
              <ul className='ml-6 space-y-2'>
                <li className='bg-gray-200 py-2 pr-6' key='title'>
                  <button
                    onClick={() => setIsProductsOpen(false)}
                    className='hover:text-custom-green3 w-full flex justify-between'
                  >
                    <span className='text-black pl-4'>Productos</span>
                    <FaAngleRight></FaAngleRight>
                  </button>
                </li>
                <li key='productos'>
                  <a
                    href='/products'
                    className='hover:text-custom-green3 bg-custom-green2 pl-6 py-2 font-bold w-full block'
                  >
                    Ver todos
                  </a>
                </li>
                {myCollections &&
                  myCollections.map((collection) => (
                    <li key={collection.id}>
                      <a
                        href={`/products/${collection.name}`}
                        className='hover:text-custom-green3 pl-6'
                      >
                        {collection.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          <li className='flex justify-between w-full py-3'>
            <a href='/faq' className='hover:text-custom-green3'>
              Preguntas Frecuentes
            </a>
          </li>
          <li className='flex justify-between w-full py-3'>
            <a href='/contact' className='hover:text-custom-green3'>
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
