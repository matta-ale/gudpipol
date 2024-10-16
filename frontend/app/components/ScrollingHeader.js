const ScrollingHeader = () => {
  const text =
    '🚚 Cotizamos envíos a todo el país | 💳 Cuota simple: 3 y 6 cuotas | 🔄 Devolución sin cargo por 30 días';

  return (
    <div className='w-full bg-custom-green py-1 overflow-hidden fixed top-28 z-30 lg:top-40'>
      <div className='animate-scroll whitespace-nowrap text-white'>
        <p className=' inline-block mx-4'>{text}</p>
        <p className='inline-block mx-4'>{text}</p>
        <p className=' inline-block mx-4'>{text}</p>
      </div>
    </div>
  );
};

export default ScrollingHeader;
