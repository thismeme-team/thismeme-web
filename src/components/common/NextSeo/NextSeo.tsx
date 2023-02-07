import Head from "next/head";

import type { NextSeoProps } from "./types";

/**
 * @name NextSeo
 * @description
 * 현재 페이지에 타이틀, 설명, [OpenGraph](https://nowonbun.tistory.com/517) (공유 시 타이틀, 설명, 이미지) 를 적용할 수 있도록 하는 컴포넌트입니다.
 * 추후에 twitter card 도 적용할 예정입니다.
 * @example
 * <NextSeo
 *    title="홈 | 당신이 찾는 ‘그 밈’"
 *    description="네가 찾던 ‘그 밈’ 그 집이 내 집이였어야 해"
 *    canonical="https://app.thismeme.me"
 *    openGraph={{
 *      url: "https://app.thismeme.me",
 *      title: "홈 | 당신이 찾는 ‘그 밈’",
 *      description: "네가 찾던 ‘그 밈’ 그 집이 내 집이였어야 해",
 *      imageUrl: "https://static.toss.im/assets/paper0/pc_og.png"
 *    }}
 * />
 */
export const NextSeo = (props: NextSeoProps) => {
  const tagsToRender = [];
  const { title, description, canonical, openGraph } = props;

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

  if (canonical) {
    tagsToRender.push(<link href={canonical} key="canonical" rel="canonical" />);
  }
  return <Head>{tagsToRender}</Head>;
};
