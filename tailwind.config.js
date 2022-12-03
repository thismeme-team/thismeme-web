/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "light-gray-10": "#f6f6f6",
      "light-gray-20": "#eeeeee",
      "light-gray-30": "#d9d9d9",
      "gray-10": "#c4c4c4",
      "gray-20": "#666666",
      "dark-gray-10": "#383838",
      "dark-gray-20": "#242424",
      "brand-color": "#a0c3d2",
      bookmark: "#ffc564",
    },
    // fontSize: {
    //   '2xl': ['1.5rem', {
    //     lineHeight: '2rem',
    //     letterSpacing: '-0.01em',
    //     fontWeight: '500',
    //   }],
    //   '3xl': ['1.875rem', {
    //     lineHeight: '2.25rem',
    //     letterSpacing: '-0.02em',
    //     fontWeight: '700',
    //   }],
    // },
    extend: {},
  },
  plugins: [],
};
