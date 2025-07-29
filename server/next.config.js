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
        source: '/product-category/huerteros/sin-piso/:path*',
        destination: '/products/Huerteros',
        permanent: true,
      },
      {
        source: '/producto/sillon-doble-carcarana/:path*',
        destination: '/detail/GPB004',
        permanent: true,
      },
      {
        source: '/producto/sillon-carcarana/:path*',
        destination: '/detail/GPB002',
        permanent: true,
      },
      {
        source: '/product-category/sillas/:path*',
        destination: '/products/Sillas',
        permanent: true,
      },
      {
        source: '/product-category/reposeras/:path*',
        destination: '/products/Reposeras',
        permanent: true,
      },
      {
        source: '/producto/reposera-caribe/:path*',
        destination: '/detail/GPR001',
        permanent: true,
      },
      {
        source: '/quienes-somos/:path*',
        destination: '/aboutUs',
        permanent: true,
      },
      {
        source: '/proyectos-a-medida/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/productos/page/4/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/productos/page/3/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/productos/page/2/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/productos/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/product-category/mesas/:path*',
        destination: '/products/Mesas',
        permanent: true,
      },
      {
        source: '/producto/mesa-sena/:path*',
        destination: '/detail/GPN002',
        permanent: true,
      },
      {
        source: '/producto/mesa-mackenzie-grande/:path*',
        destination: '/detail/GPN007',
        permanent: true,
      },
      {
        source: '/producto/mesa-mackenzie-chica/:path*',
        destination: '/detail/GPN004',
        permanent: true,
      },
      {
        source: '/producto/mesa-lena/:path*',
        destination: '/detail/GPN002',
        permanent: true,
      },
      {
        source: '/producto/mesa-lena-grande/:path*',
        destination: '/detail/GPN005',
        permanent: true,
      },
      {
        source: '/producto/macetero-tamesis/:path*',
        destination: '/detail/GPM009',
        permanent: true,
      },
      {
        source: '/product-category/maceteros/:path*',
        destination: '/products/Maceteros',
        permanent: true,
      },
      {
        source: '/producto/macetero-mississippi/:path*',
        destination: '/detail/GPM008',
        permanent: true,
      },
      {
        source: '/producto/macetero-kenai/:path*',
        destination: '/detail/GPM004',
        permanent: true,
      },
      {
        source: '/producto/macetero-iguazu/:path*',
        destination: '/detail/GPM011',
        permanent: true,
      },
      {
        source: '/producto/macetero-bermejo/:path*',
        destination: '/detail/GPM003',
        permanent: true,
      },
      {
        source: '/producto/macetero-alumine/:path*',
        destination: '/detail/GPM005',
        permanent: true,
      },
      {
        source: '/product-category/listones/:path*',
        destination: '/products/Materiales',
        permanent: true,
      },
      {
        source: '/producto/huertero-traful/:path*',
        destination: '/detail/GPH002',
        permanent: true,
      },
      {
        source: '/product-category/huerteros/:path*',
        destination: '/products/Huerteros',
        permanent: true,
      },
      {
        source: '/producto/huertero-pilcomayo/:path*',
        destination: '/detail/GPH001',
        permanent: true,
      },
      {
        source: '/producto/huertero-parana/:path*',
        destination: '/detail/GPH004',
        permanent: true,
      },
      {
        source: '/producto/huertero-nilo/:path*',
        destination: '/detail/GPH007',
        permanent: true,
      },
      {
        source: '/producto/huertero-limay/:path*',
        destination: '/detail/GPH009',
        permanent: true,
      },
      {
        source: '/producto/huertero-futaleufu/:path*',
        destination: '/detail/GPH008',
        permanent: true,
      },
      {
        source: '/producto/huertero-danubio/:path*',
        destination: '/detail/GPH005',
        permanent: true,
      },
      {
        source: '/producto/huertero-amazonas/:path*',
        destination: '/detail/GPH006',
        permanent: true,
      },
      {
        source: '/producto/eco-tabla/:path*',
        destination: '/detail/GPT001',
        permanent: true,
      },
      {
        source: '/product-category/destacados/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/product-category/deck/:path*',
        destination: '/products/Deck',
        permanent: true,
      },
      {
        source: '/producto/decks/:path*',
        destination: '/detail/GPD001',
        permanent: true,
      },
      {
        source: '/contacto/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/product-category/huerteros/con-piso/:path*',
        destination: '/products/Huerteros',
        permanent: true,
      },
      {
        source: '/product-category/composteras/:path*',
        destination: '/products/Composteras',
        permanent: true,
      },
      {
        source: '/producto/compostera-pacifico/:path*',
        destination: '/detail/GPP001',
        permanent: true,
      },
      {
        source: '/product-category/cestos/:path*',
        destination: '/products/Cestos',
        permanent: true,
      },
      {
        source: '/producto/cesto-atlantico-2/:path*',
        destination: '/detail/GPC003',
        permanent: true,
      },
      {
        source: '/producto/cesto-atlantico/:path*',
        destination: '/detail/GPC003',
        permanent: true,
      },
      {
        source: '/carrito/:path*',
        destination: '/cart',
        permanent: true,
      },
      {
        source: '/product-category/bancos/:path*',
        destination: '/products/Bancos',
        permanent: true,
      },
      {
        source: '/producto/banco-mediterraneo/:path*',
        destination: '/detail/GPB003',
        permanent: true,
      },
      {
        source: '/producto/banco-malargue/:path*',
        destination: '/detail/GPB001',
        permanent: true,
      },
      {
        source: '/productos/page/1/:path*',
        destination: '/products',
        permanent: true,
      },
    ];
  },
};