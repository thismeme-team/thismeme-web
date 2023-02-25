import { rest } from "msw";

import type { GetMyAccountResponse } from "@/infra/api/account/types";

export const getMyAccount = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/accounts/me`,
  async (req, res, ctx) => {
    const isAuth = req.headers.get("authorization");

    return res(
      ctx.status(isAuth ? 200 : 401),
      ctx.json<GetMyAccountResponse>({
        createdDate: new Date().toISOString(),
        email: "test@gmail.com",
        modifiedDate: null,
        name: "test",
        imageUrl: "https://yappmemebucket.s3.ap-northeast-2.amazonaws.com/memes/images/20.png",
        shareCount: 97,
        saveCount: 34,
        collectionId: 3,
        sharedCollectionId: 4,
        id: 100,
      }),
    );
  },
);
