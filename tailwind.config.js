/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      screens: {
        desktop: { raw: '(hover: hover)' },
        mobile: { raw: '(hover: none)' },
      },
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
}

export default config
