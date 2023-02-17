import { rest } from "msw";

export const getMyAccount = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/accounts/me`,
  async (req, res, ctx) => {
    const isAuth = req.headers.get("authorization");

    return res(
      ctx.status(isAuth ? 200 : 401),
      ctx.json({
        createDate: new Date().toISOString(),
        email: "test@gmail.com",
        modifiedDate: null,
        name: "test",
        shareCount: 97,
        saveCount: 34,
        collectionId: 3,
        shareCollectionId: 4,
        //userId 필드 추가
      }),
    );
  },
);
