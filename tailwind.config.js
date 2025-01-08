/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryLight: "#3D5B8C",
        secondaryLight: "#D4463840"
      },
      fontFamily: {
        pb: "Poppins-Bold",
        pr: "Poppins-Regular",
        pm: "Poppins-Medium",
        psm: "Poppins-SemiMedium",
      },
    },
  },
  plugins: [],
};
