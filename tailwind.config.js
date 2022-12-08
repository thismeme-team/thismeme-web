// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");
const PX0_300 = { ...Array.from(Array(301)).map((_, i) => `${i / 10}rem`) };

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: PX0_300,
      colors: {
        "light-gray-10": "#f6f6f6",
        "light-gray-20": "#eeeeee",
        "light-gray-30": "#d9d9d9",
        "gray-10": "#c4c4c4",
        "gray-20": "#666666",
        "dark-gray-10": "#383838",
        "dark-gray-20": "#242424",
        brand: "#a0c3d2",
        bookmark: "#ffc564",
      },
      fontSize: {
        header: [
          "1.8rem",
          {
            lineHeight: "1.8rem",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        title: [
          "2rem",
          {
            lineHeight: "2rem",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        tag: [
          "1.5rem",
          {
            lineHeight: "1.8rem",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        regular: [
          "1.6rem",
          {
            lineHeight: "1.6rem",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        "semi-bold": [
          "1.6rem",
          {
            lineHeight: "1.6rem",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        label: [
          "1.2rem",
          {
            lineHeight: "1.4rem",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
      },
      fontFamily: {
        sans: ["var(--font-pretendardVariable)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
