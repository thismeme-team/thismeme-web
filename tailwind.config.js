// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('tailwindcss').Config} */
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
          "18px",
          {
            lineHeight: "18px",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        title: [
          "20px",
          {
            lineHeight: "20px",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        tag: [
          "15px",
          {
            lineHeight: "15px",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        regular: [
          "16px",
          {
            lineHeight: "16px",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        "semi-bold": [
          "16px",
          {
            lineHeight: "16px",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        label: [
          "12px",
          {
            lineHeight: "12px",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
      },
    },
  },
  plugins: [],
};
