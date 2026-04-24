/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050507', // Abyss Black
          secondary: '#101010', // Carbon Surface
          card: '#101010',
          elevated: '#19211c', // Surface Container
        },
        threat: {
          critical: '#fb565b', // Danger Coral
          warning: '#ffba00', // Warning Amber
          safe: '#00d992', // Signal Green
          info: '#3b82f6', // Tailwind Blue (for now)
          dismissed: '#8b949e', // Steel Slate
        },
        accent: '#00d992', // Signal Green
        border: '#3d3a39', // Warm Charcoal
        text: {
          primary: '#f2f2f2', // Snow White
          secondary: '#b8b3b0', // Warm Parchment
          muted: '#8b949e', // Steel Slate
        },
      },
    },
  },
  plugins: [],
};
