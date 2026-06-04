/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'system-ui', 'sans-serif'],
        'kapoto-bold': ['Fredoka', 'system-ui', 'sans-serif'],
        'script': ['Great Vibes', 'cursive'],
      },
      colors: {
        kapoto: {
          gold: '#FDB927',
          'gold-light': '#FFD857',
          'gold-dark': '#F4B03D',
          'accent': '#ffffff',
          'accent-dark': '#f0e5d8',
          'dark': '#8B6F47',
        }
      },
      backgroundImage: {
        'kapoto-diamond': `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px),
                           repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px)`,
        'african-pattern': `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139,111,71,.1) 10px, rgba(139,111,71,.1) 20px),
                            repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(139,111,71,.1) 10px, rgba(139,111,71,.1) 20px)`,
        'tribal-pattern': `repeating-conic-gradient(from 45deg at 20% 50%, #FDB927 0deg 90deg, transparent 90deg 180deg)`,
        'kente-pattern': `repeating-linear-gradient(90deg, rgba(255,255,255,.2) 0px, rgba(255,255,255,.2) 2px, transparent 2px, transparent 6px),
                          repeating-linear-gradient(0deg, rgba(139,111,71,.15) 0px, rgba(139,111,71,.15) 2px, transparent 2px, transparent 6px)`,
      }
    },
  },
  plugins: [],
}
