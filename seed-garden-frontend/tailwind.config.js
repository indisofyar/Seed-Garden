/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,html,js}', './public/index.html'],
    theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

}

