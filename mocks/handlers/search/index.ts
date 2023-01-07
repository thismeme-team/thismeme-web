import { rest } from "msw";

import type { PaginationResponse, SearchResult } from "@/types";

export const getSearch = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/search`,
  (req, res, ctx) => {
    const query = req.url.searchParams.get("word");

    if (!query) {
      return res(ctx.delay(), ctx.status(404));
    }
    const tags = [
      ...new Array(5).fill(null).map(() => ({
        tagId: Math.random().toString(36).slice(2),
        name: "무",
        categoryName: "예능",
        viewCount: Math.round(Math.random() * 10),
      })),
      ...new Array(5).fill(null).map(() => ({
        tagId: Math.random().toString(36).slice(2),
        name: "무한",
        categoryName: "예능",
        viewCount: Math.round(Math.random() * 10),
      })),
      ...new Array(5).fill(null).map(() => ({
        tagId: Math.random().toString(36).slice(2),
        name: "무한도",
        categoryName: "예능",
        viewCount: Math.round(Math.random() * 10),
      })),
      ...new Array(10).fill(null).map(() => ({
        tagId: Math.random().toString(36).slice(2),
        name: "무한도전",
        categoryName: "예능",
        viewCount: Math.round(Math.random() * 10),
      })),
      ...new Array(10).fill(null).map(() => ({
        tagId: Math.random().toString(36).slice(2),
        name: "박명수",
        categoryName: "인물",
        viewCount: Math.round(Math.random() * 10),
      })),
      ...new Array(10).fill(null).map(() => ({
        tagId: Math.random().toString(36).slice(2),
        name: "물",
        categoryName: "인물",
        viewCount: Math.round(Math.random() * 10),
      })),
      ...new Array(10).fill(null).map(() => ({
        tagId: Math.random().toString(36).slice(2),
        name: "물통",
        categoryName: "인물",
        viewCount: Math.round(Math.random() * 10),
      })),
      ...new Array(10).fill(null).map(() => ({
        tagId: Math.random().toString(36).slice(2),
        name: "휴지",
        categoryName: "인물",
        viewCount: Math.round(Math.random() * 10),
      })),
    ];
    return res(
      ctx.delay(),
      ctx.json({
        tags: tags.filter((tag) => tag.name.search(query) !== -1),
      }),
    );
  },
);

const sampleImages = [
  { url: "https://picsum.photos/400", width: 400, height: 400 },
  { url: "https://picsum.photos/200/300", width: 200, height: 300 },
  { url: "https://picsum.photos/500/200", width: 500, height: 200 },
  { url: "https://picsum.photos/500/400", width: 500, height: 400 },
  { url: "https://picsum.photos/700/400", width: 700, height: 400 },
  { url: "https://picsum.photos/235/294", width: 235, height: 294 },
  { url: "https://picsum.photos/236/354", width: 236, height: 354 },
];

const searchResults = Array.from(Array(1024).keys()).map((id) => {
  const randomIndex = Math.floor(Math.random() * sampleImages.length);
  const { url, width, height } = sampleImages[randomIndex];
  return {
    id,
    title: "무난한도전",
    image_url: url,
    image_width: width,
    image_height: height,
    tags: ["무한도전", "박명수"],
    view_count: 10,
    share_count: 132,
    create_date: new Date().toString(),
    modified_date: new Date().toString(),
  };
});

export const getSearchResultsByKeyword = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/search`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const query = searchParams.get("keyword");
    const offset = Number(searchParams.get("offset"));
    const limit = Number(searchParams.get("limit"));
    const data = searchResults.slice(offset * limit, (offset + 1) * limit);

    if (!query || !query.trim()) {
      return res(ctx.status(400));
    }
    return res(
      ctx.status(200),
      ctx.json<PaginationResponse<SearchResult>>({
        data,
        pageNumber: offset,
        pageSize: limit,
        isLastPage: data.length < limit,
        isFirstPage: offset === 0,
      }),
      ctx.delay(500),
    );
  },
);

export const getSearchResultsByTag = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/search/tag`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const query = searchParams.get("keyword");
    const offset = Number(searchParams.get("offset"));
    const limit = Number(searchParams.get("limit"));
    const data = searchResults.slice(offset * limit, (offset + 1) * limit);

    if (!query || !query.trim()) {
      return res(ctx.status(400));
    }
    return res(
      ctx.status(200),
      ctx.json<PaginationResponse<SearchResult>>({
        data,
        pageNumber: offset,
        pageSize: limit,
        isLastPage: data.length < limit,
        isFirstPage: offset === 0,
      }),
      ctx.delay(500),
    );
  },
);
