export const IS_CSR = typeof window !== "undefined";

export const DOMAIN = IS_CSR ? window.location.origin : "";
