import { rest } from "msw";

export const getMyAccount = rest.post(
  `${process.env.NEXT_PUBLIC_API_URL}/accounts/me`,
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        createDate: new Date().toISOString(),
        email: "test@gmail.com",
        modifiedDate: null,
        name: "test",
      }),
    );
  },
);
