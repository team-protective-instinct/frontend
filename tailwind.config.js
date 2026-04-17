/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0F172A',
          secondary: '#1E293B',
          card: '#1E293B',
          elevated: '#293548',
        },
        threat: {
          critical: '#EF4444',
          warning: '#F59E0B',
          safe: '#10B981',
          info: '#3B82F6',
          dismissed: '#64748B',
        },
        accent: '#8B5CF6',
        border: '#334155',
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#475569',
        },
      },
    },
  },
  plugins: [],
};
