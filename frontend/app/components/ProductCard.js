import React from 'react';
import Image from 'next/image';
import placeholderImage from '../../public/img/No-Image-Placeholder.svg'

const ProductCard = ( product ) => {
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : placeholderImage;
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative mb-4">
        <Image
          src={imageUrl}
          alt={product.name}
          width={300}
          height={200}
          className="rounded-lg"
        />
        <div className="absolute top-0 left-0 bg-blue-500 text-white p-2 rounded-tr-lg">
          0 % OFF
        </div>
      </div>
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-600 font-semibold">${product.price}</span>
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:underline">Details</button>
          <button className="text-blue-500 hover:underline">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

