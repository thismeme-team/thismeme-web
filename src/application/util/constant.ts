export const IS_CSR = typeof window !== "undefined";

export const DOMAIN = IS_CSR ? window.location.origin : "";
export const PAGE_URL = IS_CSR ? window.location.href : "";

export const LOCAL_STORAGE_KEY = {
  isLogin: "jjm_user",
};
