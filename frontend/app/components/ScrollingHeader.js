const ScrollingHeader = ({ sloganVisible }) => {
  const text = '🚚 Cotizamos envíos a todo el país | 💳 Cuota simple: 3 y 6 cuotas | 🔄 Devolución sin cargo por 30 días';

  return (
    <div
      className={`w-full bg-custom-green flex fixed z-10 overflow-hidden transition-all duration-500 ${
        sloganVisible ? 'top-20 md:top-40' : 'top-20 opacity-0'
      }`}
    >
      <div className='animate-scroll whitespace-nowrap text-white py-1'>
        <p className='inline-block mx-4'>{text}</p>
        <p className='inline-block mx-4'>{text}</p>
      </div>
    </div>
  );
};

export default ScrollingHeader;

