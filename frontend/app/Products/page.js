'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts} from '../redux/features/products/productsSlice';
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
    
      <ProductsContainer products={allProducts}/>
    </>
  );
}
