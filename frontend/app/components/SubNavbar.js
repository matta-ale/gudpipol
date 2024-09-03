import { useSelector } from 'react-redux';

export default function SubNavbar() {
  const allCollections = useSelector((state) => state.products.allCollections);
  console.log(allCollections);

  return (
    <nav className='invisible lg:visible bg-white h-0 lg:h-12 flex items-center justify-center px-5 border-b-2 border-b-custom-green'>
      <ul className='flex space-x-6 text-black font-semibold'>
        {allCollections ? (
          allCollections.map((collection) => {
            return (
              <li className='flex items-center h-full'>
                <a href='/' className='hover:text-gray-300'>
                  {collection.name}
                </a>
              </li>
            );
          })
        ) : (
          <p>No collections available</p>
        )}
      </ul>
    </nav>
  );
}
