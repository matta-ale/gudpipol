import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="text-black min-h-screen py-8 px-4 sm:px-8 lg:px-12 mt-32 lg:mt-48">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-5xl sm:text-4xl font-bold tracking-tight text-left text-gray-700">Nosotros</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Imagen y Misión */}
          <div className="space-y-10">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://res.cloudinary.com/di7oltk6y/image/upload/v1743251573/IMG_4064_wnefoj.jpg"
                alt="Nuestro equipo"
                width={800}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold border-l-4 border-custom-green3 pl-4 text-gray-700">Nuestra Misión</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Evitar que los plásticos se conviertan en residuos, otorgándoles
                una nueva vida en forma de productos hermosos y funcionales.
                Algunos buscan dejar su huella; nosotros queremos que la nuestra
                sea lo más pequeña posible.
              </p>
            </section>
          </div>

          {/* Texto Informativo */}
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold border-l-4 border-custom-green3 pl-4 text-gray-700">¿Quiénes Somos?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Somos dos amigos con el deseo de emprender. Después de meses de
                deliberación, decidimos concretar el sueño de crear algo propio.
                GudPipol es el resultado de innumerables ideas descartadas,
                conversaciones sin rumbo y noches en vela preguntándonos: ¿qué
                hacer y para quién hacerlo?
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                GudPipol es la respuesta a esas preguntas. Estamos convencidos
                de que hay una manera mejor de hacer las cosas. Creemos en las
                segundas oportunidades y en la transformación.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold border-l-4 border-custom-green3 pl-4 text-gray-700">Economía Circular</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
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
