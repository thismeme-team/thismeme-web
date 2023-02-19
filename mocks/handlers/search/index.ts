import { rest } from "msw";

import type { GetMemesResponse } from "@/infra/api/search/types";

import * as MOCK_DATA from "./data";

export const getSearch = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/search`,
  (req, res, ctx) => {
    const query = req.url.searchParams.get("word");

    if (!query) {
      return res(ctx.delay(), ctx.status(404));
    }

    return res(
      ctx.delay(),
      ctx.json({
        tags: MOCK_DATA.tags.filter((tag) => tag.name.search(query) !== -1),
      }),
    );
  },
);

export const getSearchResultsByKeyword = rest.get(
  `${process.env.NEXT_PUBLIC_SEARCH_API_URL}/search`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const query = searchParams.get("keyword");
    const offset = Number(searchParams.get("offset"));
    const limit = Number(searchParams.get("limit"));
    const data = MOCK_DATA.memes.slice(offset, offset + limit);

    if (!query || !query.trim()) {
      return res(ctx.status(400));
    }
    return res(
      ctx.status(200),
      ctx.json<GetMemesResponse>({
        memes: data,
        count: data.length,
      }),
      ctx.delay(500),
    );
  },
);

export const getSearchResultsByTag = rest.get(
  `${process.env.NEXT_PUBLIC_SEARCH_API_URL}/search/tag`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const query = searchParams.get("keyword");
    const offset = Number(searchParams.get("offset"));
    const limit = Number(searchParams.get("limit"));
    const data = MOCK_DATA.memes.slice(offset, offset + limit);

    if (!query || !query.trim()) {
      return res(ctx.status(400));
    }
    return res(
      ctx.status(200),
      ctx.json<GetMemesResponse>({
        memes: data,
        count: data.length,
      }),
      ctx.delay(500),
    );
  },
);

export const getUserSharedMemeList = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/user/memes`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get("page"));
    const size = Number(searchParams.get("size"));

    const data = MOCK_DATA.memes.slice(page, page + size);

    return res(
      ctx.status(200),
      ctx.json<GetMemesResponse>({
        memes: data,
        count: data.length,
      }),
      ctx.delay(500),
    );
  },
);
export const getMemeList = rest.get(`${process.env.NEXT_PUBLIC_API_URL}/memes`, (req, res, ctx) => {
  const { searchParams } = req.url;
  const page = Number(searchParams.get("page"));
  const size = Number(searchParams.get("size"));

  const offset = Math.floor(Math.random() * 200) + page;

  const data = MOCK_DATA.memes.slice(offset, offset + size);

  return res(
    ctx.status(200),
    ctx.json<GetMemesResponse>({
      memes: data,
      count: data.length,
    }),
    ctx.delay(500),
  );
});
