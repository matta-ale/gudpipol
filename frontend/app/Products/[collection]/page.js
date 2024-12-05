'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredProducts } from '../../redux/features/products/productsSlice';
import ProductsContainer from '../../components/ProductsContainer';

export default function Products({ params }) {
  const { collection } = params;
  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.products.myProducts);
  useEffect(() => {
    const fetchData = async (collection) => {
      dispatch(getFilteredProducts(collection));
    };
    fetchData(collection);
  }, [dispatch]);

  return (
    <>
      <ProductsContainer products={myProducts} />
    </>
  );
}
