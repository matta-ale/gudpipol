'use client';
import React, { useState } from 'react';

const faqs = [
  {
    question: '¿De qué están hechos los muebles GudPipol?',
    answer:
      'Nuestros muebles están fabricados con plástico 100% reciclado recuperado de residuos post consumo e industriales. Transformamos desechos plásticos en productos duraderos, funcionales y diseñados para exteriores.',
  },
  {
    question: '¿Los muebles resisten el sol y la lluvia?',
    answer:
      'Sí. Están diseñados especialmente para uso exterior y soportan lluvia, humedad, sol y cambios climáticos sin deteriorarse como la madera tradicional.',
  },
  {
    question: '¿Necesitan mantenimiento?',
    answer:
      'No. A diferencia de la madera, nuestros muebles no requieren pintura, barniz ni tratamientos especiales. Solo necesitás limpiarlos con agua y jabón neutro.',
  },
  {
    question: '¿Se pudren o los atacan insectos?',
    answer:
      'No. El plástico reciclado no se pudre, no absorbe humedad y no es afectado por termitas ni otros insectos.',
  },
  {
    question: '¿Los muebles se decoloran con el tiempo?',
    answer:
      'Nuestros productos están preparados para exteriores y poseen alta resistencia al desgaste climático. Con el paso de los años puede haber una variación natural del tono, pero sin afectar la estructura ni funcionalidad del producto.',
  },
  {
    question: '¿Son resistentes?',
    answer:
      'Sí. Diseñamos muebles robustos y pensados para durar muchos años. El material tiene gran resistencia estructural y soporta uso intensivo en hogares, comercios y espacios públicos.',
  },
  {
    question: '¿Pueden quedar a la intemperie todo el año?',
    answer:
      'Sí. Los muebles GudPipol están hechos para permanecer en exteriores durante todo el año.',
  },
  {
    question: '¿Cómo se limpian?',
    answer:
      'Con agua, jabón neutro y un paño o cepillo suave. No requieren productos especiales.',
  },
  {
    question: '¿Los muebles vienen armados?',
    answer:
      'Depende del producto. Algunos se entregan completamente armados y otros semiarmados para facilitar el transporte. En esos casos, incluimos instructivo y herrajes.',
  },
  {
    question: '¿Hacen envíos?',
    answer: 'Sí. Realizamos envíos a todo Argentina.',
  },
  {
    question: '¿Cuánto demora la entrega?',
    answer:
      'Los tiempos de entrega dependen del producto y la localidad de destino. Antes de realizar la compra podés consultarnos por WhatsApp el plazo estimado.',
  },
  {
    question: '¿Puedo personalizar colores o medidas?',
    answer:
      'En algunos modelos sí. Consultanos y vemos las posibilidades de personalización según stock y producción.',
  },
  {
    question: '¿Los productos son realmente sustentables?',
    answer:
      'Sí. Nuestro objetivo es darle una segunda vida al plástico reciclado y evitar que termine contaminando el ambiente. Cada mueble representa kilos de plástico recuperado y reutilizado.',
  },
  {
    question: '¿Qué diferencia hay con un mueble de madera?',
    answer:
      'Nuestros muebles ofrecen una estética moderna y muchísima menos necesidad de mantenimiento. No requieren pintura, no se astillan, no se pudren y tienen una vida útil muy larga en exteriores.',
  },
  {
    question: '¿Puedo usar los muebles cerca de una pileta o en zonas húmedas?',
    answer:
      'Sí. Son ideales para jardines, galerías, balcones, quinchos y zonas de pileta porque no absorben agua ni se deterioran con la humedad.',
  },
  {
    question: '¿Cómo puedo comunicarme con ustedes?',
    answer:
      'Podés escribirnos por Instagram, WhatsApp o desde el formulario de contacto en nuestra web.',
  },
];

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className='border-b border-gray-200 last:border-none'>
      <button
        onClick={() => setOpen(!open)}
        className='w-full flex justify-between items-center py-5 text-left gap-4 group'
      >
        <span className='text-base sm:text-lg font-semibold text-gray-700 group-hover:text-custom-green3 transition-colors duration-200'>
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border-2 border-custom-green3 text-custom-green3 transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
            className='w-3.5 h-3.5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className='text-gray-600 leading-relaxed text-base'>{answer}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className='text-black min-h-screen py-8 px-2 sm:px-6 lg:px-12 mt-32 lg:mt-48'>
      <div className='max-w-3xl mx-auto space-y-10'>
        <h1 className='text-5xl sm:text-4xl font-bold tracking-tight text-left text-gray-700'>
          Preguntas Frecuentes - FAQ
        </h1>
        <div className='bg-white rounded-2xl shadow-md px-4 sm:px-8 py-2'>
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <p className='text-gray-500 text-sm text-center'>
          ¿No encontraste lo que buscabas?{' '}
          <a href='/contact' className='text-custom-green3 hover:underline font-medium'>
            Contactanos
          </a>
          .
        </p>
      </div>
    </div>
  );
}
