const SloganHeader = () => {
  const text =
    'Algunos lo llaman economía circular. Nosotros lo llamamos Gudpipol';

  return (
    <div className='text-xs sm:text-sm w-full bg-custom-green py-1 overflow-hidden h-8 flex justify-center items-center fixed z-20'>
      <div className='flex justify-center items-center'>
        <p className='text-white inline-block mx-4'>{text}</p>
      </div>
    </div>
  );
};

export default SloganHeader;
