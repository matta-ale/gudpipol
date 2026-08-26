import { FaTruck } from 'react-icons/fa';

export default function FreeShippingBadge({ className = '', variant = 'chip' }) {
  if (variant === 'inline') {
    return (
      <span
        className={`inline-flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[11px] leading-tight ${className}`}
      >
        <FaTruck className='text-[11px] text-custom-green shrink-0' />
        <span className='font-bold text-custom-green'>Envío gratis</span>
        <span className='font-normal text-gray-400'>
          (Pba, Cba, Sta Fe, E.Ríos)
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex w-fit max-w-[calc(100%-12px)] flex-col items-start gap-0.5 bg-green-50 border border-custom-green3 text-custom-green px-2.5 py-1 rounded-xl shadow-sm ${className}`}
    >
      <span className='inline-flex items-center gap-1.5 text-[11px] font-semibold leading-none'>
        <FaTruck className='text-[10px] text-custom-green shrink-0' />
        Envío gratis
      </span>
      <span className='text-[10px] font-medium text-custom-green4 leading-tight pl-[18px]'>
        Pba · Cba · Sta Fe · E.Ríos
      </span>
    </span>
  );
}
