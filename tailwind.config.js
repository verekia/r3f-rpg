/** @type {import('tailwindcss').Config} */

import { tailwindTheme as mpTheme } from 'manapotion'

const config = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    screens: mpTheme.screens,
    extend: {
      screens: mpTheme.extend.screens,
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
}

export default config
