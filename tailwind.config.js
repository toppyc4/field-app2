/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "intro-field": "url('/img/field-painting.png')",
      },
      screen: {
        mobile: { min: "320px", max: "425px" },

        tablet: { min: "425px", max: "768px" },

        laptop: { min: "1024px", max: "1440px" },

        desktop: { min: "1440px", max: "2560px" },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
