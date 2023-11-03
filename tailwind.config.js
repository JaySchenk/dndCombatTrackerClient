// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./components/**/*.jsx",
    "./pages/**/*.jsx",
    "./index.html",
    "./**/*.jsx",
  ],
  theme: {
    extend: {
      screens: {
        "max-sm": { max: "639px" },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
