'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCollections, getProducts} from '../redux/features/products/productsSlice';

const SubNavbar = ({ sloganVisible }) => {
  const allCollections = useSelector((state) => state.products.allCollections);
  const [hasMounted, setHasMounted] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    setHasMounted(true);
    dispatch(getCollections())
  }, []);

  if (!hasMounted || !Array.isArray(allCollections)) return null;

  return (
    <nav
      className={`bg-white h-12 hidden md:flex items-center justify-center px-5 border-y-2 border-y-custom-green3 fixed w-full z-20 transition-all duration-500 ease-in-out ${
        sloganVisible ? 'top-28' : 'top-20'
      }`}
    >
      <ul className='flex space-x-6 text-custom-green4 font-semibold text-sm'>
        {allCollections.length > 0 ? (
          allCollections.map((collection) => (
            <li key={collection.id} className='flex items-center h-full'>
              <a
                href={`/products/${encodeURIComponent(collection.name)}`}
                className='hover:text-custom-green3'
              >
                {collection.name}
              </a>
            </li>
          ))
        ) : (
          <p>Cargando colecciones...</p>
        )}
      </ul>
    </nav>
  );
};

export default SubNavbar;
