'use client';
import axios from 'axios';
import SubNavbar from './components/SubNavbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';
import { Providers } from './redux/provider';
import ScrollingHeader from './components/ScrollingHeader';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RootLayout({ children }) {
  
  return (
    <html lang='en'>
      <head>
        <title>Gudpipol ecomuebles</title>
      </head>
      <body className='bg-white-100 font-roboto'>
        <ScrollingHeader/>
        <Navbar />
        <SubNavbar />
        <main className='container mx-auto px-4 py-8'>
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
