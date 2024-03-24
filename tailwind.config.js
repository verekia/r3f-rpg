/** @type {import('tailwindcss').Config} */

import { theme } from '@manapotion/tailwind'

const config = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    screens: theme.screens,
    extend: {
      screens: theme.extend.screens,
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
}

export default config
