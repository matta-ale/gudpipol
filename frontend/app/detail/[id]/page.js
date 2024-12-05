'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ColorSelector from '@/app/components/ColorSelector';
import { addItemToCart } from '@/app/redux/features/cart/cartSlice';

export default function ProductDetail({ params }) {
  const { id } = params; // Aquí obtenemos el id del producto desde los parámetros de la URL
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.myProducts);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('descripcion');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para imagen actual
  const [selectedColor, setSelectedColor] = useState('#463F34'); // Estado de color seleccionado

  useEffect(() => {
    if (products) {
      const selectedProduct = products.find((product) => product.id === id);
      setProduct(selectedProduct);
    }
  }, [id, products]);

  const addToCart = () => {
    dispatch(addItemToCart({
      id: product.id,
      name: product.name,
      collection: product.collection.name,
      price: product.price,
      quantity,
      image: product.images?.[0]?.url || '',
      color: selectedColor // Usa el color seleccionado aquí
    }));
  };

  if (!product) {
    return (
      <div className='flex flex-col items-center justify-center mt-60 lg:mt-44 max-w-[1200px] mx-auto h-96 font-semibold text-lg'>
        <p>Cargando detalle de producto...</p>
      </div>
    );
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const totalPrice = product.price * quantity;

  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <main className='grid grid-rows-2 lg:grid-rows-1 w-[370px] lg:grid-cols-2 items-center justify-center mt-60 lg:mt-56 lg:w-[800px] lg:h-[500px] mx-auto shadow-2xl shadow-black'>
      {/* primer recuadro  */}
      <div className='p-4  relative h-full lg:max-h-[500px] w-[370px] lg:w-full'>
        <Image
          src={product.images?.[currentImageIndex]?.url}
          layout='fill'
          objectFit='cover'
          alt={product.name}
        />

        {/* Flecha izquierda */}
        <button
          className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
          onClick={() =>
            handleImageSelect(
              (currentImageIndex - 1 + product.images.length) %
                product.images.length
            )
          }
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Flecha derecha */}
        <button
          className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
          onClick={() =>
            handleImageSelect((currentImageIndex + 1) % product.images.length)
          }
        >
          <FaChevronRight size={20} />
        </button>

        {/* Rounded Buttons to navigate images */}
        <div className='absolute bottom-4 left-0 right-0 flex justify-center'>
          {product.images?.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                currentImageIndex === index ? 'bg-yellow-400' : 'bg-gray-400'
              }`}
              onClick={() => handleImageSelect(index)}
            ></button>
          ))}
        </div>
      </div>
      {/* segundo recuadro */}
      <div className='w-[370px] relative h-full bg-custom-black text-white px-8 py-10 lg:max-h-[500px] lg:w-full'>
        <p className='text-gray-400 text-sm mb-1'>{product.collection.name}</p>
        <h1 className='text-2xl font-bold mb-2'>{product.name}</h1>
        <p className='font-semibold text-2xl'>
          $ {product.price.toLocaleString('es-ES')}
        </p>
        <p className='mb-4 text-xs text-yellow-400'>
          (hasta 6 cuotas sin interés)
        </p>

        {/* Tabs Section */}
        <div className='mt-2 text-sm flex justify-between border-b border-gray-700'>
          <button
            className={`mr-2 pb-2 ${
              selectedTab === 'descripcion'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedTab('descripcion')}
          >
            DETALLE
          </button>
          <button
            className={`mr-2 pb-2 ${
              selectedTab === 'medidas'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedTab('medidas')}
          >
            MEDIDAS
          </button>
          <button
            className={`pb-2 ${
              selectedTab === 'formasdepago'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedTab('formasdepago')}
          >
            FORMAS DE PAGO
          </button>
        </div>

        <div className='mt-4 text-gray-400 w-[360px] min-h-[96px] max-h-[96px] overflow-y-auto custom-scrollbar flex'>
          {selectedTab === 'descripcion' && <p>{product.description}</p>}
          {selectedTab === 'medidas' && (
            <div className='grid grid-cols-2 w-full'>
              <div className='flex flex-col items-start'>
                <p>Largo: {product.length} cm</p>
                <p>Ancho: {product.width} cm</p>
                <p>Alto: {product.height} kg</p>
                <p>Peso: {product.weight} kg</p>
              </div>
            </div>
          )}
          <div>
            {selectedTab === 'formasdepago' && (
              <div className='flex items-center'>
                <span>💵</span>
                <p className='ml-2 mt-1'>
                  Transf/efectivo (-25%) ${' '}
                  {(
                    Math.round(100 * (product.price * 0.75)) / 100
                  ).toLocaleString('es-ES')}
                </p>
              </div>
            )}
            {selectedTab === 'formasdepago' && (
              <div className='flex items-center'>
                <span>💳</span>
                <p className='ml-2 mt-[5px]'>
                  3 cuotas sin interés de ${' '}
                  {(Math.round(100 * (product.price / 3)) / 100).toLocaleString(
                    'es-ES'
                  )}
                </p>
              </div>
            )}
            {selectedTab === 'formasdepago' && (
              <div className='flex items-center'>
                <span>💳</span>
                <p className='ml-2 mt-[5px]'>
                  6 cuotas sin interés de ${' '}
                  {(Math.round(100 * (product.price / 6)) / 100).toLocaleString(
                    'es-ES'
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='flex justify-between mt-1'>
          {/* Color Selection */}
          <ColorSelector selectedColor={selectedColor} onColorSelect={setSelectedColor} />
          {/* Quantity and Add to Cart */}
          <div className='flex flex-col items-center justify-between mt-4 mb-2 font-semibold'>
            <span className='mb-1 text-sm font-semibold'>CANTIDAD</span>
            <div className='bg-custom-black-2 h-11 w-24 mt-0 rounded-3xl flex justify-around items-center'>
              <button
                onClick={decreaseQuantity}
                className='pl-4 rounded text-white'
              >
                -
              </button>
              {/* Ancho fijo para la cantidad */}
              <span className='mx-1 inline-block text-center w-8'>
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
            {/* Ancho fijo para el total */}
            <p className='w-24 text-center bg-custom-black-2 h-11 flex justify-center items-center rounded-3xl'>
              $ {totalPrice.toLocaleString('es-ES')}
            </p>
          </div>
        </div>
        {/* Add to Cart Button */}
        <button
          className='mt-4 bg-yellow-400 text-black h-11 px-6 py-2 text-sm font-bold w-full rounded-3xl'
          onClick={addToCart}
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </main>
  );
}
