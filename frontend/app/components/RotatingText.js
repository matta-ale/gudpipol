import { useEffect, useState } from 'react';

const RotatingText = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fade, setFade] = useState(true); // State for fade effect
  const texts = [
    'Transferencia o efectivo 15% de dto',
    '30 días de devolución garantizada',
    'Producto 100% de plástico reciclado',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Start fade-out
      setFade(false);

      setTimeout(() => {
        // Change text after fade-out
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);

        // Start fade-in
        setFade(true);
      }, 1000); // Wait for fade-out to complete (500ms)
    }, 4000); // Change text every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`absolute bottom-0 left-0 bg-yellow-400 text-black p-1 rounded-tr-lg text-xs font-bold flex items-center justify-center w-60`}
    >
      <div
        className={`whitespace-nowrap transition-opacity duration-1000 ease-in-out ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {texts[currentTextIndex]}
      </div>
    </div>
  );
};

export default RotatingText;
