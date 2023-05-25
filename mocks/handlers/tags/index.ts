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
        mainCategories: MOCK_DATA.mainCategories,
        mainTags: MOCK_DATA.mainTags,
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

export const getFavoriteTags = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/favs`,
  async (req, res, ctx) => {
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        tags: MOCK_DATA.favoriteTags,
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
    return res(ctx.delay(), ctx.status(Math.random() > 0.8 ? 500 : 200));
  },
);

export const getTagAutoSearch = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/search`,
  async (req, res, ctx) => {
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        tags: MOCK_DATA.favoriteTags,
      }),
    );
  },
);

/**
 * 태그 상세 조회 API
 */
export const getTagInfo = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/:tagId`,
  async (req, res, ctx) => {
    const tagId = +req.params.tagId;

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        tagId,
        name: "개발자",
        viewCount: 54,
        categoryId: 1,
        categoryName: "카테고리 명1",
        isFav: true,
      }),
    );
  },
);

export const getTagRank = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/rank/new`,
  async (req, res, ctx) => {
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        tags: MOCK_DATA.popularTag,
      }),
    );
  },
);
