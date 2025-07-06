// tailwind.config.js (for ES modules)
import scrollbar from 'tailwind-scrollbar';
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar,
    scrollbarHide
  ],
};