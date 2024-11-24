/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFE7A3',
        secondary: '#282231',
      },
      fontFamily: {
        times: ['Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
