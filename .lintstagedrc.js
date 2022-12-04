const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  // Type check TypeScript files
  "**/*.ts?(x)": () => "yarn tsc",

  // Lint TS and JS files
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],

  // Prettier ts,tsx,js,jsx,md,json files
  // Prettify only Markdown and JSON files
  "*.{ts,tsx,js,jsx,md,json}": "prettier --write",
};
