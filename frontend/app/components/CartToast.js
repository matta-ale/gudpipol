'use client';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

export default function CartToast() {
  const lastAdded = useSelector((state) => state.cart.lastAdded);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const prevAddedAt = useRef(lastAdded?.addedAt ?? null);
  const timerRef = useRef(null);

  function dismiss() {
    clearTimeout(timerRef.current);
    setLeaving(true);
    setTimeout(() => setVisible(false), 400);
  }

  useEffect(() => {
    if (!lastAdded || lastAdded.addedAt === prevAddedAt.current) return;
    prevAddedAt.current = lastAdded.addedAt;

    // Reset if already showing
    clearTimeout(timerRef.current);
    setLeaving(false);
    setVisible(true);

    // Start exit animation at 5s, fully hide at 5.4s
    timerRef.current = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => setVisible(false), 400);
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [lastAdded]);

  if (!visible || !lastAdded) return null;

  return (
    <div
      className={`
        fixed top-24 right-4 z-[100] w-72 sm:w-80
        bg-white rounded-2xl shadow-2xl border border-gray-100
        transition-all duration-400
        ${leaving
          ? 'opacity-0 translate-x-4 scale-95 pointer-events-none'
          : 'opacity-100 translate-x-0 scale-100'}
      `}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Progress bar */}
      <div className='absolute top-0 left-0 h-0.5 w-full rounded-t-2xl overflow-hidden bg-gray-100'>
        <div
          className='h-full bg-custom-green3 rounded-full'
          style={{
            animation: 'shrink 5s linear forwards',
          }}
        />
      </div>

      <div className='flex items-center gap-3 px-4 py-3.5'>
        {/* Product image or icon */}
        <div className='flex-shrink-0 relative'>
          {lastAdded.image ? (
            <img
              src={lastAdded.image}
              alt={lastAdded.name}
              className='w-12 h-12 rounded-xl object-cover border border-gray-100'
            />
          ) : (
            <div className='w-12 h-12 rounded-xl bg-custom-green2 flex items-center justify-center'>
              <FaShoppingCart className='text-custom-green5 text-xl' />
            </div>
          )}
          {/* Check badge */}
          <span className='absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-custom-green flex items-center justify-center border-2 border-white'>
            <FaCheck className='text-white text-[9px]' />
          </span>
        </div>

        {/* Text */}
        <div className='flex-1 min-w-0'>
          <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>
            Agregado al carrito
          </p>
          <p className='text-gray-700 font-semibold text-sm leading-snug truncate mt-0.5'>
            {lastAdded.name}
          </p>
          {lastAdded.quantity > 1 && (
            <p className='text-xs text-gray-400 mt-0.5'>
              Cantidad: {lastAdded.quantity}
            </p>
          )}
        </div>

        {/* Cart link */}
        <a
          href='/cart'
          onClick={dismiss}
          className='flex-shrink-0 text-xs font-semibold text-custom-green3 hover:text-custom-green transition-colors whitespace-nowrap'
        >
          Ver carrito →
        </a>

        {/* Close button */}
        <button
          onClick={dismiss}
          className='flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors ml-1'
          aria-label='Cerrar'
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
