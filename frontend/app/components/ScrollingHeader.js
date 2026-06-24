'use client';
import { useState, useEffect } from 'react';

const ITEMS = [
  { icon: '🚚', text: 'Hacemos envíos a todo el país' },
  { icon: '💳', text: 'Pagá por transferencia o en 3 o 6 cuotas con tarjeta' },
  { icon: '🔄', text: 'Devolución sin cargo por 30 días' },
];

const SEPARATOR = <span className='mx-6 text-white/30'>·</span>;

const ScrollingHeader = ({ sloganVisible, sloganHeight = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [subNavHeight, setSubNavHeight] = useState(0);

  useEffect(() => {
    const update = () => setSubNavHeight(window.innerWidth >= 768 ? 48 : 0);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Mobile: fade-out → swap → fade-in cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % ITEMS.length);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full bg-custom-green5 border-b border-white/10 fixed z-20 overflow-hidden transition-all duration-500 ${
        sloganVisible ? '' : 'opacity-0 pointer-events-none'
      }`}
      style={{ top: `${sloganHeight + 80 + subNavHeight}px`, height: '34px' }}
    >
      {/* ── Mobile: single message fade-cycle ── */}
      <div className='md:hidden h-full flex items-center justify-center px-4'>
        <p
          className='text-[11px] font-semibold text-white/90 tracking-wide text-center transition-all duration-400'
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(4px)' }}
        >
          {ITEMS[activeIndex].icon}&nbsp;{ITEMS[activeIndex].text}
        </p>
      </div>

      {/* ── Desktop: seamless marquee ── */}
      <div className='hidden md:flex h-full items-center overflow-hidden'>
        <div className='animate-marquee whitespace-nowrap'>
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className='inline-flex items-center text-[11px] font-semibold text-white/85 tracking-wide mx-10'>
              <span className='mr-2'>{item.icon}</span>{item.text}
              {i < ITEMS.length * 2 - 1 && SEPARATOR}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingHeader;

