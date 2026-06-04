const ScrollingHeader = ({ sloganVisible }) => {
  const text = '🚚 Cotizamos envíos a todo el país | 💳 Pagá por transferencia o en 3 o 6 cuotas con tarjeta | 🔄 Devolución sin cargo por 30 días';

  return (
    <div
      className={`w-full bg-custom-green3 flex fixed z-10 overflow-hidden transition-all duration-500 ${
        sloganVisible ? 'top-20 md:top-40' : 'top-20 opacity-0'
      }`}
    >
      <div className='animate-scroll whitespace-nowrap text-custom-green5 py-1'>
        <p className='inline-block mx-4'>{text}</p>
        <p className='inline-block mx-4'>{text}</p>
      </div>
    </div>
  );
};

export default ScrollingHeader;

