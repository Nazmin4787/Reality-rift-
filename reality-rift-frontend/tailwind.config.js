/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reality Rift Custom Colors
        upside: {
          dark: '#0a0a0a',
          darker: '#050505',
          red: '#8B0000',
          crimson: '#DC143C',
          blood: '#660000',
        },
        safe: {
          blue: '#1E90FF',
          light: '#87CEEB',
          glow: '#00BFFF',
        },
        chaos: {
          orange: '#FF4500',
          yellow: '#FFD700',
          red: '#FF0000',
        },
        stability: {
          green: '#00FF00',
          lime: '#32CD32',
          emerald: '#50C878',
        }
      },
      fontFamily: {
        stranger: ['Benguiat', 'serif'],
        mono: ['Courier New', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'shake': 'shake 0.5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
