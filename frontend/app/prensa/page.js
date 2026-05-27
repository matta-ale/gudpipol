import React from 'react';

const articles = [
  {
    medium: 'La Capital',
    domain: 'lacapital.com.ar',
    title: 'Fabrican muebles de diseño con plástico 100% reciclado',
    description:
      'El diario rosarino destaca a GudPipol como una empresa que transforma residuos plásticos post consumo en muebles de exterior duraderos y funcionales.',
    url: 'https://www.lacapital.com.ar/negocios/fabrican-muebles-diseno-plastico-100-reciclado-n10055246.html',
  },
  {
    medium: 'Punto Biz',
    domain: 'puntobiz.com.ar',
    title: 'Son ingenieros y salieron al ruedo con muebles de plástico reciclado',
    description:
      'Punto Biz presenta la historia de los fundadores de GudPipol, dos ingenieros que decidieron emprender apostando a la economía circular y el diseño sustentable.',
    url: 'https://puntobiz.com.ar/negocios/son-ingenieros-y-salieron-al-ruedo-con-muebles-de-plastico-reciclado--2022915600',
  },
  {
    medium: 'Punto Biz',
    domain: 'puntobiz.com.ar',
    title: 'Brindan soluciones con plástico reciclado y apuestan a la economía circular',
    description:
      'Una segunda nota en Punto Biz profundiza en el modelo de negocio de GudPipol y su compromiso con la reutilización de materiales plásticos industriales y post consumo.',
    url: 'https://puntobiz.com.ar/negocios/brindan-soluciones-con-plastico-reciclado-y-apuestan-a-la-economia-circular-2023918600',
  },
  {
    medium: 'ON24',
    domain: 'on24.com.ar',
    title:
      'Empresa de muebles ecológicos prepara lanzamiento virtual y piensa en apertura de local céntrico',
    description:
      'ON24 cubre el crecimiento de GudPipol: su expansión al canal online y los planes de abrir un local en Rosario para acercar los muebles de plástico reciclado al público.',
    url: 'https://www.on24.com.ar/negocios/empresa-de-muebles-ecologicos-prepara-lanzamiento-virtual-y-piensa-en-apertura-de-local-centrico/',
  },
  {
    medium: 'Ser Argentino',
    domain: 'serargentino.com',
    title: 'Gudpipol: emprendedores conscientes y sustentables',
    description:
      'Ser Argentino perfila a GudPipol como un emprendimiento con propósito, que combina diseño, funcionalidad y conciencia ambiental para dar una segunda vida al plástico.',
    url: 'https://www.serargentino.com/emprendedores/gudpipol-emprendedores-conscientes-y-sustentables',
  },
];

function ArticleCard({ article }) {
  return (
    <a
      href={article.url}
      target='_blank'
      rel='noopener noreferrer'
      className='group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border-l-4 border-custom-green3'
    >
      <div className='flex flex-col flex-1 px-6 py-6 gap-3'>
        {/* Medio */}
        <div className='flex items-baseline gap-2'>
          <span className='text-custom-green4 font-bold text-xl tracking-tight'>
            {article.medium}
          </span>
          <span className='text-xs text-gray-400 tracking-wide'>
            {article.domain}
          </span>
        </div>

        {/* Título */}
        <h2 className='text-gray-700 font-semibold text-base sm:text-lg leading-snug group-hover:text-custom-green3 transition-colors duration-200'>
          {article.title}
        </h2>

        {/* Descripción */}
        <p className='text-gray-500 text-sm leading-relaxed flex-1'>
          {article.description}
        </p>

        {/* CTA */}
        <div className='flex items-center gap-1.5 text-custom-green3 font-semibold text-sm pt-2 border-t border-gray-100'>
          Leer nota
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='w-4 h-4 transition-transform duration-200 group-hover:translate-x-1'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function PrensaPage() {
  return (
    <div className='text-black min-h-screen py-8 px-2 sm:px-6 lg:px-12 mt-32 lg:mt-48'>
      <div className='max-w-5xl mx-auto space-y-10'>
        <div className='space-y-3'>
          <h1 className='text-5xl sm:text-4xl font-bold tracking-tight text-gray-700'>
            Prensa
          </h1>
          <p className='text-gray-500 text-lg'>
            Lo que los medios dijeron sobre GudPipol.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
