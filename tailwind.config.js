/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{tsx,ts}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Rubik', 'Roboto', 'sans-serif']
    },
    screens: {
      'xs': { min: '320px', max: '575px' },
      'sm': { min: '576px', max: '731px' },
      'md': { min: '732px', max: '1199px' },
      'lg': '1200px',
    },
    container: {
      center: true,
      screens: {
        mobile: "400px",
        tablet: "732px",
        desktop: "732px",
      },
    },
    extend: {
      colors: {
        'moderate-blue': 'hsl(238, 40%, 52%)',
        'soft-red': 'hsl(358, 79%, 66%)',
        'light-grayish-blue': 'hsl(239, 57%, 85%)',
        'pale-red': 'hsl(357, 100%, 86%)',
        'dark-blue': 'hsl(212, 24%, 26%)',
        'grayish-blue': 'hsl(211, 10%, 45%)',
        'light-gray': 'hsl(223, 19%, 93%)',
        'very-light-gray': 'hsl(228, 33%, 97%)',
      },
      fontFamily: {
        'sans': ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}

