module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      muli: ['Muli', 'Helvetica', 'Arial', 'sans']
    },
    extend: {
      colors: {
        cta: '#4600a8',
        ctaHover: '#5800d4',
        white: '#fff'
      }
    },
  },
  plugins: [],
}
