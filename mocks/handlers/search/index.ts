import { rest } from "msw";

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
