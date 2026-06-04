'use client';
import { useRef } from 'react';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FavoriteProductsContainer = ({ products }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const firstCard = containerRef.current?.querySelector('[data-card]');
    const amount = firstCard ? firstCard.offsetWidth + 16 : 286;
    containerRef.current?.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className='relative w-full'>
      {/* Arrows — mobile/tablet only */}
      <button
        onClick={() => scroll('left')}
        aria-label='Anterior'
        className='xl:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-custom-green5 hover:bg-custom-green4 active:scale-95 text-white rounded-full shadow-lg transition-all duration-200'
      >
        <ChevronLeft size={15} />
      </button>

      {/* Mobile/tablet: horizontal scroll carousel */}
      <div
        ref={containerRef}
        className='xl:hidden flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 px-10 md:px-14'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products?.map((product) => (
          <div
            key={product.id}
            className='snap-center flex-shrink-0 w-[calc(100vw-5rem)] md:w-auto flex justify-center md:block'
            data-card='true'
          >
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
              collection={product.collection}
              length={product.length}
              width={product.width}
              height={product.height}
              weight={product.weight}
              isDestacado={product.isDestacado}
              isActive={product.isActive}
              images={product.images}
              price={product.price}
            />
          </div>
        ))}
      </div>

      {/* Desktop: grid showing all cards */}
      <div className='hidden xl:grid xl:grid-cols-4 gap-6 py-6'>
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            collection={product.collection}
            length={product.length}
            width={product.width}
            height={product.height}
            weight={product.weight}
            isDestacado={product.isDestacado}
            isActive={product.isActive}
            images={product.images}
            price={product.price}
          />
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        aria-label='Siguiente'
        className='xl:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-custom-green5 hover:bg-custom-green4 active:scale-95 text-white rounded-full shadow-lg transition-all duration-200'
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
};

export default FavoriteProductsContainer;

