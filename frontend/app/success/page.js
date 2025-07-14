'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

  return (
    <main className="w-[95%] md:w-[800px] mx-auto mt-24 md:mt-44 py-6 rounded-lg text-center text-custom-black bg-white">
      <h1 className=" text-2xl font-bold mb-4">¡Compra Exitosa!</h1>
      <p className=" mb-6">Tu pago ha sido aprobado y tu pedido está en proceso.</p>
      <button
        onClick={() => router.push('/')}
        className="bg-custom-green3 text-black font-bold py-2 px-6 rounded-lg"
      >
        Volver al Inicio
      </button>
    </main>
  );
}
