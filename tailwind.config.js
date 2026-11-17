
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: '#202020',
        background: '#E4E1DC',
        surface: '#F8F7F4',
        accent: '#34483C',
      },

      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'sans-serif'],
        bengali: ['Hind Siliguri', 'sans-serif'],
        english: ['Inter', 'sans-serif'],
      },

      maxWidth: {
        'screen-xl': '1280px',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};
