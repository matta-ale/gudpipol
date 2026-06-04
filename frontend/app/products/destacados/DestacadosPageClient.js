'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteProducts } from '../../redux/features/products/productsSlice';
import ProductsContainer from '../../components/ProductsContainer';

export default function DestacadosPageClient() {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(
    (state) => state.products.favoriteProducts
  );

  useEffect(() => {
    dispatch(getFavoriteProducts());
  }, [dispatch]);

  return (
    <>
      <div className='container mx-auto'>
        <div className='max-w-[1200px] mx-auto'>
          <h1 className='text-4xl font-bold text-custom-green5 mt-40 md:mt-52 text-center md:text-start'>
            Productos destacados
          </h1>
        </div>
      </div>
      <ProductsContainer products={favoriteProducts} />
    </>
  );
}
