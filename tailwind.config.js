/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Inter"],
        body: ["Poppins"],
      },

      colors: {
        primary: {
          100: "#7BBE4A",
        },
      },
    },
  },
  plugins: [],
};
