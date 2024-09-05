/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': {
          100: '#FFFCF8',
          200: '#FFFCF6',
          300: '#FFFBF4',
          400: '#FFFAF2',
          500: '#FFFAF0',
          600: '#EAE6DC',
          700: '#D6D2C9',
          800: '#C1BEB6',
          900: '#ADAAA3',
        },
        'dark': {
          100: '#AFAFB1',
          200: '#949497',
          300: '#7A7A7D',
          400: '#5F5F63',
          500: '#454549',
          600: '#3B3B3E',
          700: '#313134',
          800: '#272729',
          900: '#1D1D1F',
        },
        "aquamarine": "rgb(83, 226, 169)",
        "aquablue": "rgb(83, 207, 226)",
        "darkaquamarine": "rgb(77, 206, 137)",
        "black2222": "#222222",
        "grayaaaa": "#aaaaaa"
      },
      width: {
        '0.25': '25%',
        '0.45': '45%',
        '0.5': '50%',
        '0.75': '75%',
        '0.9': '90%',
        '1.25': '125%',
        '1.5': '150%',
      },
      height: {
        '0.25': '25%',
        '0.45': '45%',
        '0.5': '50%',
        '0.75': '75%',
        '0.9': '90%',
        '1.25': '125%',
        '1.5': '150%',
      },
      borderWidth: {
        '0': '0px',
        '1': '1px',
        '1.5': '1.5px',
        '1.75': '1.75px',
        '2': '2px',
        '2.5': '2.5px',
        '3': '3px',
        '3.5': '3.5px',
        '4': '4px',
        '4.5': '4.5px',
        '5': '5px',
        '5.5': '5.5px',
        '6': '6px',
        '6.5': '6.5px',
        '7': '7px',
        '7.5': '7.5px',
        '8': '8px',
        '8.5': '8.5px',
        '9': '9px',
        '9.5': '9.5px',
      }, padding: {
        '0': '0px'
      }, margin: {
        '0': '0px'
      }, boxShadow: {
        'base': '0px 3px 3px 0px rgba(0, 0, 0, 0.25), 0 2px 3px -2px rgba(0, 0, 0, 0.25)',
      },
      translate: {
        '0': '0',
        '50': '50%'
      }, 
      padding: {
        '2.5': '10px',
      },
      zIndex: {
        '5': '5',
      }
    },
  },
  plugins: [],
}

