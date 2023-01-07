const path = require("path");
module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
          postcssOptions: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
          },
        },
      },
    },
    "storybook-addon-next-router",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, options) => {
    const { dev } = options;
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: "pre",
      loader: require.resolve("@svgr/webpack"),
      options: {
        svgo: false,
      },
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        sourceMaps: dev,
        presets: [
          ["@babel/preset-react", { runtime: "automatic", importSource: "@emotion/react" }],
        ],
        plugins: [
          require.resolve("babel-plugin-macros"),
          [require.resolve("@babel/plugin-syntax-typescript"), { isTSX: true }],
        ],
      },
    });
    config.resolve.alias["@"] = path.resolve(__dirname, "../src/");

    // nextjs mock module
    config.resolve.alias["next/link"] = require.resolve("./__mocks__/next/link.js");

    return config;
  },
  babel: async (options) => {
    return {
      ...options,
      plugins: options.plugins.filter(
        (x) => !(typeof x === "string" && x.includes("plugin-transform-classes")),
      ),
    };
  },
  staticDirs: ["../public"],
};
