import { rest } from "msw";

export const getPopularTag = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags`,
  async (req, res, ctx) => {
    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        tags: [
          {
            tagId: 1,
            name: "무",
            categoryName: "sample",
            viewCount: 3,
          },
          {
            tagId: 2,
            name: "무한",
            categoryName: "sample",
            viewCount: 3,
          },
          {
            tagId: 3,
            name: "무한도",
            categoryName: "sample",
            viewCount: 3,
          },
          {
            tagId: 4,
            name: "무한도전",
            categoryName: "sample",
            viewCount: 3,
          },
          {
            tagId: 5,
            name: "무한도전전전전",
            categoryName: "sample",
            viewCount: 3,
          },
          {
            tagId: 6,
            name: "무한도전전전전전전전전",
            categoryName: "sample",
            viewCount: 3,
          },
          {
            tagId: 7,
            name: "무한도전전전전전전전전",
            categoryName: "sample",
            viewCount: 3,
          },
        ],
      }),
    );
  },
);
export const getCategoryWithTag = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/categories`,
  async (req, res, ctx) => {
    return res(
      ctx.delay(300),
      ctx.status(200),
      ctx.json({
        categories: [
          {
            categoryId: 1,
            name: "카테고리 명1",
            priority: 100,
            tags: [
              {
                tagId: 1,
                name: "개발자",
                viewCount: 52,
                isFav: true,
              },
              {
                tagId: 4,
                name: "페페",
                viewCount: 26,
                isFav: false,
              },
              {
                tagId: 5,
                name: "유머",
                viewCount: 140,
                isFav: true,
              },
            ],
          },
          {
            categoryId: 2,
            name: "카테고리 명2",
            priority: 200,
            tags: [
              {
                tagId: 2,
                name: "에브리타임",
                viewCount: 49,
                isFav: true,
              },
              {
                tagId: 3,
                name: "시험기간",
                viewCount: 34,
                isFav: true,
              },
              {
                tagId: 12,
                name: "무전",
                viewCount: 18,
                isFav: false,
              },
              {
                tagId: 13,
                name: "무한전",
                viewCount: 8,
                isFav: false,
              },
              {
                tagId: 14,
                name: "무도전",
                viewCount: 2,
                isFav: false,
              },
            ],
          },
        ],
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

export const deleteFavoriteTag = rest.delete(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/:id/fav`,
  async (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(Math.random() > 0.8 ? 500 : 200));
  },
);
