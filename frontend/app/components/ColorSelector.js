import { useState } from 'react';

export default function ColorSelector({ selectedColor, onColorSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para abrir/cerrar dropdown
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleColorSelect = (color) => {
    onColorSelect(color); // Envía el color seleccionado a `page.js`
    setIsDropdownOpen(false); // Cierra el dropdown cuando se selecciona un color
  };

  return (
    <div className='relative mt-4'>
      <div className='flex flex-col  font-semibold'>
        <span className='ml-7 mb-1 text-sm '>COLOR</span>
        <div className='bg-custom-black-2 w-28 rounded-3xl flex justify-center'>
          <div
            className='flex items-center justify-between cursor-pointer m-0 p-2 w-[70px] bg-custom-blackrounded-3xl  font-semibold'
            onClick={toggleDropdown}
          >
            <span className='flex items-center'>
              <div
                className={`w-7 h-7 rounded-full mr-2`}
                style={{ backgroundColor: selectedColor }}
              />
            </span>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>
        {isDropdownOpen && (
          <div className='absolute mt-6 bg-custom-black-2 rounded-3xl z-10 w-fit text-xs'>
            <div
              className='flex items-center p-2 cursor-pointer hover:bg-gray-400 hover:text-black hover:rounded-tl-3xl hover:rounded-tr-3xl w-28'
              onClick={() => handleColorSelect('#463F34')}
            >
              <div
                className='w-6 h-6 rounded-full mr-1'
                style={{ backgroundColor: '#463F34' }}
              />
              MARRÓN
            </div>
            <div
              className='flex items-center p-2 cursor-pointer hover:bg-gray-400 hover:text-black hover:rounded-bl-3xl hover:rounded-br-3xl w-full'
              onClick={() => handleColorSelect('black')}
            >
              <div
                className='w-6 h-6 rounded-full mr-1'
                style={{ backgroundColor: 'black' }}
              />
              NEGRO
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
