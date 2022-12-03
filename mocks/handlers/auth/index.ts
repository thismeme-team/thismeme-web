import type { LoginBody, LoginResponse } from "mocks/types";
import { rest } from "msw";

export const postLogin = rest.post<LoginBody, LoginResponse>("/login", async (req, res, ctx) => {
  return res(
    // Respond with a 200 status code
    ctx.status(200),
    ctx.json({
      email: "email@email.com",
      nickname: "ROJAY",
    }),
  );
});
