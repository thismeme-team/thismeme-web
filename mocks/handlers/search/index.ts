import { rest } from "msw";

import type { PaginationResponse, SearchResultByKeyword, SearchResultByTag } from "@/types";

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
  "https://picsum.photos/400",
  "https://picsum.photos/300/200",
  "https://picsum.photos/1600/400",
  "https://picsum.photos/500/200",
];

const searchResults = Array.from(Array(1024).keys()).map((id) => ({
  id,
  title: "무난한도전",
  image_url: sampleImages[Math.floor(Math.random() * 4)],
  image_width: 500,
  image_height: 200,
  tags: ["무한도전", "박명수"],
  view_count: 10,
  share_count: 100,
  create_date: new Date().toString(),
  modified_date: new Date().toString(),
}));

export const getSearchResultsByKeyword = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/search`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const query = searchParams.get("keyword");
    const offset = Number(searchParams.get("offset"));
    const limit = Number(searchParams.get("limit"));
    const data = searchResults.slice(offset * limit, (offset + 1) * limit);

    return res(
      ctx.status(200),
      ctx.json<PaginationResponse<SearchResultByKeyword>>({
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
  `${process.env.NEXT_PUBLIC_API_URL}/search/tags`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const query = searchParams.get("tag");
    const page = Number(searchParams.get("page"));
    const size = Number(searchParams.get("size"));
    const data = searchResults.slice(page * size, (page + 1) * size);

    return res(
      ctx.status(200),
      ctx.json<PaginationResponse<SearchResultByTag>>({
        data,
        pageNumber: page,
        pageSize: size,
        isLastPage: data.length < size,
        isFirstPage: page === 0,
      }),
      ctx.delay(500),
    );
  },
);
