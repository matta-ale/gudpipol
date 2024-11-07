import React, { useEffect, useState } from 'react';

const SloganHeader = ({ onHeightChange }) => {
  const text = 'Algunos lo llaman economía circular. Nosotros lo llamamos Gudpipol';
  const [height, setHeight] = useState(32);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newHeight = Math.max(32 - scrollY, 0);
      const newOpacity = Math.max(1 - scrollY / 50, 0);

      setHeight(newHeight);
      setOpacity(newOpacity);
      onHeightChange(newHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onHeightChange]);

  return (
    <div
      className='w-full hidden bg-custom-green fixed top-0 left-0 z-40 md:flex justify-center items-center transition-all duration-300'
      style={{ height: `${height}px`, opacity }}
    >
      <p className='text-xs sm:text-sm text-white inline-block mx-4'>{text}</p>
    </div>
  );
};

export default SloganHeader;
