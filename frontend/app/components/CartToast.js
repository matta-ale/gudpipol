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

    clearTimeout(timerRef.current);
    setLeaving(false);
    setVisible(true);

    timerRef.current = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => setVisible(false), 400);
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [lastAdded]);

  if (!visible || !lastAdded) return null;

  const price = lastAdded.price
    ? `$ ${(lastAdded.price * lastAdded.quantity).toLocaleString('es-ES')}`
    : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[99] bg-black/30 backdrop-blur-[2px] transition-opacity duration-400 ${
          leaving ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={dismiss}
      />

      {/* Modal */}
      <div
        className={`
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]
          w-[90vw] max-w-sm
          bg-white rounded-3xl shadow-2xl border border-gray-100
          transition-all duration-400
          ${leaving
            ? 'opacity-0 scale-90 pointer-events-none'
            : 'opacity-100 scale-100'}
        `}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Progress bar */}
        <div className='absolute top-0 left-0 h-1 w-full rounded-t-3xl overflow-hidden bg-gray-100'>
          <div
            className='h-full bg-custom-green3 rounded-full'
            style={{ animation: 'shrink 5s linear forwards' }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={dismiss}
          className='absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors'
          aria-label='Cerrar'
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>
        </button>

        <div className='px-6 pt-8 pb-6'>
          {/* Header */}
          <div className='flex items-center gap-2 mb-5'>
            <span className='w-6 h-6 rounded-full bg-custom-green3 flex items-center justify-center'>
              <FaCheck className='text-white text-[10px]' />
            </span>
            <p className='text-sm font-bold text-custom-green5 tracking-wide uppercase'>
              Producto agregado al carrito
            </p>
          </div>

          {/* Product row */}
          <div className='flex gap-4 items-center'>
            {lastAdded.image ? (
              <img
                src={lastAdded.image}
                alt={lastAdded.name}
                className='w-20 h-20 rounded-2xl object-cover border border-gray-100 flex-shrink-0'
              />
            ) : (
              <div className='w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0'>
                <FaShoppingCart className='text-gray-400 text-2xl' />
              </div>
            )}

            <div className='flex-1 min-w-0'>
              {lastAdded.collection && (
                <p className='text-[10px] font-bold text-custom-green4 uppercase tracking-widest mb-0.5'>
                  {lastAdded.collection}
                </p>
              )}
              <p className='text-gray-800 font-bold text-base leading-snug'>
                {lastAdded.name}
              </p>
              {lastAdded.color && (
                <p className='text-xs text-gray-400 mt-1'>Color: {lastAdded.color}</p>
              )}
              {lastAdded.quantity && (
                <p className='text-xs text-gray-400'>Cantidad: {lastAdded.quantity}</p>
              )}
              {price && (
                <p className='text-lg font-extrabold text-custom-green5 mt-1'>{price}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-3 mt-6'>
            <button
              onClick={dismiss}
              className='flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors'
            >
              Seguir comprando
            </button>
            <a
              href='/cart'
              onClick={dismiss}
              className='flex-1 py-2.5 rounded-xl bg-custom-green5 hover:bg-custom-green4 text-white text-sm font-bold text-center transition-colors'
            >
              Ver carrito →
            </a>
          </div>
        </div>

        <style jsx>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </>
  );
}
