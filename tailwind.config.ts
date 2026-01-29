import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F5F7F5',
          100: '#E8EDE8',
          200: '#D1DBD1',
          300: '#B0C4B0',
          400: '#8FAA8B',
          500: '#7A9B76',
          600: '#638161',
          700: '#4D654D',
          800: '#3A4F3A',
          900: '#1F2420',
        },
        terracotta: {
          50: '#FDF5F3',
          100: '#FBE8E3',
          200: '#F7D1C7',
          300: '#EFB09F',
          400: '#D4906F',
          500: '#C07855',
          600: '#A8604A',
          700: '#8A4E3D',
          800: '#724136',
          900: '#5D3730',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F5F1E8',
          200: '#EBE3D1',
          300: '#DFD3B8',
          400: '#CFC29D',
        },
        'dark-card': '#2A2F2B',
        'dark-muted': '#9CA39D',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        organic: '0 4px 20px rgba(122, 155, 118, 0.15)',
        'organic-hover': '0 8px 32px rgba(122, 155, 118, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
