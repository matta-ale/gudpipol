'use client';
import { useRef } from 'react';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FavoriteProductsContainer = ({ products }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (direction === 'left') {
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full max-w-[1200px] mx-auto mt-16 z-50">
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronLeft />
      </button>
      <div
        ref={containerRef}
        className="flex gap-8 md:gap-4 px-0 snap-x snap-mandatory scroll-smooth ml-[38px] md:ml-20 h-[550px] md:w-[990px] py-8 overflow-x-hidden z-50"
      >
        {products?.map((product) => (
          <div
            key={product.id}
            className="snap-start flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw]"
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
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronRight />
      </button>
    </section>
  );
};

export default FavoriteProductsContainer;
