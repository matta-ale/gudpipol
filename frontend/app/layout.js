import './globals.css';
import ClientLayout from './components/ClientLayout';
import MetaPixel from './components/MetaPixel';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://www.gudpipol.com.ar'),
  title: {
    default: 'Muebles de plástico reciclado | GudPipol',
    template: '%s | GudPipol',
  },
  description:
    'GudPipol fabrica muebles sustentables de plástico reciclado. Resistentes, aptos todo clima y sin mantenimiento. Envíos a todo el país.',
  keywords: [
    'muebles plástico reciclado',
    'muebles sustentables',
    'economía circular',
    'muebles exterior',
    'Rosario',
    'Argentina',
  ],
  openGraph: {
    title: 'Muebles de plástico reciclado | GudPipol',
    description:
      'GudPipol fabrica muebles sustentables de plástico reciclado. Resistentes, aptos todo clima y sin mantenimiento.',
    url: 'https://www.gudpipol.com.ar',
    siteName: 'GudPipol',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/img/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'GudPipol - Muebles de plástico reciclado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muebles de plástico reciclado | GudPipol',
    description: 'GudPipol fabrica muebles sustentables de plástico reciclado.',
    images: ['/img/logo.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.gudpipol.com.ar' },
};

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <head>
        <link rel='icon' href='/img/logoIcon.jpg' />
      </head>
      <body className='font-montserrat relative min-h-screen flex flex-col'>
        {/* GTM noscript fallback — must be first element after <body> */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-NV2X5RXH'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <MetaPixel />
        <ClientLayout>{children}</ClientLayout>

        {/* Google Tag Manager */}
        <Script id='gtm' strategy='afterInteractive'>{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NV2X5RXH');
        `}</Script>

        {/* Google Ads conversion helper — usado en botones WhatsApp */}
        <Script id='gtag-conversion' strategy='afterInteractive'>{`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof url !== 'undefined') { window.location = url; }
            };
            if (typeof gtag === 'function') {
              gtag('event', 'conversion', {
                'send_to': 'AW-18174891936/vgCxCMPC_K8cEKCvu9pD',
                'event_callback': callback
              });
            } else {
              callback();
            }
            return false;
          }
        `}</Script>
      </body>
    </html>
  );
}
