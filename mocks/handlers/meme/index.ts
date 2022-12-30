import { rest } from "msw";

import type { Meme } from "@/types";

export const getMemeDetail = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/meme/:id`,
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Meme>({
        id: 1,
        src: "https://picsum.photos/444/200",
        title: "제목",
        description: "밈 설명 밈 설명".repeat(10),
        views: 1,
        date: "2022.12.22",
        tags: ["대분류태그", "관련인물태그", "관련감정태그", "관련주제태그"],
        author: "작성자",
        share: 0,
      }),
    );
  },
);
