/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8fafc',
        },
        muted: {
          DEFAULT: '#64748b',
        }
      }
    },
  },
  plugins: [],
}
