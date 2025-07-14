'use client';
import axios from 'axios';
import SubNavbar from './components/SubNavbar';
import ScrollingHeader from './components/ScrollingHeader';
import SloganHeader from './components/SloganHeader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';
import { Providers } from './redux/provider';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';
import { useState, useEffect } from 'react';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RootLayout({ children }) {
  const [sloganHeight, setSloganHeight] = useState(32);
  const [sloganVisible, setSloganVisible] = useState(true);

  // Detect when the SloganHeader should hide
  useEffect(() => {
    const handleScroll = () => {
      // Hide slogan when the scroll position is greater than the height of the slogan
      if (window.scrollY > sloganHeight) {
        setSloganVisible(false);
      } else {
        setSloganVisible(true);
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sloganHeight]);

  return (
    <html lang='en'>
      <head>
        <title>Gudpipol ecomuebles</title>
        <link
          rel='icon'
          href='/img/logoIcon.jpg'
          type='image/<generated>'
          sizes='<generated>'
        />
      </head>
      <body className='font-montserrat relative min-h-screen flex flex-col'>
        <div
        // className='absolute inset-0 bg-cover bg-center bg-fixed opacity-80 z-0'
        // style={{ backgroundImage: "url('/img/background.jpg')" }}
        ></div>
        <Providers>
          <SloganHeader onHeightChange={(height) => setSloganHeight(height)} />
          <Navbar sloganHeight={sloganHeight} sloganVisible={sloganVisible} />
          <SubNavbar sloganVisible={sloganVisible} />
          <ScrollingHeader sloganVisible={sloganVisible} />
          <main className='container mx-auto px-4 py-8 relative z-10'>
            {children}
          </main>
          <div className='fixed bottom-4 right-4 z-50 text-custom-black'>
            <WhatsAppWidget
              phoneNumber='5493415924709'
              message='Hola, enviá un mensaje así te redirigimos a un chat de Whatsapp con nosotros'
              companyName='Gudpipol'
              companyInitial='GP'
              replyTimeText='Responderemos a la brevedad'
              sendButtonText='Enviar'
              inputPlaceHolder='Escribe un mensaje...'
            />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
