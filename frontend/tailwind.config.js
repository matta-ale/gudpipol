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
        'custom-lightGreen': '#B3D435',
        'custom-black': '#2D2E32',
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
  plugins: [],
};
