import { rest } from "msw";

import * as MOCK_DATA from "./data";

export const getPopularTag = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags`,
  async (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200), ctx.json({ tags: MOCK_DATA.popularTag }));
  },
);

export const getCategoryWithTag = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/categories`,
  async (req, res, ctx) => {
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        categories: MOCK_DATA.categories,
      }),
    );
  },
);

export const getMemeTagsById = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/memes/:id`,
  async (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        tags: [
          { tagId: 2, name: "에브리타임", viewCount: 49, categoryId: 6, categoryName: "기타" },
          { tagId: 3, name: "시험기간", viewCount: 34, categoryId: 6, categoryName: "기타" },
          { tagId: 5, name: "유머", viewCount: 140, categoryId: 6, categoryName: "기타" },
        ],
      }),
    );
  },
);

export const postFavoriteTag = rest.post(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/:tagId/fav`,
  async (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200));
  },
);

export const deleteFavoriteTag = rest.delete(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/:tagId/fav`,
  async (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200));
  },
);

export const getTagInfo = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/:tag`,
  async (req, res, ctx) => {
    const tag = String(req.params.tag);

    if (["무한도전", "분노"].includes(tag)) {
      return res(ctx.delay(), ctx.status(200), ctx.json({ tagId: 1, tag: tag, isFav: true }));
    }
    return res(ctx.delay(), ctx.status(200), ctx.json({ tagId: 1, tag: tag, isFav: false }));
  },
);
