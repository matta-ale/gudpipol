import { FaWhatsapp, FaInstagram, FaFacebook, FaLeaf } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-custom-green5 text-white relative z-20 mt-auto'>

      {/* Main grid */}
      <div className='max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10'>

        {/* Col 1 — Brand */}
        <div className='flex flex-col gap-4'>
          <a href='/'>
            <Image
              src='/img/logo_transp.png'
              alt='Gudpipol'
              width={150}
              height={40}
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
          </a>
          <p className='text-white/60 text-sm leading-relaxed'>
            Muebles de exterior fabricados con plástico 100&nbsp;% reciclado. Durables, sustentables y sin mantenimiento.
          </p>
          {/* Social icons */}
          <div className='flex gap-3 mt-1'>
            <a
              href='https://www.instagram.com/gudpipolok/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
              className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-custom-green3/30 text-white transition-colors duration-200'
            >
              <FaInstagram size={16} />
            </a>
            <a
              href='https://web.facebook.com/gudpipolok/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Facebook'
              className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-custom-green3/30 text-white transition-colors duration-200'
            >
              <FaFacebook size={16} />
            </a>
            <a
              href='https://wa.me/5493415924709?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20sus%20muebles'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='WhatsApp'
              className='w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-custom-green3/30 text-white transition-colors duration-200'
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>

        {/* Col 2 — Navegación */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-xs font-bold tracking-widest uppercase text-custom-green3 mb-1'>Navegación</h3>
          {[
            { label: 'Inicio', href: '/' },
            { label: 'Todos los productos', href: '/products' },
            { label: 'Productos destacados', href: '/products/destacados' },
            { label: 'Preguntas frecuentes', href: '/faq' },
            { label: 'Carrito', href: '/cart' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className='text-sm text-white/70 hover:text-white transition-colors duration-150'
            >
              {label}
            </a>
          ))}
        </div>

        {/* Col 3 — Nosotros */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-xs font-bold tracking-widest uppercase text-custom-green3 mb-1'>Nosotros</h3>
          {[
            { label: 'Sobre nosotros', href: '/aboutUs' },
            { label: 'Prensa', href: '/prensa' },
            { label: 'Nuestros clientes', href: '/clientes' },
            { label: 'Contacto', href: '/contact' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className='text-sm text-white/70 hover:text-white transition-colors duration-150'
            >
              {label}
            </a>
          ))}
        </div>

        {/* Col 4 — Contacto */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-xs font-bold tracking-widest uppercase text-custom-green3 mb-1'>Contacto</h3>
          <a
            href='https://wa.me/5493415924709?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20sus%20muebles'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors duration-150'
          >
            <FaWhatsapp size={15} className='text-custom-green3 flex-shrink-0' />
            +54 9 341 592-4709
          </a>
          <a
            href='mailto:gudpipolecomuebles@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors duration-150'
          >
            <MdEmail size={15} className='text-custom-green3 flex-shrink-0' />
            gudpipolecomuebles@gmail.com
          </a>
          <a
            href='https://www.instagram.com/gudpipolok/'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors duration-150'
          >
            <FaInstagram size={15} className='text-custom-green3 flex-shrink-0' />
            @gudpipolok
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <div className='flex items-center gap-2 text-white/40 text-xs'>
            <FaLeaf size={11} />
            <span>Fabricado con plástico 100% reciclado · Rosario, Argentina</span>
          </div>
          <p className='text-white/40 text-xs'>© {new Date().getFullYear()} GudPipol. Todos los derechos reservados.</p>
        </div>
      </div>

    </footer>
  );
}
