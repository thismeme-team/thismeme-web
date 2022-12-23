import * as auth from "./auth";
import * as meme from "./meme";
import * as post from "./post";

export const handlers = [...Object.values(auth), ...Object.values(post), ...Object.values(meme)];
