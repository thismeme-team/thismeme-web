import { rest } from "msw";

/**
 * 특정 밈을 포함하는 콜렉션 정보 API
 */
export const getCollectionInfoByMemeId = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/collections/check/memes/:memeId`,
  (req, res, ctx) => {
    const memeId = Number(req.params.memeId);

    if (memeId >= 5) {
      return res(ctx.delay(2000), ctx.status(200), ctx.json({ collectionId: 1, isAdded: true }));
    }
    return res(ctx.delay(2000), ctx.status(200), ctx.json({ collectionId: null, isAdded: false }));
  },
);

/**
 * 콜렉션 삭제 API
 */
export const deleteMemeFromCollection = rest.delete(
  `${process.env.NEXT_PUBLIC_API_URL}/collections/memes/:memeId`,
  (req, res, ctx) => {
    const isOK = Math.random() > 0.4;
    return res(ctx.delay(), ctx.status(isOK ? 200 : 500));
  },
);

/**
 * 콜렉션 저장 API
 */
export const postMemeToCollection = rest.post(
  `${process.env.NEXT_PUBLIC_API_URL}/collections/memes/:memeId`,
  (req, res, ctx) => {
    const isOK = Math.random() > 0.4;
    return res(ctx.delay(), ctx.status(isOK ? 200 : 500));
  },
);

/**
 * 공유할 때 post 하는 API
 */
export const postMemeToSharedCollection = rest.post(
  `${process.env.NEXT_PUBLIC_API_URL}/collections/share/memes/:memeId`,
  (req, res, ctx) => {
    const isOK = Math.random() > 0.4;
    return res(ctx.delay(), ctx.status(isOK ? 200 : 500));
  },
);
