/** @type {import('next-sitemap').IConfig} */
const LOCAL_URL = "http://localhost:3000";

const NEXT_SSG_FILES = [
  "/*.json$",
  "/*_buildManifest.js$",
  "/*_middlewareManifest.js$",
  "/*_ssgManifest.js$",
  "/*.js$",
];
module.exports = {
  siteUrl: process.env.SITE_URL || LOCAL_URL,
  generateRobotsTxt: true,
  exclude: ["/sitemap.xml", "/oauth2/redirect"],
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: NEXT_SSG_FILES },
      { userAgent: "*", allow: ["/", "/explore/tags?q=*", "/explore/keywords?q=*", "/memes/*"] },
      { userAgent: "*", disallow: ["/search", "/oauth2/redirect"] },
    ],
    additionalSitemaps: [`${process.env.SITE_URL || LOCAL_URL}/sitemap.xml`],
  },
};
