/** @type {import("next").NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// The folders containing files importing twin.macro
const includedDirs = [
  path.resolve(__dirname, "./src/application"),
  path.resolve(__dirname, "./src/components"),
  path.resolve(__dirname, "./src/infra"),
  path.resolve(__dirname, "./src/pages"),
  path.resolve(__dirname, "./src/styles"),
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    const { dev, isServer } = options;
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    config.module.rules.push({
      test: /.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(tsx|ts)$/,
      include: includedDirs,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "babel-loader",
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
        },
      ],
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        module: false,
        path: false,
        os: false,
        crypto: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
