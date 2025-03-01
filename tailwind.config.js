/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jeopardy: {
          blue: '#060CE9',
          board: '#000080',
          card: '#0928DE',
          gold: '#D69F4C'
        }
      },
      animation: {
        'flip': 'flip 0.5s ease-in-out forwards'
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' }
        }
      }
    },
  },
  plugins: [],
}