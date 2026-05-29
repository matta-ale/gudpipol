import React from 'react';

export const metadata = {
  title: 'Nuestros Clientes',
  description:
    'Empresas y organismos que confían en los muebles de plástico reciclado de GudPipol: gastronomía, hotelería, municipios y más.',
  alternates: { canonical: 'https://www.gudpipol.com.ar/clientes' },
  openGraph: {
    title: 'Nuestros Clientes | GudPipol',
    description:
      'Empresas y organismos que confían en los muebles de plástico reciclado de GudPipol.',
    url: 'https://www.gudpipol.com.ar/clientes',
  },
};

const categories = [
  {
    icon: '🏛️',
    name: 'Municipios y Comunas',
    clients: [
      { name: 'Municipalidad de San Lorenzo' },
      { name: 'Municipalidad de Funes' },
      { name: 'Comuna de Fuentes' },
      { name: 'Municipalidad de Monte Buey' },
      { name: 'Municipalidad de San Nicolás' },
      { name: 'Municipalidad Fray Luis Beltrán' },
    ],
  },
  {
    icon: '🎓',
    name: 'Educación e Instituciones Públicas',
    clients: [
      { name: 'ATEN Neuquén' },
      { name: 'UNR — Universidad Nacional de Rosario' },
      { name: 'Escuela Superior de Comercio de Rosario' },
      { name: 'Instituto Politécnico Superior de Rosario' },
      { name: 'Instituto Liceo Avellaneda de Rosario' },
    ],
  },
  {
    icon: '⚽',
    name: 'Clubes y Countries',
    clients: [
      { name: 'Club Universitario de Rosario' },
      { name: 'Club Gimnasia y Esgrima de Pergamino' },
      { name: "Golfer's Country Club Pilar" },
      { name: 'Country Villa Golf Río Cuarto' },
      { name: 'Asociación Civil Albanueva SA' },
    ],
  },
  {
    icon: '🏢',
    name: 'Empresas, Industrias y Consultoras',
    clients: [
      { name: 'Toyota Argentina SA' },
      { name: 'FyO — Futuros y Opciones' },
      { name: 'Juntas Illinois' },
      { name: 'Luxcam S.A.' },
      { name: 'Punto Biz' },
      { name: 'Legado IT SRL' },
      { name: 'Bug Agency SRL' },
      { name: 'Exe Coworking' },
      { name: 'Ebras Arquitectura' },
      { name: 'Norlitoral SRL' },
      { name: 'Hormigonera Chivilcoy S.A.' },
      { name: 'Grupo Algro SA' },
      { name: 'Moral y Masjoan SRL' },
      { name: 'ENTEC ARGENTINA S.R.L' },
      { name: 'Aenima' },
    ],
  },
  {
    icon: '🍽️',
    name: 'Gastronomía, Comercios y Servicios',
    clients: [
      { name: 'Calzia Panadería' },
      { name: 'Tifosi Canchas de Fútbol' },
      { name: 'Kitchen Eleven S.R.L' },
    ],
  },
  {
    icon: '🏥',
    name: 'Asociaciones Civiles, Mutuales y Salud',
    clients: [
      { name: 'Bindu Centro de Día' },
      { name: 'AMEN — Asociación Mutualista Evangélica Neuquina' },
      { name: 'Asociación Civil Cuatro Hojas' },
      { name: 'Eco Río Cuarto SAS' },
    ],
  },
];

function ClientCard({ client }) {
  const initial = client.name.charAt(0).toUpperCase();

  return (
    <div className='bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 px-3 py-5 text-center hover:shadow-md hover:border-custom-green3 transition-all duration-200'>
      <div className='w-14 h-14 rounded-full bg-custom-green2 flex items-center justify-center text-custom-green5 font-bold text-2xl select-none flex-shrink-0'>
        {initial}
      </div>
      <p className='text-gray-600 text-xs font-medium leading-snug'>
        {client.name}
      </p>
    </div>
  );
}

export default function ClientesPage() {
  const totalClients = categories.reduce(
    (acc, cat) => acc + cat.clients.length,
    0,
  );

  return (
    <div className='text-black min-h-screen py-8 px-2 sm:px-6 lg:px-12 mt-32 lg:mt-48'>
      <div className='max-w-5xl mx-auto space-y-12'>
        {/* Encabezado */}
        <div className='space-y-3'>
          <h1 className='text-5xl sm:text-4xl font-bold tracking-tight text-gray-700'>
            Nuestros Clientes
          </h1>
          <p className='text-gray-500 text-lg'>
            Más de {totalClients} organizaciones de todo el país ya eligieron
            GudPipol.
          </p>
        </div>

        {/* Categorías */}
        <div className='space-y-10'>
          {categories.map((category) => (
            <div key={category.name} className='space-y-4'>
              <h2 className='text-xl font-semibold border-l-4 border-custom-green3 pl-4 text-gray-700 flex items-center gap-2'>
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </h2>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {category.clients.map((client) => (
                  <ClientCard key={client.name} client={client} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className='bg-white rounded-2xl shadow-md border-l-4 border-custom-green3 px-6 py-6 space-y-2'>
          <p className='text-gray-700 font-semibold text-lg'>
            ¿Querés sumarte?
          </p>
          <p className='text-gray-500 text-sm'>
            Municipios, empresas, clubes y organizaciones de todo el país ya
            confían en nuestros muebles.{' '}
            <a
              href='/contact'
              className='text-custom-green3 hover:underline font-medium'
            >
              Contactanos
            </a>{' '}
            y encontramos la solución ideal para vos.
          </p>
        </div>
      </div>
    </div>
  );
}
