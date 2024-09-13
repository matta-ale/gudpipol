import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-black p-4 text-center text-white grid grid-cols-1 md:grid-cols-3'>
      <div className='flex flex-col items-start pl-8 py-4'>
        <h1 className='text-lg font-semibold'>Contacto:</h1>
        <br />
        <p className='flex items-center py-1'>
          <FaWhatsapp />
          <span className='pl-2'>+5493415924709</span>
        </p>
        <p className='flex items-center py-1'>
          <MdEmail />
          <span className='pl-2'>gudpipolecomuebles@gmail.com</span>
        </p>
        <p className='flex items-center py-1'>
          <FaInstagram />
          <span className='pl-2'>@gudpipolok</span>
        </p>
        <p className='flex items-center py-1'>
          <FaFacebook />
          <span className='pl-2'>Gudpipol</span>
        </p>
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
      <div className='h-8 flex gap-2 justify-start pr-8'>
        <p className='flex items-center'>© 2024</p>
        <Image
          src='/img/gudpipolLogoNegative.jpg'
          alt='Gudpipol negative logo'
          width={100}
          height={50}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </footer>
  );
}
