'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/features/products/productsSlice';
import ProductsContainer from '../components/ProductsContainer';

export default function Products() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className='container mx-auto'>
        <div className='max-w-[1200px] mx-auto'>
          <h1 className='text-4xl font-bold text-custom-green5 mt-40 md:mt-52 text-center md:text-start'>
            Productos
          </h1>
        </div>
      </div>
      <ProductsContainer products={allProducts} />
    </>
  );
}
