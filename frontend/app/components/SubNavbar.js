import { useSelector } from 'react-redux';

const SubNavbar = ({ sloganVisible }) => {
  const allCollections = useSelector((state) => state.products.allCollections);

  return (
    <nav
      className={`bg-white h-12 hidden md:flex items-center justify-center px-5 border-y-2 border-y-custom-green fixed w-full z-20 transition-all duration-500 ease-in-out ${
        sloganVisible ? 'top-28' : 'top-20'
      }`}
    >
      <ul className='flex space-x-6 text-black font-semibold text-sm'>
        {allCollections.length > 0 ? (
          allCollections.map((collection) => (
            <li key={collection.id} className='flex items-center h-full'>
              <a href={`/products/${collection.name}`} className='hover:text-gray-300'>
                {collection.name}
              </a>
            </li>
          ))
        ) : (
          <p>No collections available</p>
        )}
      </ul>
    </nav>
  );
};

export default SubNavbar;
