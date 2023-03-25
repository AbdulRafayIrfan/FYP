/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/components/navbar.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f8f9fa",
        secondary: "#E83D3C",
      },
    },
  },
  plugins: [],
};
