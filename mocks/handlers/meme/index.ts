import { rest } from "msw";

import type {
  GetMemeDetailByIdResponse,
  GetMemesByCollectionIdResponse,
} from "@/infra/api/meme/types";
import type { GetMemesResponse } from "@/infra/api/search/types";

import * as MOCK_DATA from "../search/data";

export const getMemeDetail = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/memes/:id`,
  async (req, res, ctx) => {
    const memeId = Number(req.params.id);

    return res(
      ctx.status(200),
      ctx.delay(300),
      ctx.json<GetMemeDetailByIdResponse>({
        memeId,
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

/**
 * 콜렉션 별 밈 목록 API
 */
export const getMemesByCollectionId = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/memes/collections/:collectionId`,
  (req, res, ctx) => {
    const data = MOCK_DATA.memes.slice(0, 10);

    return res(
      ctx.delay(),
      ctx.json<GetMemesByCollectionIdResponse>({
        memes: data,
        count: data.length,
      }),
    );
  },
);

export const getMemeList = rest.get(`${process.env.NEXT_PUBLIC_API_URL}/memes`, (req, res, ctx) => {
  const { searchParams } = req.url;
  const page = Number(searchParams.get("page"));
  const size = Number(searchParams.get("size"));

  const offset = Math.floor(Math.random() * 200) + page;

  const data = MOCK_DATA.memes.slice(offset, offset + size);

  return res(
    ctx.status(200),
    ctx.json<GetMemesResponse>({
      memes: data,
      count: data.length,
    }),
    ctx.delay(500),
  );
});
