/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
        surface: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        accent: {
          DEFAULT: '#3b82f6', // Tailwind blue-500
          hover: '#2563eb',   // Tailwind blue-600
        }
      }
    },
  },
  plugins: [],
}
