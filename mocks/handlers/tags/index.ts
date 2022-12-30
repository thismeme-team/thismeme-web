import { rest } from "msw";

export const getPopularTag = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/tags/popular`,
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
        ],
      }),
    );
  },
);
