export default async function sitemap() {
  const baseUrl = 'https://www.gudpipol.com.ar';
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Static routes
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/aboutUs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/prensa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/clientes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Dynamic product routes
  let productRoutes = [];
  try {
    const res = await fetch(`${backendUrl}/products`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const products = Array.isArray(data) ? data : data.products ?? [];
      productRoutes = products.map((product) => ({
        url: `${baseUrl}/detail/${product.id}`,
        lastModified: new Date(product.updatedAt ?? product.createdAt ?? new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch {
    // If the API is down, just return static routes
  }

  return [...staticRoutes, ...productRoutes];
}
