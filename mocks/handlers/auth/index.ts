import { rest } from "msw";

export const refresh = rest.post(
  `${process.env.NEXT_PUBLIC_API_URL}/token/refresh`,
  async (req, res, ctx) => {
    const refreshToken = req.cookies.refreshToken;

    // NOTE: refreshToken 이 없거나 만료되었으면 401, 정상 200
    const status = 200;

    // NOTE: Internal Server Error 500
    return res(
      ctx.status(Math.random() > 0.85 ? 500 : status),
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
