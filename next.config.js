/* eslint-disable @typescript-eslint/no-var-requires */
const IS_DEV = process.env.NODE_ENV === "development";

const { withPlugins, extend } = require("next-compose-plugins");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: IS_DEV,
});
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require("@sentry/nextjs");

const baseConfig = require("./config/base.next.config.js");
/** @type {import("next").NextConfig} */
module.exports = extend(() => baseConfig).withPlugins([
  [withPWA],
  [withBundleAnalyzer],
  [withSentryConfig, { silent: true }],
]);
