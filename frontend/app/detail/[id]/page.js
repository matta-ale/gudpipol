'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ColorSelector from '@/app/components/ColorSelector';
import { addItemToCart } from '@/app/redux/features/cart/cartSlice';

export default function ProductDetail({ params }) {
  const { id } = params;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.myProducts);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('descripcion');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Marron');
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);
  const rate3 = process.env.NEXT_PUBLIC_RATE_3_CUOTAS;
  const rate6 = process.env.NEXT_PUBLIC_RATE_6_CUOTAS;

  useEffect(() => {
    if (products) {
      const selectedProduct = products.find((product) => product.id === id);
      setProduct(selectedProduct);
    }
  }, [id, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageRef.current && !imageRef.current.contains(event.target)) {
        setIsZoomed(false);
      }
    };
    if (isZoomed) {
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isZoomed]);

  const addToCart = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        collection: product.collection.name,
        price: product.price,
        quantity,
        image: product.images?.[0]?.url || '',
        color: selectedColor,
      })
    );
  };

  if (!product) {
    return (
      <div className='flex flex-col items-center justify-center mt-60 lg:mt-44 max-w-[1200px] mx-auto h-96 font-semibold text-lg'>
        <p>Cargando detalle de producto...</p>
      </div>
    );
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);
  const totalPrice = product.price * quantity;
  const handleImageSelect = (index) => setCurrentImageIndex(index);

  return (
    <main className='flex flex-col lg:flex-row items-start justify-center mt-32 lg:mt-56 w-[400px] lg:w-[650px] mx-auto shadow-2xl shadow-black bg-white'>
      {/* Recuadro izquierdo */}
      <div className='relative w-full h-[600px] md:h-[380px] lg:w-[280px] flex flex-col overflow-visible'>
        {/* Imagen: 60% */}
        <div className='relative h-[80%] md:h-[60%] overflow-visible group'>
          {/* Fondo oscuro al hacer zoom */}
          {isZoomed && (
            <div className='fixed inset-0 bg-black bg-opacity-40 z-[100]'></div>
          )}

          {/* Imagen en zoom */}
          {isZoomed ? (
            <div className='fixed inset-0 z-[200] overflow-hidden'>
              <div className='absolute top-1/2 left-1/2 w-[200vw] h-[200vh] transform -translate-x-1/2 -translate-y-1/2'>
                <Image
                  src={product.images?.[currentImageIndex]?.url}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  alt={product.name}
                />

                {/* Flecha izquierda */}
                <button
                  className='absolute left-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-[210]'
                  onClick={() =>
                    handleImageSelect(
                      (currentImageIndex - 1 + product.images.length) %
                        product.images.length
                    )
                  }
                >
                  <FaChevronLeft size={32} />
                </button>

                {/* Flecha derecha */}
                <button
                  className='absolute right-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-[210]'
                  onClick={() =>
                    handleImageSelect(
                      (currentImageIndex + 1) % product.images.length
                    )
                  }
                >
                  <FaChevronRight size={32} />
                </button>

                {/* Marcadores */}
                <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex z-[210]'>
                  {product.images?.map((_, index) => (
                    <button
                      key={index}
                      className={`w-4 h-4 rounded-full mx-2 ${
                        currentImageIndex === index
                          ? 'bg-yellow-400'
                          : 'bg-gray-300'
                      }`}
                      onClick={() => handleImageSelect(index)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Imagen normal
            <div
              ref={imageRef}
              className='relative w-full h-full transition-transform duration-500 ease-in-out ] md:group-hover:scale-150 z-[50]'
              onTouchStart={() => setIsZoomed(true)}
            >
              <Image
                src={product.images?.[currentImageIndex]?.url}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                alt={product.name}
              />

              {/* Flechas en modo normal */}
              <button
                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-[60]'
                onClick={() =>
                  handleImageSelect(
                    (currentImageIndex - 1 + product.images.length) %
                      product.images.length
                  )
                }
              >
                <FaChevronLeft size={20} />
              </button>

              <button
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-[60]'
                onClick={() =>
                  handleImageSelect(
                    (currentImageIndex + 1) % product.images.length
                  )
                }
              >
                <FaChevronRight size={20} />
              </button>

              {/* Marcadores en modo normal */}
              <div className='absolute bottom-4 left-0 right-0 flex justify-center z-[60]'>
                {product.images?.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      currentImageIndex === index
                        ? 'bg-yellow-400'
                        : 'bg-gray-300'
                    }`}
                    onClick={() => handleImageSelect(index)}
                  ></button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info: 40% */}
        <div className='h-[20%] md:h-[40%] flex flex-col pt-5 md:pt-8 px-4 text-custom-black bg-white mb-4'>
          <p className='text-gray-700 font-bold text-sm mb-1'>
            {product.collection.name}
          </p>
          <h1 className='text-xl font-bold mb-1'>{product.name}</h1>
          <p className='font-semibold text-xl mb-1'>
            $ {product.price.toLocaleString('es-ES')}
          </p>
          <p className='text-xs text-gray-700'>
            (6 cuotas de ${' '}
            {Math.round((product.price * (1 + rate6 / 100)) / 6).toLocaleString(
              'es-ES'
            )}
            )
          </p>
        </div>
      </div>

      {/* Recuadro derecho */}
      <div className='w-full lg:w-[370px] relative h-full text-custom-black bg-white  px-4 md:px-8 py-4'>
        {/* Tabs */}
        <div className='mt-2 text-sm flex justify-between border-b border-gray-700'>
          <button
            className={`mr-2 pb-2 ${
              selectedTab === 'descripcion'
                ? 'text-black border-b-2 border-white font-bold'
                : 'text-custom-black'
            }`}
            onClick={() => setSelectedTab('descripcion')}
          >
            DETALLE
          </button>
          <button
            className={`mr-2 pb-2 ${
              selectedTab === 'medidas'
                ? 'text-black border-b-2 border-white font-bold'
                : 'text-custom-black'
            }`}
            onClick={() => setSelectedTab('medidas')}
          >
            MEDIDAS
          </button>
          <button
            className={`pb-2 ${
              selectedTab === 'formasdepago'
                ? 'text-black border-b-2 border-white font-bold'
                : 'text-custom-black'
            }`}
            onClick={() => setSelectedTab('formasdepago')}
          >
            FORMAS DE PAGO
          </button>
        </div>

        {/* Contenido del tab */}
        <div className='mt-4 text-custom-black w-full min-h-[100px] max-h-[100px] flex'>
          {selectedTab === 'descripcion' && <p>{product.description}</p>}
          {selectedTab === 'medidas' && (
            <div className='grid grid-cols-2 w-full'>
              <div className='flex flex-col items-start'>
                <p>Largo: {product.length} cm</p>
                <p>Ancho: {product.width} cm</p>
                <p>Alto: {product.height} cm</p>
                <p>Peso: {product.weight} kg</p>
              </div>
            </div>
          )}
          {selectedTab === 'formasdepago' && (
            <div className='flex flex-col space-y-2'>
              <div className='flex items-center'>
                <span>💵</span>
                <p className='ml-2 mt-1'>
                  Transf/efectivo $
                  {(Math.round(product.price,2)).toLocaleString(
                    'es-ES'
                  )}
                </p>
              </div>
              <div className='flex items-center'>
                <span>💳</span>
                <p className='ml-2 mt-[5px]'>
                  3 cuotas de $
                  {(Math.round(100*((product.price * (1 + rate3 / 100)) / 3))/100
                  ).toLocaleString('es-ES')}
                </p>
              </div>
              <div className='flex items-center'>
                <span>💳</span>
                <p className='ml-2 mt-[5px]'>
                  6 cuotas de $
                  {
                    Math.round(100*((product.price * (1 + rate6 / 100)) / 6))/100
                    .toLocaleString('es-ES')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Color, cantidad y total */}
        <div className='flex justify-between mt-8'>
          <ColorSelector
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
          <div className='flex flex-col items-center justify-between mt-4 mb-2 font-semibold'>
            <span className='mb-1 text-sm font-semibold'>CANTIDAD</span>
            <div className='bg-custom-black-2 h-11 w-28 lg:w-20 mt-0 rounded-3xl flex justify-around items-center'>
              <button
                onClick={decreaseQuantity}
                className='pl-4 rounded text-white'
              >
                -
              </button>
              <span className='mx-1 inline-block text-center w-2 text-white'>
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className='pr-4 rounded text-white'
              >
                +
              </button>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between mt-4 mb-2 font-semibold'>
            <span className='text-sm'>TOTAL</span>
            <p className='w-28 text-center bg-custom-black-2 h-11 flex justify-center items-center rounded-3xl text-white'>
              $ {totalPrice.toLocaleString('es-ES')}
            </p>
          </div>
        </div>

        {/* Botón agregar al carrito */}
        <button
          className='mt-4 bg-custom-green3 text-black h-11 px-6 py-2 text-sm font-bold w-full rounded-3xl'
          onClick={addToCart}
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </main>
  );
}
