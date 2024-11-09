import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInLong: {
          "0%": {
            opacity: "0",
          },
          "90%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        fadeInUpShort: "fadeInUp 0.5s ease-in-out",
        fadeInUpLong: "fadeInUp 1.5s ease-in-out",
        fadeInLong: "fadeInLong 4.5s ease-out",
      },
      screens: {
        bgBreakpoint: "390px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          "0": "#FFFFFF",
          "200": "#E5E5E5",
          "500": "#5C5C5C",
          "1000": "#000000",
        },
        pink: {
          "50": "#FF00AE",
          "100": "#E7C0DB",
          "200": "#C698B8",
          "600": "#FF00AE",
        },
        violet: {
          "50": "#E2DCE7",
          "100": "#E7C0DB",
          "600": "#6727A6",
          "900": "#3C1661",
        },
        red: "#D23F63",
        green: "#67C076",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
