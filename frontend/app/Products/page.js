'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts} from '../redux/features/products/productsSlice';

export default function Home() {
  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.products.myProducts);
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
    };
    fetchData();
  }, [dispatch]);
  
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
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
            />
          );
        })
      ) : (
        <p>No products available</p>
      )}
    </main>
  );
}
