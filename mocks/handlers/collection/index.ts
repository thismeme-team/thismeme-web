import { rest } from "msw";

/*공유할 때 post 하는 api*/

export const postMemeToSharedCollection = rest.post(
  `${process.env.NEXT_PUBLIC_API_URL}/collections/share/memes/:memeId`,
  (req, res, ctx) => {
    const isOK = Math.random() > 0.4;
    return res(ctx.delay(), ctx.status(isOK ? 200 : 500));
  },
);
