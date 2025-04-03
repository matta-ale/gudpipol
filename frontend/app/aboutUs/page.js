import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className='bg-custom-black opacity-90 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-32 lg:mt-48'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-5xl font-bold tracking-wide mb-8 text-left'>Nosotros</h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 lg:flex-row-reverse gap-2 items-center'>

          {/* Columna Izquierda: Imagen + Misión */}
          <div className='flex flex-col gap-8 lg:w-2/3'>
            <div className='relative w-full mt-6'>
              <Image
                src='https://res.cloudinary.com/di7oltk6y/image/upload/v1743251573/IMG_4064_wnefoj.jpg'
                alt='Nuestro equipo'
                width={600}
                height={400}
                className='rounded-lg object-cover w-full h-auto shadow-lg'
              />
            </div>
            <section>
              <h2 className='text-2xl font-bold tracking-wide mb-6'>Nuestra Misión</h2>
              <p className='text-lg text-gray-300 leading-relaxed lg:max-w-prose'>
                Evitar que los plásticos se conviertan en residuos, otorgándoles
                una nueva vida en forma de productos hermosos y funcionales.
                Algunos buscan dejar su huella; nosotros queremos que la nuestra
                sea lo más pequeña posible.
              </p>
            </section>
          </div>

          {/* Columna Derecha: ¿Quiénes somos? + Economía Circular */}
          <div className='flex flex-col gap-8'>
            <section>
              <h2 className='text-2xl font-bold tracking-wide mb-6'>¿Quiénes Somos?</h2>
              <p className='text-lg text-gray-300 leading-relaxed lg:max-w-prose'>
                Somos dos amigos con el deseo de emprender. Después de meses de
                deliberación, decidimos concretar el sueño de crear algo propio.
                GudPipol es el resultado de innumerables ideas descartadas,
                conversaciones sin rumbo y noches en vela preguntándonos: ¿qué
                hacer y para quién hacerlo?
              </p>
              <p className='text-lg text-gray-300 leading-relaxed lg:max-w-prose mt-4'>
                GudPipol es la respuesta a esas preguntas. Estamos convencidos
                de que hay una manera mejor de hacer las cosas. Creemos en las
                segundas oportunidades y en la transformación.
              </p>
            </section>
            <section className='mt-6 lg:mt-10'>
              <h2 className='text-2xl font-bold tracking-wide mb-6'>Economía Circular</h2>
              <p className='text-lg text-gray-300 leading-relaxed lg:max-w-prose'>
                Algunos lo llaman economía circular; nosotros lo llamamos GudPipol.
              </p>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
