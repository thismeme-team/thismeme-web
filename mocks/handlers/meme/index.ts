import { rest } from "msw";

import type { Meme } from "@/types";

export const getMemeDetail = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/meme/:id`,
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Meme>({
        memeId: 0,
        name: "제목",
        description: "밈 설명 밈 설명".repeat(10),
        viewCount: 1,
        shareCount: 1,
        createDate: "2023.01.08",
        modifiedDate: "2023.01.09",
        image: {
          images: [
            {
              imageId: 2,
              imageUrl:
                "https://user-images.githubusercontent.com/62461857/210932649-cc578130-3689-4b78-941b-d42828127b79.png",
              width: 517,
              height: 706,
            },
          ],
          count: 0,
        },
      }),
    );
  },
);
