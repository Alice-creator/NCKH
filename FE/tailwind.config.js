/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bold-txt": "#051E62",
        basic : "#4F606D",
        primary: "#3F95EC",
        secondary: "#9DC6FB",
        theme: "#e5f5ff",
        bold: "#4F606D"
      }
    },
  },
  plugins: [],
}
