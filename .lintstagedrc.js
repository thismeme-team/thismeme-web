const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  // Type check TypeScript files
  "**/*.ts?(x)": () => "yarn tsc",

  // Lint ts,tsx,js,jsx files
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],

  // Prettier ts,tsx,js,jsx,md,json files
  "*.{ts,tsx,js,jsx,md,json}": "prettier --write",
};
