/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agility-purple': '#7933dd',
        'dashboard-title': '#111827',
        'line': '#4600AA',
        'line-2': '#691AD8',
        'line-3': '#BC99EE',
        'line-4': '#111827',
      },
    },
  },
  plugins: [],
}
