'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaWhatsapp, FaTimes, FaShoppingCart } from 'react-icons/fa';
import ColorSelector from '@/app/components/ColorSelector';
import { addItemToCart } from '@/app/redux/features/cart/cartSlice';

const PHONE = '5493415924709';

export default function DetailPageClient({ params }) {
  const { id } = params;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.myProducts);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('descripcion');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Marron');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const imageRef = useRef(null);
  const rate3 = process.env.NEXT_PUBLIC_RATE_3_CUOTAS;
  const rate6 = process.env.NEXT_PUBLIC_RATE_6_CUOTAS;

  useEffect(() => {
    if (products && products.length > 0) {
      const selectedProduct = products.find((product) => product.id === id);
      if (selectedProduct) {
        setProduct(selectedProduct);
        setIsImageLoading(true);
      }
    }
  }, [id, products]);

  useEffect(() => {
    if (product) return;
    // Solo omitir el fetch si este producto específico ya está en Redux
    if (products?.find((p) => p.id === id)) return;

    const controller = new AbortController();

    const fetchProduct = async () => {
      setLoadingFetch(true);
      setFetchError(false);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const res = await fetch(`${backendUrl}/products/${id}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('fetch_failed');
        const data = await res.json();
        const fetched = data.product ?? data;
        setProduct(fetched);
        setIsImageLoading(true);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setFetchError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingFetch(false);
        }
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [id, product, products]);

  useEffect(() => {
    if (!isZoomed) return;
    const handleKey = (e) => { if (e.key === 'Escape') setIsZoomed(false); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined' && window.gtag_report_conversion) {
      window.gtag_report_conversion();
    }
    const msg = encodeURIComponent(
      `Hola! Me interesa el producto: ${product.name} - $${product.price.toLocaleString('es-ES')}`,
    );
    window.open(`https://wa.me/${PHONE}?text=${msg}`, '_blank');
  };

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
      }),
    );
  };

  if (fetchError) {
    return (
      <div className='flex flex-col items-center justify-center text-center mx-auto mt-32 lg:mt-52 mb-16 px-6 max-w-sm'>
        <div className='relative mb-6'>
          <div className='w-28 h-28 rounded-full bg-red-50 flex items-center justify-center'>
            <span className='text-5xl'>⚠️</span>
          </div>
        </div>
        <h2 className='text-2xl font-bold text-gray-700 mb-2'>
          No pudimos cargar el producto
        </h2>
        <p className='text-gray-400 text-sm mb-8 leading-relaxed'>
          El servidor puede estar iniciando. Por favor intentá de nuevo en unos
          segundos.
        </p>
        <button
          onClick={() => {
            setFetchError(false);
            setProduct(null);
          }}
          className='inline-flex items-center gap-2 bg-custom-green3 hover:bg-custom-green4 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='flex flex-col items-center justify-center text-center mx-auto mt-32 lg:mt-52 mb-16 px-6 max-w-sm'>
        <div className='relative mb-6'>
          <div className='w-28 h-28 rounded-full bg-custom-green2 flex items-center justify-center'>
            <div className='w-12 h-12 border-4 border-custom-green2 border-t-custom-green5 rounded-full animate-spin'></div>
          </div>
        </div>
        <h2 className='text-2xl font-bold text-gray-700 mb-2'>
          Cargando producto...
        </h2>
        <p className='text-gray-400 text-sm leading-relaxed'>
          {loadingFetch
            ? 'El servidor puede estar iniciando. Esto puede tomar unos segundos.'
            : 'Buscando la información del producto...'}
        </p>
      </div>
    );
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);
  const totalPrice = product.price * quantity;

  const handleImageSelect = (index) => {
    setIsImageLoading(true);
    setCurrentImageIndex(index);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const zoomModal = isZoomed && typeof window !== 'undefined' && window.innerWidth >= 768
    ? createPortal(
        <div className='fixed inset-0 flex items-center justify-center' style={{ zIndex: 9999 }}>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/70 backdrop-blur-sm'
            onClick={() => setIsZoomed(false)}
          />
          {/* Imagen ampliada */}
          <div className='relative w-[92vw] h-[88vh] max-w-[1200px] max-h-[820px]' style={{ zIndex: 10000 }}>
            {isImageLoading && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin' />
              </div>
            )}
            <Image
              src={product.images?.[currentImageIndex]?.url}
              fill
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              alt={product.name}
              onLoad={handleImageLoad}
              className={`transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            />
            {product.images?.length > 1 && (
              <>
                <button
                  className='absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200'
                  onClick={() => handleImageSelect((currentImageIndex - 1 + product.images.length) % product.images.length)}
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  className='absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200'
                  onClick={() => handleImageSelect((currentImageIndex + 1) % product.images.length)}
                >
                  <FaChevronRight size={20} />
                </button>
                {/* Miniaturas en zoom */}
                <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2'>
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleImageSelect(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        currentImageIndex === i ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            {/* Cerrar */}
            <button
              className='absolute top-3 right-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200'
              onClick={() => setIsZoomed(false)}
            >
              <FaTimes size={16} />
            </button>
            {/* Hint */}
            <p className='absolute bottom-3 right-4 text-white/50 text-[11px] select-none'>ESC para cerrar</p>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
    {zoomModal}
    <main className='flex flex-col lg:flex-row items-start justify-center mt-32 lg:mt-56 w-[360px] lg:w-[650px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white'>
      {/* Recuadro izquierdo */}
      <div className='w-full lg:w-[280px] flex flex-col bg-white'>

        {/* ── Imagen principal ── */}
        <div
          className='relative w-full overflow-hidden group'
          style={{ aspectRatio: '4/3' }}
        >

          {/* Loader */}
          {isImageLoading && (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-50 z-[70]'>
              <div className='w-10 h-10 border-4 border-gray-200 border-t-custom-green3 rounded-full animate-spin' />
            </div>
          )}

          {/* Imagen */}
          <Image
            src={product.images?.[currentImageIndex]?.url}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            alt={product.name}
            onLoad={handleImageLoad}
            onClick={() => { if (window.innerWidth >= 768) setIsZoomed(true); }}
            className={`transition-all duration-500 group-hover:scale-105 ${isImageLoading ? 'opacity-0' : 'opacity-100'} md:cursor-pointer`}
          />

          {/* Zoom hint badge — desktop hover */}
          <div className='hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
            <div className='flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold tracking-wide px-4 py-2 rounded-full shadow-lg'>
              <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='11' cy='11' r='8'/>
                <line x1='21' y1='21' x2='16.65' y2='16.65'/>
                <line x1='11' y1='8' x2='11' y2='14'/>
                <line x1='8' y1='11' x2='14' y2='11'/>
              </svg>
              Ampliar imagen
            </div>
          </div>

          {/* Flechas – sólo si hay >1 imagen */}
          {product.images?.length > 1 && (
            <>
              <button
                className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full z-[60] shadow-md transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100'
                onClick={(e) => { e.stopPropagation(); handleImageSelect((currentImageIndex - 1 + product.images.length) % product.images.length); }}
              >
                <FaChevronLeft size={13} />
              </button>
              <button
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full z-[60] shadow-md transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100'
                onClick={(e) => { e.stopPropagation(); handleImageSelect((currentImageIndex + 1) % product.images.length); }}
              >
                <FaChevronRight size={13} />
              </button>
              {/* Contador */}
              <div className='absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full z-[60] transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100'>
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </>
          )}
        </div>

        {/* ── Strip de miniaturas – sólo si hay >1 imagen ── */}
        {product.images?.length > 1 && (
          <div className='flex gap-2 px-3 py-2.5 overflow-x-auto bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(index)}
                className={`relative flex-shrink-0 w-[52px] h-[52px] rounded-lg overflow-hidden transition-all duration-200 ${
                  currentImageIndex === index
                    ? 'ring-2 ring-custom-green4 ring-offset-1 opacity-100'
                    : 'opacity-45 hover:opacity-80'
                }`}
              >
                <Image
                  src={img.url}
                  fill
                  style={{ objectFit: 'cover' }}
                  alt={`${product.name} ${index + 1}`}
                  sizes='52px'
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Info del producto ── */}
        <div className='flex flex-col px-4 pt-4 pb-4 text-custom-black bg-white'>
          <p className='text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1'>
            {product.collection.name}
          </p>
          <h1 className='text-xl font-bold mb-1'>{product.name}</h1>
          <p className='font-semibold text-xl mb-0.5'>
            $ {product.price.toLocaleString('es-ES')}
          </p>
          <p className='text-xs text-gray-500'>
            o 6 cuotas de ${' '}
            {Math.round((product.price * (1 + rate6 / 100)) / 6).toLocaleString('es-ES')}
          </p>
        </div>
      </div>

      {/* Recuadro derecho */}
      <div className='w-full lg:w-[370px] relative h-full text-custom-black bg-white px-4 md:px-8 py-4'>
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
                  {Math.round(product.price, 2).toLocaleString('es-ES')}
                </p>
              </div>
              <div className='flex items-center'>
                <span>💳</span>
                <p className='ml-2 mt-[5px]'>
                  3 cuotas de $
                  {(
                    Math.round(
                      100 * ((product.price * (1 + rate3 / 100)) / 3),
                    ) / 100
                  ).toLocaleString('es-ES')}
                </p>
              </div>
              <div className='flex items-center'>
                <span>💳</span>
                <p className='ml-2 mt-[5px]'>
                  6 cuotas de $
                  {(
                    Math.round(
                      100 * ((product.price * (1 + rate6 / 100)) / 6),
                    ) / 100
                  ).toLocaleString('es-ES')}
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
            <div className='bg-custom-black-2 h-11 w-24 lg:w-20 mt-0 rounded-3xl flex justify-around items-center'>
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

        {/* Botones */}
        <div className='mt-4 flex flex-col gap-2'>
          <button
            className='flex items-center justify-center gap-1.5 bg-custom-green3 hover:bg-custom-green5 text-white h-11 px-6 py-2 text-sm font-bold w-full rounded-xl transition-colors shadow-sm'
            onClick={addToCart}
          >
            <FaShoppingCart size={15} />
            Agregar al carrito
          </button>
          <button
            className='flex items-center justify-center gap-1.5 bg-[#1da850] hover:bg-[#0c7e34] text-white h-11 px-6 py-2 text-sm font-bold w-full rounded-xl transition-colors shadow-sm'
            onClick={handleWhatsApp}
          >
            <FaWhatsapp size={16} />
            Consultar por WhatsApp
          </button>
        </div>
      </div>
    </main>
    </>
  );
}
