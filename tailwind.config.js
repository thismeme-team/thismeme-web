// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import("tailwindcss").Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");
const PX0_300 = { ...Array.from(Array(301)).map((_, i) => `${i / 10}rem`) };
const PX0_50 = { ...Array.from(Array(51)).map((_, i) => `${i / 10}rem`) };

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/application/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [{ pattern: /line-clamp-/ }],
  theme: {
    extend: {
      spacing: PX0_300,
      borderRadius: PX0_50,
      minWidth: PX0_300,
      maxWidth: PX0_300,
      minHeight: PX0_300,
      colors: {
        "light-gray-10": "#f6f6f6",
        "light-gray-20": "#eeeeee",
        "light-gray-30": "#d9d9d9",
        "gray-10": "#c4c4c4",
        "gray-20": "#666666",
        "dark-gray-10": "#383838",
        "dark-gray-20": "#242424",
        primary: "#0d24fb",
      },
      fontSize: {
        "20-bold-140": [
          "2rem",
          {
            lineHeight: "140%",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        "18-bold-140": [
          "1.8rem",
          {
            lineHeight: "140%",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        "16-semibold-130": [
          "1.6rem",
          {
            lineHeight: "130%",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        "16-regular-130": [
          "1.6rem",
          {
            lineHeight: "130%",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        "15-semibold-130": [
          "1.5rem",
          {
            lineHeight: "130%",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        "12-bold-160": [
          "1.2rem",
          {
            lineHeight: "160%",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        "12-regular-160": [
          "1.2rem",
          {
            lineHeight: "160%",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
      },
      fontFamily: {
        sans: ["var(--font-pretendardVariable)", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        slideDown: {
          "0%": { height: 0 },
          "100%": { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          "0%": { height: "var(--radix-accordion-content-height)" },
          "100%": { height: 0 },
        },
        enter: {
          "0%": {
            transform: "translate3d(0,200%,0) scale(.6)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translate3d(0,0,0) scale(1)",
            opacity: "1",
          },
        },
        exit: {
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        "slide-down": "slideDown 300ms cubic-bezier(0.87,0,0.13,1)",
        "slide-up": "slideUp 300ms cubic-bezier(0.87,0,0.13,1)",
        enter: "enter 300ms cubic-bezier(.21,1.02,.73,1) forwards",
        exit: "exit 300ms cubic-bezier(.06,.71,.55,1) forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
