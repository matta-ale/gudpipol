export default function SubNavbar() {
  return (
    <nav className='bg-white h-12 flex items-center justify-center px-5 border-b-2 border-b-custom-green'>
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
    </nav>
  );
}
