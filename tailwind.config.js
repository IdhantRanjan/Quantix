/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Cyberpunk Color Palette
        primary: {
          50: '#E6F3FF',
          100: '#CCE7FF',
          200: '#99CFFF',
          300: '#66B7FF',
          400: '#339FFF',
          500: '#0080FF', // Electric Blue
          600: '#0066CC',
          700: '#004C99',
          800: '#003366',
          900: '#001933',
        },
        secondary: {
          50: '#F3F0FF',
          100: '#E7E1FF',
          200: '#CFC3FF',
          300: '#B7A5FF',
          400: '#9F87FF',
          500: '#8B5CF6', // Neon Purple
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        success: {
          50: '#E6FFF2',
          100: '#CCFFE5',
          200: '#99FFCB',
          300: '#66FFB1',
          400: '#33FF97',
          500: '#00FF88', // Cyber Green
          600: '#00CC6A',
          700: '#00994C',
          800: '#00662E',
          900: '#003310',
        },
        warning: {
          50: '#FFF2E6',
          100: '#FFE5CC',
          200: '#FFCB99',
          300: '#FFB166',
          400: '#FF9733',
          500: '#FF6B35', // Warning Orange
          600: '#FF5500',
          700: '#CC4400',
          800: '#993300',
          900: '#662200',
        },
        danger: {
          50: '#FFE6E6',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF3333',
          500: '#FF0000',
          600: '#CC0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        dark: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#0A0F1C', // Deep Space
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.2)',
          blue: 'rgba(0, 128, 255, 0.1)',
          purple: 'rgba(139, 92, 246, 0.1)',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
        'floating': 'floating 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'particle-float': 'particleFloat 6s infinite linear',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'zoom-in': 'zoomIn 0.3s ease-out',
        'rotate-slow': 'rotate 20s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 128, 255, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 128, 255, 0.6)',
          }
        },
        particleFloat: {
          '0%': {
            transform: 'translateY(100vh) translateX(0)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100px) translateX(100px)',
            opacity: '0',
          }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(0, 128, 255, 0.5)',
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(0, 128, 255, 0.8)',
          }
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        gradientShift: {
          '0%, 100%': { 
            backgroundPosition: '0% 50%',
          },
          '50%': { 
            backgroundPosition: '100% 50%',
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #0080FF 0%, #8B5CF6 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0A0F1C 0%, #1A1F2E 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 128, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.5)',
        'neon-orange': '0 0 20px rgba(255, 107, 53, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'cyber': '0 0 50px rgba(0, 128, 255, 0.3)',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'futura': ['Futura', 'Arial', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
} 