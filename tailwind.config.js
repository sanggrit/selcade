/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Korean-first font stack
        sans: ['"Noto Sans KR"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        // Wide tracking for the SELCADE logo wordmark
        logo: '0.22em',
      },
    },
  },
  plugins: [],
}
