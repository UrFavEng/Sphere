import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#2F3E46",
        secondaryDark: "#354F52",
        primaryGreen: "#52796F",
        secondaryGreen: "#84A98C",
        lightGray: "#CAD2C5",
        lightGraySec: "#fafcf5",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
