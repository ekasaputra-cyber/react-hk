/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Tambahkan ini
      boxShadow: {
        'up-lg': '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
        'up-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
        'up-sm': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
        'custom-up': '0px -5px 10px rgba(0, 0, 0, 0.1)', // Contoh bayangan ke atas yang lebih sederhana
      }
    },
  },
  plugins: [],
}