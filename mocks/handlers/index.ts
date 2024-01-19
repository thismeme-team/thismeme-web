import * as account from "./account";
import * as auth from "./auth";
import * as collection from "./collection";
import * as meme from "./meme";
import * as search from "./search";
import * as tags from "./tags";

export const handlers = [
  ...Object.values(auth),
  ...Object.values(tags),
  ...Object.values(meme),
  ...Object.values(search),
  ...Object.values(account),
  ...Object.values(collection),
];
