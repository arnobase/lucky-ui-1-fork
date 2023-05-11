/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('flowbite/plugin')
  ],
  variants: {
      scrollbar: ['dark']
  }
};
