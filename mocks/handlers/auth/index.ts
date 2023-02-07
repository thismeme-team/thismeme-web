import { rest } from "msw";

export const refresh = rest.post(
  `${process.env.NEXT_PUBLIC_API_URL}/token/refresh`,
  async (req, res, ctx) => {
    const status = Math.floor(Math.random() * 100) % 4 ? 200 : 401;

    return res(
      ctx.status(status),
      ctx.json({
        accessToken: "Refresh Test",
      }),
    );
  },
);

export const logout = rest.post(
  `${process.env.NEXT_PUBLIC_API_URL}/token/blacklist`,
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: "Logout Test",
      }),
    );
  },
);
