/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.12)',
          dark: 'rgba(15, 23, 42, 0.45)',
          border: 'rgba(255, 255, 255, 0.18)',
          borderDark: 'rgba(255, 255, 255, 0.08)',
        },
        soneflow: {
          amber: '#f59e0b',
          gold: '#fbbf24',
          orange: '#d97706',
          rose: '#f43f5e',
          violet: '#8b5cf6',
          sky: '#38bdf8',
        }
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
        super: '24px',
      },
      animation: {
        'soneflow-slow': 'soneflow 18s ease-in-out infinite alternate',
        'soneflow-reverse': 'soneflowReverse 22s ease-in-out infinite alternate',
        'spotlight-left': 'spotlightPulseLeft 6s ease-in-out infinite alternate',
        'spotlight-right': 'spotlightPulseRight 7s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        soneflow: {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(60px, -40px) scale(1.15) rotate(15deg)' },
          '66%': { transform: 'translate(-40px, 50px) scale(0.9) rotate(-10deg)' },
          '100%': { transform: 'translate(30px, 20px) scale(1.08) rotate(8deg)' },
        },
        soneflowReverse: {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(-50px, 40px) scale(1.1) rotate(-12deg)' },
          '66%': { transform: 'translate(45px, -30px) scale(0.95) rotate(10deg)' },
          '100%': { transform: 'translate(-20px, -20px) scale(1.05) rotate(-5deg)' },
        },
        spotlightPulseLeft: {
          '0%': { opacity: '0.7', transform: 'rotate(-15deg) scale(1)' },
          '50%': { opacity: '0.95', transform: 'rotate(-12deg) scale(1.06)' },
          '100%': { opacity: '0.75', transform: 'rotate(-18deg) scale(0.98)' },
        },
        spotlightPulseRight: {
          '0%': { opacity: '0.7', transform: 'rotate(15deg) scale(1)' },
          '50%': { opacity: '0.95', transform: 'rotate(18deg) scale(1.06)' },
          '100%': { opacity: '0.75', transform: 'rotate(12deg) scale(0.98)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.16), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
        'glow-gold': '0 0 35px -5px rgba(245, 158, 11, 0.45)',
        'glow-fox': '0 0 45px 5px rgba(251, 191, 36, 0.35)',
      }
    },
  },
  plugins: [],
}
