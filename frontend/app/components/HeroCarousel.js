'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { src: '/img/Home1.webp', caption: 'Toyota Argentina, Zárate' },
  { src: '/img/Home2.webp', caption: 'San Martín de los Andes, Neuquén' },
  { src: '/img/Home3.webp', caption: 'FyO, Puerto Norte, Rosario' },
  { src: '/img/Home4.webp', caption: 'Pizzería La Gran Argentina, Rosario' },
];

const WHATSAPP_URL =
  'https://wa.me/5493415924709?text=Hola%2C%20vi%20su%20web%20y%20quiero%20cotizar%20muebles%20para%20mi%20empresa%20o%20institución.%20%C2%BFPueden%20asesorarme%3F';

const INTERVAL_MS = 5000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goTo = (index) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, INTERVAL_MS);
  };

  const nudge = (dir) => {
    if (dir === 'next') next(); else prev();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, INTERVAL_MS);
  };

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(next, INTERVAL_MS);
    }
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const handleMouseEnter = () => { setPaused(true); clearInterval(timerRef.current); };
  const handleMouseLeave = () => { setPaused(false); };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) nudge(delta < 0 ? 'next' : 'prev');
    touchStartX.current = null;
  };

  return (
    <section
      className='w-full overflow-hidden'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── DESKTOP: split layout (text left | portrait image right) ── */}
      <div className='hidden md:flex h-[90vh] mt-44'>
        {/* Left: text panel */}
        <div className='w-[55%] lg:w-[52%] flex flex-col justify-center px-12 lg:px-20 relative overflow-hidden bg-custom-green5'>
          <div
            className='absolute inset-0 pointer-events-none'
            style={{ background: 'linear-gradient(135deg, rgba(26,34,25,0.9) 0%, rgba(53,63,52,0.6) 100%)' }}
          />
          <div className='relative z-10'>
            <span className='inline-block mb-5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-white border border-white/30 bg-white/10'>
              Para empresas e instituciones
            </span>
            <h1 className='text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold text-white leading-tight drop-shadow-md mb-4'>
              El mobiliario outdoor que eligen municipios, empresas e instituciones.
            </h1>
            <p className='text-base lg:text-lg text-white/70 font-light tracking-wide mb-8'>
              Municipios · Constructoras · Hoteles · Empresas
            </p>
            <div className='flex flex-col sm:flex-row gap-3 flex-wrap'>
              <a
                href={WHATSAPP_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center gap-2 bg-custom-green3 hover:bg-custom-green4 active:scale-95 transition-all duration-200 text-white font-semibold text-base px-6 py-3 rounded-full shadow-lg whitespace-nowrap'
              >
                <FaWhatsapp className='text-xl' />
                Pedir presupuesto
              </a>
              <Link
                href='/products/destacados'
                className='flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-200 border border-white/40 text-white font-semibold text-base px-6 py-3 rounded-full shadow-lg whitespace-nowrap'
              >
                Ver productos destacados
              </Link>
              <Link
                href='/clientes'
                className='flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-200 border border-white/40 text-white font-semibold text-base px-6 py-3 rounded-full shadow-lg whitespace-nowrap'
              >
                Nuestros clientes
              </Link>
            </div>
            {/* Dots */}
            <div className='flex items-center gap-2 mt-10'>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'bg-white w-5 h-2.5' : 'bg-white/35 hover:bg-white/65 w-2.5 h-2.5'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: portrait image panel */}
        <div className='w-[45%] lg:w-[48%] relative overflow-hidden'>
          {SLIDES.map(({ src, caption }, i) => (
            <Image
              key={src}
              src={src}
              alt={caption}
              fill
              priority={i === 0}
              sizes='(max-width: 768px) 0vw, 48vw'
              className='object-cover object-center transition-opacity duration-700'
              style={{ opacity: i === current ? 1 : 0 }}
            />
          ))}

          {/* Arrow prev — over image */}
          <button
            onClick={() => nudge('prev')}
            aria-label='Imagen anterior'
            className='absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm text-white transition-all duration-200 active:scale-90'
          >
            <ChevronLeft size={20} />
          </button>

          {/* Arrow next — over image */}
          <button
            onClick={() => nudge('next')}
            aria-label='Imagen siguiente'
            className='absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm text-white transition-all duration-200 active:scale-90'
          >
            <ChevronRight size={20} />
          </button>
          {/* bottom gradient for caption */}
          <div
            className='absolute inset-x-0 bottom-0 h-16 pointer-events-none'
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
          />
          {/* Caption */}
          <div className='absolute bottom-0 inset-x-0 z-10 pb-3 px-4'>
            {SLIDES.map(({ caption }, i) => (
              <p
                key={caption}
                className='text-white/90 text-xs font-light tracking-widest uppercase text-right transition-opacity duration-500'
                style={{ opacity: i === current ? 1 : 0, position: i === 0 ? 'relative' : 'absolute', bottom: i === 0 ? undefined : '0.75rem', right: i === 0 ? undefined : '1rem' }}
              >
                {caption}
              </p>
            ))}
          </div>
          {/* left-edge blend */}
          <div
            className='absolute inset-y-0 left-0 w-12 pointer-events-none'
            style={{ background: 'linear-gradient(to right, rgba(53,63,52,0.7) 0%, transparent 100%)' }}
          />
        </div>
      </div>

      {/* ── MOBILE: full-screen portrait image with overlay + swipe ── */}
      <div
        className='flex md:hidden relative mt-[34px] h-[calc(100vh-114px)] overflow-hidden'
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDES.map(({ src, caption }, i) => (
          <Image
            key={src}
            src={src}
            alt={caption}
            fill
            priority={i === 0}
            sizes='(max-width: 768px) 100vw, 0vw'
            className='object-cover object-top transition-opacity duration-700'
            style={{ opacity: i === current ? 1 : 0 }}
          />
        ))}
        {/* bottom-heavy gradient */}
        <div
          className='absolute inset-0'
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.82) 100%)' }}
        />
        {/* Content pinned to bottom */}
        <div className='relative z-10 flex flex-col justify-end pb-10 px-6 h-full'>
          <span className='inline-block self-start mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-white border border-white/40 bg-white/10'>
            Para empresas e instituciones
          </span>
          <h1 className='text-3xl font-extrabold text-white leading-tight drop-shadow-md mb-2'>
            El mobiliario outdoor que eligen municipios, empresas e instituciones.
          </h1>
          <p className='text-sm text-white/75 font-light tracking-wide mb-6'>
            Municipios · Constructoras · Hoteles · Empresas
          </p>
          <div className='flex flex-col gap-3'>
            <a
              href={WHATSAPP_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center gap-2 bg-custom-green3 hover:bg-custom-green4 active:scale-95 transition-all duration-200 text-white font-semibold text-base px-6 py-3 rounded-full shadow-lg'
            >
              <FaWhatsapp className='text-xl' />
              Pedir presupuesto
            </a>
            <div className='flex gap-3'>
              <Link
                href='/products/destacados'
                className='flex-1 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg text-center'
              >
                Productos destacados
              </Link>
              <Link
                href='/clientes'
                className='flex-1 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg text-center'
              >
                Nuestros clientes
              </Link>
            </div>
          </div>
          {/* Dots row */}
          <div className='flex gap-2 mt-6 justify-center'>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir a imagen ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white w-5 h-2.5' : 'bg-white/40 w-2.5 h-2.5'
                }`}
              />
            ))}
          </div>
          {/* Caption */}
          <div className='relative h-4 mt-3'>
            {SLIDES.map(({ caption }, i) => (
              <p
                key={caption}
                className='absolute inset-0 text-white/70 text-[10px] font-light tracking-widest uppercase text-center transition-opacity duration-500'
                style={{ opacity: i === current ? 1 : 0 }}
              >
                {caption}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
