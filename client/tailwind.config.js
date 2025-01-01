/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#b86711',
      },
      animation: {
        'slide-in': 'slideIn 0.25s ease-out',
        'slide-out': 'slideOut 0.25s ease-out'
      },
      keyframes: {
        slideIn: {
          '0%' : { transform: 'translateX(-100%)' },
          '100%' : { transform: 'translateX(0%)' }
        },
        slideOut: {
          '0%' : { transform: 'translateX(0%)' },
          '100%' : { transform: 'translateX(-100%)' }
        }
      }
    },
  },
  plugins: [],
}

