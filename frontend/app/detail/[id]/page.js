'use client'; 
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function ProductDetail({ params }) {
  const { id } = params; // Aquí obtenemos el id del producto desde los parámetros de la URL

  const products = useSelector((state) => state.products.myProducts);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products) {
      const selectedProduct = products.find(
        (product) => product.id === id
      );
      console.log(selectedProduct);
      setProduct(selectedProduct);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className='flex flex-col items-center justify-center mt-60 lg:mt-44 max-w-[1200px] mx-auto h-96 font-semibold text-lg'>
        <p>Cargando detalle de producto...</p>
      </div>
    );
  }
  console.log("Producto:");
  console.log(product);
  return (
    <main className='flex flex-col items-center justify-center mt-60 lg:mt-44 max-w-[1200px] mx-auto h-96 bg-pink-400 z-90'>
      <div className='border p-4'>
        <img
          src={product.images?.[0]}
          alt={product.name}
          className='h-64 w-64 object-cover'
        />
        <h1 className='text-2xl font-bold'>{product.name}</h1>
        <p>{product.description}</p>
        <p>Collection: {product.collection.name}</p>
        <p>
          Dimensions: {product.length}x{product.width}x{product.height} cm
        </p>
        <p>Weight: {product.weight} kg</p>
        <p>Price: ${product.price}</p>
      </div>
    </main>
  );
}
