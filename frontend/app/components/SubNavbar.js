'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProducts, getCollections } from '../redux/features/products/productsSlice';

const SubNavbar = ({ sloganVisible }) => {
  const dispatch = useDispatch();
  const allCollections = useSelector((state) => state.products.allCollections);
  const allProducts = useSelector((state) => state.products.allProducts);
  const [collectionsLoaded, setCollectionsLoaded] = useState(false);

  useEffect(() => {
    const loadCollections = async () => {
      // Solo cargar productos si aún no están cargados
      if (!allProducts.length) {
        await dispatch(getProducts());
      }
      await dispatch(getCollections());
      setCollectionsLoaded(true);
    };

    loadCollections();
  }, [dispatch]);

  const topOffset = sloganVisible ? 'top-28' : 'top-20';

  if (!collectionsLoaded) {
    return (
      <nav
        className={`bg-white h-12 hidden md:flex items-center justify-center px-5 border-y-2 border-y-custom-green3 fixed w-full z-20 transition-all duration-500 ease-in-out ${topOffset}`}
      >
        <p className='text-custom-green4 text-sm'>Cargando colecciones...</p>
      </nav>
    );
  }

  return (
    <nav
      className={`bg-white h-12 hidden md:flex items-center justify-center px-5 border-y-2 border-y-custom-green3 fixed w-full z-20 transition-all duration-500 ease-in-out ${topOffset}`}
    >
      <ul className='flex space-x-6 text-custom-green4 font-semibold text-sm'>
        {allCollections.map((collection) => (
          <li key={collection.id} className='flex items-center h-full'>
            <a
              href={`/products/${encodeURIComponent(collection.name)}`}
              className='hover:text-custom-green3'
            >
              {collection.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubNavbar;
