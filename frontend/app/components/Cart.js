import { useSelector } from 'react-redux';
import Image from 'next/image';
import cartImage from '../../public/img/cart.png'

export default function Cart() {
  // Obtenemos el contador de productos del carrito desde el estado de Redux
 const productQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className='relative'>
      {/* Imagen del carrito */}
      <Image
        src={cartImage}  // Asegúrate de que el path a la imagen es correcto
        alt='Carrito de compras'
        width={30}  // Ajusta el tamaño de la imagen
        height={30}  // Ajusta el tamaño de la imagen
      />
      
      {/* Contador de productos */}
      {productQuantity > 0 && (
        <div className='absolute top-0 right-0 bg-custom-lightGreen text-black rounded-full text-[9px] w-4 h-4 flex items-center justify-center border border-white' style={{ transform: 'translate(60%, -30%)' }}>
          {productQuantity}
        </div>
      )}
    </div>
  );
}
