module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/product-category/huerteros/sin-piso/',
        destination: '/products/Huerteros',
        permanent: true,
      },
      {
        source: '/producto/sillon-doble-carcarana/',
        destination: '/detail/GPB004',
        permanent: true,
      },
      {
        source: '/producto/sillon-carcarana/',
        destination: '/detail/GPB002',
        permanent: true,
      },
      {
        source: '/product-category/sillas/',
        destination: '/products/Sillas',
        permanent: true,
      },
      {
        source: '/product-category/reposeras/',
        destination: '/products/Reposeras',
        permanent: true,
      },
      {
        source: '/producto/reposera-caribe/',
        destination: '/detail/GPR001',
        permanent: true,
      },
      {
        source: '/quienes-somos/',
        destination: '/aboutUs',
        permanent: true,
      },
      {
        source: '/proyectos-a-medida/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/productos/page/4/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/productos/page/3/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/productos/page/2/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/productos/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/product-category/mesas/',
        destination: '/products/Mesas',
        permanent: true,
      },
      {
        source: '/producto/mesa-sena/',
        destination: '/detail/GPN002',
        permanent: true,
      },
      {
        source: '/producto/mesa-mackenzie-grande/',
        destination: '/detail/GPN007',
        permanent: true,
      },
      {
        source: '/producto/mesa-mackenzie-chica/',
        destination: '/detail/GPN004',
        permanent: true,
      },
      {
        source: '/producto/mesa-lena/',
        destination: '/detail/GPN002',
        permanent: true,
      },
      {
        source: '/producto/mesa-lena-grande/',
        destination: '/detail/GPN005',
        permanent: true,
      },
      {
        source: '/producto/macetero-tamesis/',
        destination: '/producto/detail/GPM009',
        permanent: true,
      },
      {
        source: '/product-category/maceteros/',
        destination: '/products/Maceteros',
        permanent: true,
      },
      {
        source: '/producto/macetero-mississippi/',
        destination: '/detail/GPM008',
        permanent: true,
      },
      {
        source: '/producto/macetero-kenai/',
        destination: '/detail/GPM004',
        permanent: true,
      },
      {
        source: '/producto/macetero-iguazu/',
        destination: '/detail/GPM011',
        permanent: true,
      },
      {
        source: '/producto/macetero-bermejo/',
        destination: '/detail/GPM003',
        permanent: true,
      },
      {
        source: '/producto/macetero-alumine/',
        destination: '/detail/GPM005',
        permanent: true,
      },
      {
        source: '/product-category/listones/',
        destination: '/products/Materiales',
        permanent: true,
      },
      {
        source: '/producto/huertero-traful/',
        destination: '/detail/GPH002',
        permanent: true,
      },
      {
        source: '/product-category/huerteros/',
        destination: '/products/Huerteros',
        permanent: true,
      },
      {
        source: '/producto/huertero-pilcomayo/',
        destination: '/detail/GPH001',
        permanent: true,
      },
      {
        source: '/producto/huertero-parana/',
        destination: '/detail/GPH004',
        permanent: true,
      },
      {
        source: '/producto/huertero-nilo/',
        destination: '/detail/GPH007',
        permanent: true,
      },
      {
        source: '/producto/huertero-limay/',
        destination: '/detail/GPH009',
        permanent: true,
      },
      {
        source: '/producto/huertero-futaleufu/',
        destination: '/detail/GPH008',
        permanent: true,
      },
      {
        source: '/producto/huertero-danubio/',
        destination: '/detail/GPH005',
        permanent: true,
      },
      {
        source: '/producto/huertero-amazonas/',
        destination: '/detail/GPH006',
        permanent: true,
      },
      {
        source: '/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/producto/eco-tabla/',
        destination: '/detail/GPT001',
        permanent: true,
      },
      {
        source: '/product-category/destacados/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/product-category/deck/',
        destination: '/products/Deck',
        permanent: true,
      },
      {
        source: '/producto/decks/',
        destination: '/detail/GPD001',
        permanent: true,
      },
      {
        source: '/contacto/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/product-category/huerteros/con-piso/',
        destination: '/products/Huerteros',
        permanent: true,
      },
      {
        source: '/product-category/composteras/',
        destination: '/products/Composteras',
        permanent: true,
      },
      {
        source: '/producto/compostera-pacifico/',
        destination: '/detail/GPP001',
        permanent: true,
      },
      {
        source: '/product-category/cestos/',
        destination: '/products/Cestos',
        permanent: true,
      },
      {
        source: '/producto/cesto-atlantico-2/',
        destination: '/detail/GPC003',
        permanent: true,
      },
      {
        source: '/producto/cesto-atlantico/',
        destination: '/detail/GPC003',
        permanent: true,
      },
      {
        source: '/carrito/',
        destination: '/cart',
        permanent: true,
      },
      {
        source: '/product-category/bancos/',
        destination: '/products/Bancos',
        permanent: true,
      },
      {
        source: '/producto/banco-mediterraneo/',
        destination: '/detail/GPB003',
        permanent: true,
      },
      {
        source: '/producto/banco-malargue/',
        destination: '/detail/GPB001',
        permanent: true,
      },
      {
        source: '/www.gudpipol.com.ar/:path*',
        destination: 'https://gudpipol.com.ar/:path*',
        permanent: true,
        basePath: false,
      },
      {
        source: '/productos/page/1/',
        destination: '/products',
        permanent: true,
      },
    ];
  },
};