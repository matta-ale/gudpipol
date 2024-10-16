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
// import { ReactComponent as CompanyIcon } from '../public/img/logo.svg'; 

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RootLayout({ children }) {
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
      <body className='bg-white-100 font-montserrat'>
        <SloganHeader />
        <Providers>
          <Navbar />
          <SubNavbar />
          <ScrollingHeader />
          <main className='container mx-auto px-4 py-8'>{children}</main>
          <WhatsAppWidget
            phoneNumber='5493415924709'
            message='Hola, enviá un mensaje así te redirigimos a un chat de Whatsapp con nosotros'
            companyName='Gudpipol'
            companyInitial='GP'
            // CompanyIcon='../public/img/logo.svg' 
            replyTimeText = 'Responderemos a la brevedad'
            sendButtonText = 'Enviar'
            inputPlaceHolder = 'Escribe un mensaje...'
          />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
