/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {

        shake: 'shake 0.5s ease-in-out',
       
        slide: 'slide 0.5s ease-in-out forwards',

        scroll: 'shuffle 1.5s infinite steps(10)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)', },
          '25%': { transform: 'translateX(-5px)', },
          '50%': { transform: 'translateX(5px)', },
          '75%': { transform: 'translateX(-5px)' },
        },
        slide: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0%)', 
          },
          '100%': {
            opacity:'0',
            transform: 'translateY(-100%)',
          },
        },
        shuffle: {
          "0%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(-384px)",
          }
        }
      },
    },
  plugins: [],
  }
}

