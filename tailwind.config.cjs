/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        slate: "#191919",
        lightGrey: "#f4f4f9",
        lightBlue: "#b8dbd9",
        mediumBlue: "#afdbd2",
        darkBlue: "#2f4550",
        lightPurple: "#c79bb2",
        darkPurple: "#5f3766",
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
        manrope: ["Manrope", ...defaultTheme.fontFamily.sans],
        jp: ["Noto Sans JP", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        blueGradient: "linear-gradient(60deg, #29323c 0%, #485563 100%)",
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
