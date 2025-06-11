import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-custom-green4 p-4 text-center text-white grid grid-cols-1 md:grid-cols-3 relative z-20'>
      <div className='flex flex-col items-start pl-8 py-4'>
        <h1 className='text-lg font-semibold'>Contacto:</h1>
        <br />
        <a
          href='https://wa.me/5493415924709?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20sus%20muebles'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p className='flex items-center py-1'>
            <FaWhatsapp />
            <span className='pl-2'>+5493415924709</span>
          </p>
        </a>
        <a
          href='mailto:gudpipolecomuebles@gmail.com '
          target='_blank'
          rel='noopener noreferrer'
        >
          <p className='flex items-center py-1'>
            <MdEmail />
            <span className='pl-2'>gudpipolecomuebles@gmail.com</span>
          </p>
        </a>
        <a
          href='https://www.instagram.com/gudpipolok/#'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p className='flex items-center py-1'>
            <FaInstagram />
            <span className='pl-2'>@gudpipolok</span>
          </p>
        </a>
        <a
          href='https://web.facebook.com/gudpipolok/?_rdc=1&_rdr#'
          target='_blank'
          rel='noopener noreferrer'
        >
          <p className='flex items-center py-1'>
            <FaFacebook />
            <span className='pl-2'>Gudpipol</span>
          </p>
        </a>
      </div>
      <div className='flex flex-col items-start pl-8 py-4'>
        <h1 className='text-lg font-semibold'>Secciones:</h1>
        <br />
        <p className='flex items-center py-1'>
          <a href='/'>Inicio</a>
        </p>
        <p className='flex items-center py-1'>
          <a href='/products'>Productos</a>
        </p>
        <p className='flex items-center py-1'>
          <a href='/nosotros'>Nosotros</a>
        </p>
        <p className='flex items-center py-1'>
          <a href='/contacto'>Contacto</a>
        </p>
      </div>
      <div className='h-8 flex justify-start pr-8 text-2xl mt-20 pt-2'>
        <p className='flex items-center'>© 2025</p>
        <Image
          src='/img/logo_transp.png'
          alt='Gudpipol transp logo'
          width={160}
          height={80}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </footer>
  );
}
