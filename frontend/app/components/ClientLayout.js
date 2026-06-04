'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SubNavbar from './SubNavbar';
import ScrollingHeader from './ScrollingHeader';
import SloganHeader from './SloganHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import { Providers } from '../redux/provider';
import WhatsAppChat from './WhatsAppChat';
import CartToast from './CartToast';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ClientLayout({ children }) {
  const [sloganHeight, setSloganHeight] = useState(32);
  const [sloganVisible, setSloganVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > sloganHeight) {
        setSloganVisible(false);
      } else {
        setSloganVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sloganHeight]);

  return (
    <Providers>
      <SloganHeader onHeightChange={(height) => setSloganHeight(height)} />
      <Navbar sloganHeight={sloganHeight} sloganVisible={sloganVisible} />
      <SubNavbar sloganVisible={sloganVisible} />
      <ScrollingHeader sloganVisible={sloganVisible} sloganHeight={sloganHeight} />
      <main className='container mx-auto px-4 py-8 relative z-10'>
        {children}
      </main>
      <WhatsAppChat />
      <CartToast />
      <Footer />
    </Providers>
  );
}
