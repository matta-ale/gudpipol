import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className='bg-white h-20 flex items-center px-5 border-b-2 border-b-custom-green'>
      <div className='ml-auto flex justify-between w-full'>
        <div className="p-0"style={{ position: 'relative', height: '40px', width: '22%' }}>
          <Image
            src='/img/logo.jpg'
            alt='Gudpipol logo'
            fill
            style={{ objectFit: 'contain' }}
            className="object-left"
          />
        </div>
        <ul className='flex space-x-6 text-black'>
          <li className="flex items-center h-full">
            <a href='/' className='hover:text-gray-300'>
              Inicio
            </a>
          </li>
          <li className="flex items-center h-full">
            <a href='/about' className=' hover:text-gray-300'>
              Quienes somos
            </a>
          </li>
          <li className="flex items-center h-full">
            <a href='/products' className=' hover:text-gray-300'>
              Productos
            </a>
          </li>
          <li className="flex items-center h-full">
            <a href='/contact' className=' hover:text-gray-300'>
              Contacto
            </a>
          </li>
          <li className="flex items-center h-full">
            <a href='/contact' className=' hover:text-gray-300'>
              Carrito
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
