import { rest } from "msw";

import type { GetMemeDetailByIdResponse } from "@/infra/api/meme/types";

export const getMemeDetail = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/memes/:id`,
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(300),
      ctx.json<GetMemeDetailByIdResponse>({
        memeId: 0,
        name: "제목",
        description: "밈 설명 밈 설명".repeat(10),
        viewCount: 1,
        shareCount: 1,
        createdDate: "2023.01.08",
        modifiedDate: "2023.01.09",
        image: {
          images: [
            {
              imageId: 2,
              imageUrl: "https://yappmemebucket.s3.ap-northeast-2.amazonaws.com/memes/images/7.png",
              imageWidth: 390,
              imageHeight: 390,
            },
          ],
          count: 0,
        },
      }),
    );
  },
);
