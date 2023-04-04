/** @type {import('tailwindcss').Config} */
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
        blueGradient: "linear-gradient(60deg, #29323c 0%, #485563 100%)",
      },
    },
  },
  plugins: [],
};
