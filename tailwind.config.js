/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores cozy y cálidos
        warm: {
          50: '#fefdf8',
          100: '#fdf8e8',
          200: '#faf0c8',
          300: '#f5e4a3',
          400: '#efd478',
          500: '#e8c547',
          600: '#d4af37',
          700: '#b8962e',
          800: '#967829',
          900: '#7a6225',
        },
        sage: {
          50: '#f6f8f6',
          100: '#e8f0e8',
          200: '#d1e1d1',
          300: '#a8c8a8',
          400: '#7ba87b',
          500: '#5a8a5a',
          600: '#456e45',
          700: '#3a5a3a',
          800: '#2f4a2f',
          900: '#283d28',
        },
        cream: {
          50: '#fefefe',
          100: '#fefcf8',
          200: '#fdf8f0',
          300: '#fbf2e3',
          400: '#f8e8d0',
          500: '#f4dbb8',
          600: '#ecc794',
          700: '#e0a968',
          800: '#d18b3c',
          900: '#b8722a',
        },
        coral: {
          50: '#fef7f5',
          100: '#fdeee8',
          200: '#fad9d0',
          300: '#f6bfb0',
          400: '#f09b85',
          500: '#e8755e',
          600: '#d4553c',
          700: '#b23f2a',
          800: '#933625',
          900: '#7a3024',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cozy: ['Georgia', 'serif'],
      },
      animation: {
        'gentle-bounce': 'gentleBounce 3s ease-in-out infinite',
        'soft-pulse': 'softPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        softPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      borderRadius: {
        'cozy': '20px',
        'extra-cozy': '30px',
      }
    },
  },
  plugins: [],
}