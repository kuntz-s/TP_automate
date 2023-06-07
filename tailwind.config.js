/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'primary':'#A020F0',
      },
      fontFamily: {
       'poppins': ['Poppins', 'sans-serif']
      },
      
      backgroundImage: {
        homeBg: "url('/src/assets/homeBg.png')"
       }
    },
  },
  plugins: [],
}

