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

/**
 * @desc
 *   실제 api가 아닙니다!
 *   FE 전용 재요청 로직 테스트입니다
 */
export const requestAgainTest = rest.post(
  `${process.env.NEXT_PUBLIC_API_URL}/token/requestAgainTest`,
  async (req, res, ctx) => {
    const status = Math.floor(Math.random() * 100) % 4 ? 200 : 401;
    return res(ctx.status(status));
  },
);
