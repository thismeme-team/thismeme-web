import type { GetServerSideProps } from "next";
import type { ISitemapField } from "next-sitemap";
import { getServerSideSitemap } from "next-sitemap";

const LOCAL_URL = "http://localhost:3000";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const lastmod = new Date().toISOString();

  const defaultFields: ISitemapField[] = [
    {
      loc: process.env.SITE_URL || LOCAL_URL,
      changefreq: "daily",
      lastmod: lastmod,
    },
    {
      loc: `${process.env.SITE_URL || LOCAL_URL}/search`,
      changefreq: "daily",
      lastmod: lastmod,
    },
  ];

  /**
   * NOTE
   * 밈 검색 결과 페이지 사이트맵 어떻게 생성할지 고민
   */
  const exploreFields: ISitemapField[] = [
    {
      loc: `${process.env.SITE_URL || LOCAL_URL}/explore/tags?q=무한도전`,
      changefreq: "daily",
      lastmod: lastmod,
    },
    {
      loc: `${process.env.SITE_URL || LOCAL_URL}/explore/tags?q=박명수`,
      changefreq: "daily",
      lastmod: lastmod,
    },
    {
      loc: `${process.env.SITE_URL || LOCAL_URL}/explore/keywords?q=무한도전`,
      changefreq: "daily",
      lastmod: lastmod,
    },
    {
      loc: `${process.env.SITE_URL || LOCAL_URL}/explore/keywords?q=박명수`,
      changefreq: "daily",
      lastmod: lastmod,
    },
  ];

  /**
   * TODO
   * 밈 상세 페이지에서 서버사이드로 사이트맵 생성 후 이 파일에서 합쳐야함
   */

  const fields = [...defaultFields, ...exploreFields];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {
  return;
}
