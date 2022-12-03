import * as auth from "./auth";
import * as post from "./post";

export const handlers = [...Object.values(auth), ...Object.values(post)];
