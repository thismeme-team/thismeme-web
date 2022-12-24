import { rest } from "msw";

export const getMemeDetail = rest.get(
  "http://13.124.200.247:8080/meme/:id",
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        src: "https://picsum.photos/444/200",
        title: "제목",
        description: "밈 설명 밈 설명".repeat(10),
        views: 1,
        date: "2022.12.22",
      }),
    );
  },
);
