import React, { useEffect, useState } from 'react';

const SloganHeader = ({ onHeightChange }) => {
  const text = 'Algunos lo llaman economía circular. Nosotros lo llamamos Gudpipol';
  const [height, setHeight] = useState(32);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const isMobile = () => window.innerWidth < 768;

    const handleScroll = () => {
      if (isMobile()) {
        setHeight(0);
        setOpacity(0);
        onHeightChange(0);
        return;
      }
      const scrollY = window.scrollY;
      const newHeight = Math.max(32 - scrollY, 0);
      const newOpacity = Math.max(1 - scrollY / 50, 0);

      setHeight(newHeight);
      setOpacity(newOpacity);
      onHeightChange(newHeight);
    };

    // Init
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onHeightChange]);

  return (
    <div
      className='w-full bg-custom-green5 fixed top-0 left-0 z-40 hidden md:flex justify-center items-center overflow-hidden transition-all duration-300'
      style={{ height: `${height}px`, opacity }}
    >
      <p className='text-[11px] font-medium tracking-widest uppercase text-white/80 whitespace-nowrap'>{text}</p>
    </div>
  );
};

export default SloganHeader;
