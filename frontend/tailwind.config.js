/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
        primary: "#f43f5e",   // rose-500
        coral: "#fb7185",     // rose-400
      },
    },
  },
  plugins: [],
}
