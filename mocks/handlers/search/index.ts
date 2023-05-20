import { rest } from "msw";

import type { GetMemesResponse } from "@/types";

import * as MOCK_DATA from "./data";

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

export const getMemesFromCollectionByKeyword = rest.get(
  `${process.env.NEXT_PUBLIC_SEARCH_API_URL}/search/collection/:collectionId`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const query = searchParams.get("keyword");
    const offset = Number(searchParams.get("offset"));
    const limit = Number(searchParams.get("limit"));

    if (!query || !query.trim()) {
      return res(ctx.status(400));
    }

    const filterByKeyword = MOCK_DATA.memes.filter((memes) => memes.tags.includes(query || ""));
    const data = filterByKeyword.slice(offset, offset + limit);

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

export const getUserFindMemes = rest.get(
  `${process.env.NEXT_PUBLIC_SEARCH_API_URL}/search/user/:userId`,
  (req, res, ctx) => {
    const { searchParams } = req.url;
    const offset = Number(searchParams.get("offset"));
    const limit = Number(searchParams.get("limit"));
    const data = MOCK_DATA.memes.slice(offset, offset + limit);

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
