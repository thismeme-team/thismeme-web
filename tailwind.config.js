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
        /**
         * ################################
         * @deprecated
         */
        "light-gray-10": "#f6f6f6",
        "light-gray-20": "#eeeeee",
        "light-gray-30": "#d9d9d9",
        "gray-10": "#c4c4c4",
        "gray-20": "#666666",
        "dark-gray-10": "#383838",
        "dark-gray-20": "#242424",
        /**
         * ################################
         */

        gray: {
          100: "#f3f4f8",
          200: "#eaebf1",
          300: "#e1e1e7",
          400: "#d7d7dd",
          500: "#c1c2c9",
          600: "#aeaeb0",
          700: "#636368",
          800: "#37373d",
          900: "#262528",
        },

        primary: {
          100: "#edefff",
          200: "#e4e7ff",
          300: "#dbdeff",
          400: "#b9c0fe",
          500: "#a1aafe",
          600: "#8893fd",
          700: "#6b79fd",
          800: "#4c5dfc",
          900: "#3044fc",
          1000: "#0d24fb",
        },

        secondary: {
          100: "#ffefeb",
          200: "#ffe8e1",
          300: "#ffd9cd",
          400: "#fdbfac",
          500: "#fcac95",
          600: "#fb9c80",
          700: "#fa8e6e",
          800: "#f97b56",
          900: "#f86b41",
          1000: "#f65221",
        },
      },
      fontSize: {
        /**
         * ################################
         * @deprecated
         */
        "20-bold-140": [
          "2rem",
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
        /**
         * ################################
         */

        "32-bold-140": [
          "3.2rem",
          {
            lineHeight: "140%",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        "22-bold-140": [
          "2.2rem",
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
        "16-semibold-140": [
          "1.6rem",
          {
            lineHeight: "140%",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        "16-regular-140": [
          "1.6rem",
          {
            lineHeight: "140%",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        "14-semibold-140": [
          "1.4rem",
          {
            lineHeight: "140%",
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
        "12-medium-160": [
          "1.2rem",
          {
            lineHeight: "160%",
            letterSpacing: "0em",
            fontWeight: "500",
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
        "11-semibold-140": [
          "1.1rem",
          {
            lineHeight: "140%",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
      },
      fontFamily: {
        pretendard: ["var(--font-pretendardVariable)", ...defaultTheme.fontFamily.sans],
        suit: ["var(--font-suitVariable)", ...defaultTheme.fontFamily.serif],
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
            transform: "translate3d(0,200%,0)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translate3d(0,0,0)",
            opacity: "1",
          },
        },
        exit: {
          "100%": {
            transform: "translate3d(0,200%,0)",
            opacity: "0",
          },
        },
      },
      animation: {
        "slide-down": "slideDown 300ms cubic-bezier(0.87,0,0.13,1)",
        "slide-up": "slideUp 300ms cubic-bezier(0.87,0,0.13,1)",
        enter: "enter 300ms cubic-bezier(.21,1.02,.73,1) forwards",
        exit: "exit 300ms cubic-bezier(.21,1.02,.73,1) forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
