/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          800: '#1E40AF',
        },
        pink: {
          100: '#FCE7F3',
          500: '#EC4899',
          800: '#9D174D',
        },
        green: {
          100: '#D1FAE5',
          500: '#10B981',
          800: '#065F46',
        },
        purple: {
          100: '#EDE9FE',
          500: '#8B5CF6',
          800: '#5B21B6',
        },
      },
    },
  },
  plugins: [],
}
