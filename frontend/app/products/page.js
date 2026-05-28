import ProductsPageClient from './ProductsPageClient';

export const metadata = {
  title: 'Productos',
  description:
    'Explorá toda la línea de muebles de plástico reciclado de GudPipol: sillas, mesas, bancos y más. Resistentes, aptos todo clima y sin mantenimiento.',
  alternates: { canonical: 'https://www.gudpipol.com.ar/products' },
  openGraph: {
    title: 'Productos | GudPipol',
    description:
      'Explorá toda la línea de muebles de plástico reciclado de GudPipol: sillas, mesas, bancos y más.',
    url: 'https://www.gudpipol.com.ar/products',
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}

