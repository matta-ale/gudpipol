import DetailPageClient from './DetailPageClient';

export async function generateMetadata({ params }) {
  const { id } = params;
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('not_found');
    const data = await res.json();
    const product = data.product ?? data;
    const priceText = product.price
      ? ` Desde $${Number(product.price).toLocaleString('es-AR')}.`
      : '';
    return {
      title: product.name,
      description: `${product.name} — Mueble de plástico reciclado de GudPipol. Resistente, apto todo clima y sin mantenimiento.${priceText}`,
      alternates: { canonical: `https://www.gudpipol.com.ar/detail/${id}` },
      openGraph: {
        title: `${product.name} | GudPipol`,
        url: `https://www.gudpipol.com.ar/detail/${id}`,
        images: product.images?.[0]?.url
          ? [{ url: product.images[0].url }]
          : [{ url: '/img/logo.jpg' }],
      },
    };
  } catch {
    return { title: 'Detalle de Producto' };
  }
}

export default function DetailPage({ params }) {
  return <DetailPageClient params={params} />;
}
