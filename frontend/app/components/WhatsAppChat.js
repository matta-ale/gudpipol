'use client';
import { useState, useRef, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const PHONE = '5493415924709';
const GREETING = '¡Hola! 👋 ¿En qué te podemos ayudar?';
const COMPANY = 'GudPipol';
const TAGLINE = 'Muebles de plástico reciclado';

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showBadge, setShowBadge] = useState(true);
  const inputRef = useRef(null);

  // Focus input when popup opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  function handleOpen() {
    setOpen((prev) => !prev);
    setShowBadge(false);
  }

  function handleSend() {
    const text = message.trim() || GREETING;
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className='fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3'>

      {/* Chat popup */}
      <div
        className={`
          transition-all duration-300 origin-bottom-right
          ${open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
        `}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className='w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100'>

          {/* Header */}
          <div className='flex items-center gap-3 px-4 py-3' style={{ background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)' }}>
            {/* Avatar */}
            <div className='relative flex-shrink-0'>
              <img
                src='/img/logo_transp.png'
                alt='GudPipol'
                className='w-11 h-11 rounded-full object-cover bg-white'
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
              <div
                className='w-11 h-11 rounded-full bg-white hidden items-center justify-center text-green-700 font-bold text-base'
                style={{ display: 'none' }}
              >
                GP
              </div>
              {/* Online dot */}
              <span className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#075E54]' />
            </div>

            {/* Info */}
            <div className='flex-1 min-w-0'>
              <p className='text-white font-semibold text-sm leading-tight truncate'>{COMPANY}</p>
              <p className='text-green-200 text-xs truncate'>{TAGLINE}</p>
              <p className='text-green-300 text-xs flex items-center gap-1 mt-0.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-green-400 inline-block' />
                En línea
              </p>
            </div>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className='text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 flex-shrink-0'
              aria-label='Cerrar'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          {/* Chat area */}
          <div
            className='px-4 py-5 flex flex-col gap-4'
            style={{ background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a7f3d0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\"), linear-gradient(to bottom, #e5f9f6, #f0fdf4)" }}
          >
            {/* Greeting bubble */}
            <div className='flex items-end gap-2'>
              <div className='flex-shrink-0 w-7 h-7 rounded-full bg-[#075E54] flex items-center justify-center text-white text-xs font-bold'>
                GP
              </div>
              <div className='bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm max-w-[90%] relative'>
                <p className='text-gray-700 text-sm leading-relaxed'>{GREETING}</p>
                <span className='text-gray-400 text-[10px] block text-right mt-1'>
                  {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                </span>
                {/* Tail */}
                <span className='absolute -left-1.5 bottom-2 w-3 h-3 bg-white' style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
              </div>
            </div>

            {/* Hint text */}
            <p className='text-center text-gray-400 text-xs'>
              Respondemos en minutos por WhatsApp
            </p>
          </div>

          {/* Input area */}
          <div className='px-3 pb-3 pt-1 bg-white flex items-end gap-2 border-t border-gray-100'>
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Escribí tu consulta...'
              rows={1}
              className='flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors max-h-28 overflow-y-auto'
              style={{ lineHeight: '1.4' }}
            />
            <button
              onClick={handleSend}
              className='flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-150'
              style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
              aria-label='Enviar por WhatsApp'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12zm0 0h7.5' />
              </svg>
            </button>
          </div>

          {/* WA branding */}
          <div className='flex items-center justify-center gap-1.5 py-2 border-t border-gray-100 bg-gray-50'>
            <FaWhatsapp className='text-[#25D366] text-sm' />
            <span className='text-gray-400 text-xs'>Powered by WhatsApp</span>
          </div>
        </div>
      </div>

      {/* FAB button */}
      <button
        onClick={handleOpen}
        className='relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200'
        style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
        aria-label='Abrir chat de WhatsApp'
      >
        {open ? (
          <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>
        ) : (
          <FaWhatsapp className='text-3xl' />
        )}

        {/* Notification badge */}
        {showBadge && !open && (
          <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white'>
            1
          </span>
        )}

        {/* Pulse ring */}
        {showBadge && !open && (
          <span className='absolute inset-0 rounded-full animate-ping opacity-30' style={{ background: '#25D366' }} />
        )}
      </button>

    </div>
  );
}
