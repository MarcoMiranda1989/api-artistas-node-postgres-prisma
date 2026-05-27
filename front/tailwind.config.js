/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        accent: '#4f46e5',
        'accent-light': '#818cf8',
        highlight: '#1e1b4b',
      }
    },
  },
  plugins: [],
}
