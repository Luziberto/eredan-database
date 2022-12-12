/** @type {import('tailwindcss').Config} */
module.exports = {
  media: false,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
      'red-50': '#fef2f2',
      'red-100': '#fee2e2',
      'red-200': '#fecaca',
      'red-300': '#fca5a5',
      'red-400': '#f87171',
      'red-500': '#ef4444',
      'red-600': '#dc2626',
      'red-700': '#890b1e',
      'red-800': '#991b1b',
      'red-900': '#5d070d',
      }
    },
  },
  plugins: [],
}
