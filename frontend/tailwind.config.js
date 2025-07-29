/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-green': '#005d00',
        'custom-green1': '#CAD8C7',
        'custom-green2': '#C1D9C1',
        'custom-green3': '#A0BF9F',
        'custom-green4': '#667467',
        'custom-green5': '#353F34',
        'custom-lightGreen': '#B3D435',
        'custom-brown': '#3E342A',
        'custom-black': '#2D2E32',
        'custom-black-2': '#26272B',
        'custom-gray': '#f2f4f4'
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        montserrat: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        Anaheim: ['Anaheim', 'Montserrat', 'roboto', 'sans-serif'],
      },
      screens: {
        sm: '640px', // Puedes ajustar este valor a lo que necesites
        md: '768px', // Ajusta este valor según lo que necesitas
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true }),],
};
