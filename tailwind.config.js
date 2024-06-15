/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    screens: {
      'sm': '730px',
      // => @media (min-width: 576px) { ... }

      'md': '880px',
      // => @media (min-width: 960px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('flowbite/plugin')
  ],
  variants: {
      scrollbar: ['dark']
  }
};
