/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainColor" : "#2F88FF",
        "mainLight" : "#78B2FF",
        "mainDark" : "#10458C",
        "modal" : "#FFFFFFAA"
      }
    },
  },
  plugins: [],
}