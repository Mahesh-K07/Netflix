/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        netflixRed: '#e50914',
        netflixDark: '#141414',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,1) 100%)',
      },
    },
  },
  plugins: [],
};

