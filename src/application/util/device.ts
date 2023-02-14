import { IS_CSR } from "./constant";

export const android = IS_CSR && navigator.userAgent.toLowerCase().indexOf("android") > -1;
export const mobile = IS_CSR && /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase());
