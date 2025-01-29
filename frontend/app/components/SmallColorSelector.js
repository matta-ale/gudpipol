import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getHexCode } from '../utils/colorSettings';

export default function SmallColorSelector({ item}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para abrir/cerrar dropdown
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleColorSelect = (color) => {
    dispatch({
      type: 'cart/updateColor',
      payload: { id:item.id, color },
    });
    setIsDropdownOpen(false)
  };

  return (
    <div className='relative'>
      <div className='flex flex-col  font-semibold'>
        <span className='ml-4 mb-1 text-xs '>COLOR</span>
        <div className='bg-custom-black-2 w-20 rounded-3xl flex justify-center'>
          <div
            className='flex items-center justify-between cursor-pointer m-0 p-2 w-[70px] bg-custom-blackrounded-3xl  font-semibold'
            onClick={toggleDropdown}
          >
            <span className='flex items-center'>
              <div
                className={`w-5 h-5 rounded-full mr-2`}
                style={{ backgroundColor: getHexCode(item.color) }}
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
          <div className='absolute mt-5 bg-custom-black-2 rounded-3xl z-10 w-20 text-xs'>
            <div
              className='flex items-center p-2 cursor-pointer hover:bg-gray-400 hover:text-black hover:rounded-tl-2xl hover:rounded-tr-2xl w-full'
              onClick={() => handleColorSelect('Marron')}
            >
              <div
                className='w-5 h-5 rounded-full mr-1'
                style={{ backgroundColor: getHexCode('Marron') }}
              />
            </div>
            <div
              className='flex items-center p-2 cursor-pointer hover:bg-gray-400 hover:text-black hover:rounded-bl-3xl hover:rounded-br-3xl w-full'
              onClick={() => handleColorSelect('Negro')}
            >
              <div
                className='w-5 h-5 rounded-full mr-1'
                style={{ backgroundColor: getHexCode('Negro') }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
