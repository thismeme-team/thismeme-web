import Head from "next/head";

import type { NextSeoProps } from "./types";

/**
 * @name NextSeo
 * @description
 * 현재 페이지에 타이틀, 설명, [OpenGraph](https://nowonbun.tistory.com/517) (공유 시 타이틀, 설명, 이미지) 를 적용할 수 있도록 하는 컴포넌트입니다.
 * @see {@link https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup Cards Markup}
 * @example
 * <NextSeo
 *    title="홈 | 당신이 찾는 ‘그 밈’"
 *    description="네가 찾던 ‘그 밈’ 그 집이 내 집이였어야 해"
 *    canonical="https://app.thismeme.me"
 *    openGraph={{
 *      url: "https://app.thismeme.me",
 *      title: "홈 | 당신이 찾는 ‘그 밈’",
 *      description: "네가 찾던 ‘그 밈’ 그 집이 내 집이였어야 해",
 *      imageUrl: "https://static.toss.im/assets/paper0/pc_og.png",
 *      siteName: '그 밈'
 *    }}
 *    twitter={{
 *      handle: "@thismeme_team",
 *      site: "@thismeme_team",
 *      cardType: "summary_large_image"
 *    }}
 * />
 */
export const NextSeo = (props: NextSeoProps) => {
  const tagsToRender = [];
  const { title, description, canonical, openGraph, twitter } = props;

  if (title) {
    tagsToRender.push(<title key="title">{title}</title>);
  }

  if (description) {
    tagsToRender.push(<meta content={description} key="description" name="description" />);
  }

  if (openGraph?.title || title) {
    tagsToRender.push(
      <meta content={openGraph?.title || title} key="og:title" property="og:title" />,
    );
  }

  if (openGraph?.siteName) {
    tagsToRender.push(
      <meta content={openGraph.siteName} key="og:site_name" property="og:site_name" />,
    );
  }

  if (openGraph?.description || description) {
    tagsToRender.push(
      <meta
        content={openGraph?.description || description}
        key="og:description"
        property="og:description"
      />,
    );
  }

  if (openGraph) {
    if (openGraph.url || canonical) {
      tagsToRender.push(
        <meta content={openGraph.url || canonical} key="og:url" property="og:url" />,
      );
    }
    if (openGraph.imageUrl) {
      tagsToRender.push(<meta content={openGraph.imageUrl} key="og:image" property="og:image" />);
    }
  }

  if (twitter) {
    if (twitter.cardType) {
      tagsToRender.push(<meta content={twitter.cardType} key="twitter:card" name="twitter:card" />);
    }

    if (twitter.site) {
      tagsToRender.push(<meta content={twitter.site} key="twitter:site" name="twitter:site" />);
    }

    if (twitter.handle) {
      tagsToRender.push(
        <meta content={twitter.handle} key="twitter:creator" name="twitter:creator" />,
      );
    }
  }

  if (canonical) {
    tagsToRender.push(<link href={canonical} key="canonical" rel="canonical" />);
  }
  return <Head>{tagsToRender}</Head>;
};
