import DestacadosPageClient from './DestacadosPageClient';

export const metadata = {
  title: 'Productos destacados | GudPipol',
  description:
    'Conocé los productos más elegidos de GudPipol: muebles de plástico reciclado para espacios públicos, empresas e instituciones. Sin mantenimiento, para siempre.',
  alternates: { canonical: 'https://www.gudpipol.com.ar/products/destacados' },
  openGraph: {
    title: 'Productos destacados | GudPipol',
    description:
      'Los muebles más elegidos por municipios, empresas e instituciones. Plástico 100% reciclado, resistentes y sin mantenimiento.',
    url: 'https://www.gudpipol.com.ar/products/destacados',
  },
};

export default function DestacadosPage() {
  return <DestacadosPageClient />;
}
