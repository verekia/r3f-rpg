/** @type {import('tailwindcss').Config} */

import { tailwindTheme as manapotionTheme } from '@manapotion/react'

const config = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    screens: manapotionTheme.screens,
    extend: {
      screens: manapotionTheme.extend.screens,
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
}

export default config
