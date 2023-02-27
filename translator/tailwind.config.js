module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      muli: ["Muli", "Helvetica", "Arial", "sans"],
    },
    extend: {
      colors: {
        cta: "#4600a8",
        ctaHover: "#5800d4",
        white: "#fff",
        border: "#cccccc",
        borderActive: "#66afe9",
      },
      fontWeight: {
        "font-medium": "400",
      },
    },
  },
  plugins: [],
};
