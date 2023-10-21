/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,html,js}', '/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-background': "url('/background.jpg')",
      },
      colors: {
        brown:{
          600: '#3D2A0F'
        },
        'on-neutral': '#000', // change the color of text on primary color

      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans'],
        'serif': ['Libre Baskerville', 'serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: '#3D2A0F',
          'on-neutral': '#000',
          "primary-focus": '#3D2A0F',
          neutral: '#fff',
          "primary-focus": '#3D2A0F',
        },
      },
    ],
  },
}

