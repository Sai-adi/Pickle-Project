/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107',
          600: '#e6a800',
          700: '#c47f00',
          800: '#a05900',
          900: '#7a3b00',
        },
        spice: {
          50: '#fdf2f0',
          100: '#fce4df',
          200: '#f8c4bc',
          300: '#f39484',
          400: '#ec5f49',
          500: '#dc3027',
          600: '#c0211a',
          700: '#9e1a14',
          800: '#7e1410',
          900: '#5e100c',
        },
        olive: {
          50: '#f2f5e6',
          100: '#e3eacc',
          200: '#c6d69b',
          300: '#a8c068',
          400: '#8baa35',
          500: '#6e9410',
          600: '#577600',
          700: '#425900',
          800: '#2e3c00',
          900: '#1c2500',
        },
        dark: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#232333',
          500: '#2e2e42',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255,193,7,0.3)' },
          '100%': { boxShadow: '0 0 60px rgba(255,193,7,0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #0a0a0f 0%, #1a0a00 50%, #0a0a0f 100%)',
      }
    },
  },
  plugins: [],
}
