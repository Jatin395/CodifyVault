/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        bg_nav : "rgb(0, 21, 41)",
        bg_black : "rgb(9, 9, 9)",
        bg_form : "rgb(39, 40, 34)"
      }
    },    
  },
  plugins: [],
}