import FaqPageClient from './FaqPageClient';

export const metadata = {
  title: 'Preguntas Frecuentes',
  description:
    'Respondemos las dudas más comunes sobre los muebles de plástico reciclado de GudPipol: materiales, resistencia, mantenimiento, envíos y más.',
  alternates: { canonical: 'https://www.gudpipol.com.ar/faq' },
  openGraph: {
    title: 'Preguntas Frecuentes | GudPipol',
    description:
      'Respondemos las dudas más comunes sobre los muebles de plástico reciclado de GudPipol.',
    url: 'https://www.gudpipol.com.ar/faq',
  },
};

export default function FaqPage() {
  return <FaqPageClient />;
}
