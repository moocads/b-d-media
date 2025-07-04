/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,css}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: [
        'Monaco',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
    },
    container: {
      center: true,
      screens: {
        sm: '50rem'
      }
    },
    extend: {
      colors: {
        slate: {
          850: 'hsl(222deg 47% 16%)'
        },
        primary: '#5fc3e7'
      },
      keyframes: {
        'fade-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
        'fade-in-left-delayed': 'fade-in-left 0.8s ease-out 0.2s forwards'
      }
    }
  },
  plugins: []
};
