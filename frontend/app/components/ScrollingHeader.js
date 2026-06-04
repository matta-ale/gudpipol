'use client';
import { useState, useEffect } from 'react';

const ScrollingHeader = ({ sloganVisible, sloganHeight = 32 }) => {
  const text = '🚚 Cotizamos envíos a todo el país | 💳 Pagá por transferencia o en 3 o 6 cuotas con tarjeta | 🔄 Devolución sin cargo por 30 días';

  // SubNavbar is 48px tall on md+ (hidden on mobile)
  const [subNavHeight, setSubNavHeight] = useState(0);
  useEffect(() => {
    const update = () => setSubNavHeight(window.innerWidth >= 768 ? 48 : 0);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div
      className={`w-full bg-custom-green3 flex fixed z-20 overflow-hidden transition-all duration-500 ${
        sloganVisible ? '' : 'opacity-0 pointer-events-none'
      }`}
      style={{ top: `${sloganHeight + 80 + subNavHeight}px` }}
    >
      <div className='animate-scroll whitespace-nowrap text-custom-green5 py-1'>
        <p className='inline-block mx-4'>{text}</p>
        <p className='inline-block mx-4'>{text}</p>
      </div>
    </div>
  );
};

export default ScrollingHeader;

