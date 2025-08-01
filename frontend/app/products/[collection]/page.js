'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredProducts } from '../../redux/features/products/productsSlice';
import ProductsContainer from '../../components/ProductsContainer';

export default function Products({ params }) {
  const { collection } = params;
  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.products.myProducts);
  const loading = useSelector((state) => state.products.loadingProducts);

  useEffect(() => {
    dispatch(getFilteredProducts(collection));
  }, [dispatch, collection]);

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center mt-60'>
          <div className='w-8 h-8 border-4 border-custom-green4 border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : (
        <>
          <div className='container mx-auto'>
            <div className='max-w-[1200px] mx-auto'>
              <h1 className='text-4xl font-bold text-custom-green5 mt-40 md:mt-52 text-center md:text-start'>
                {collection}
              </h1>
            </div>
          </div>
          <ProductsContainer products={myProducts} />
        </>
      )}
    </>
  );
}
