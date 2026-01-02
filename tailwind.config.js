/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        diveIn: 'diveIn 1s ease-out forwards',
        slideInFromLeft: 'slideInFromLeft 1s ease-out forwards',
      },
      keyframes: {
        diveIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Cinzel', 'serif'],
      },
      fontFamily: {
        luxury: ['Gloock', 'serif'],
      },
      fontFamily: {
        luxury: ['Lora', 'serif'],
      },
      screens: {
        '3xl': '1600px',
      },
      maxWidth: {
        '3xl': '1600px',
      }
    },
  },
  plugins: [],
}