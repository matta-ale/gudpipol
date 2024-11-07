'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts} from '../redux/features/products/productsSlice';

export default function Products() {
  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.products.myProducts);
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
    };
    fetchData();
  }, [dispatch]);
  
  return (
    <main className='flex min-h-screen flex-col gap-16 items-center justify-between mt-32 lg:mt-44 md:grid md: grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  md:mx-auto md:justify-items-center max-w-[1200px]'>
      {myProducts ? (
        myProducts.map((product) => {
          return (
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
          );
        })
      ) : (
        <p>No products available</p>
      )}
    </main>
  );
}
