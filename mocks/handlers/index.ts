import * as auth from "./auth";
import * as post from "./post";
import * as search from "./search";

export const handlers = [...Object.values(auth), ...Object.values(post), ...Object.values(search)];
