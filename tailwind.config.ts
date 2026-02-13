import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdfcfb',
          100: '#f9f6f2',
          200: '#f2ebe3',
          300: '#e8dfd4',
          400: '#d9cbb9',
          500: '#c9b69e',
          600: '#b09a7f',
          700: '#8f7c63',
          800: '#6e5f4a',
          900: '#4d4233',
        },
        terracotta: {
          50: '#fdf6f4',
          100: '#fae8e3',
          200: '#f5d1c7',
          300: '#efb9ab',
          400: '#e89d88',
          500: '#e18165',
          600: '#d26549',
          700: '#b44d32',
          800: '#8f3d28',
          900: '#6a2d1e',
        },
        sage: {
          50: '#f7f9f7',
          100: '#eff2ef',
          200: '#dfe5df',
          300: '#c5d1c5',
          400: '#a8b9a8',
          500: '#8ba18b',
          600: '#6f886f',
          700: '#567056',
          800: '#3f523f',
          900: '#2a362a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
