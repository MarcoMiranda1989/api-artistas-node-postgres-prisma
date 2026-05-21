/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#122b49',
        secondary: '#374674',
        accent: '#7e6eac',
        'accent-light': '#d094e9',
        highlight: '#f8bced',
      }
    },
  },
  plugins: [],
}
