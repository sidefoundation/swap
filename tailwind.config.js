/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'data-theme',
  mode: 'jit',
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [/data-theme$/],
    },
  },
  theme: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
