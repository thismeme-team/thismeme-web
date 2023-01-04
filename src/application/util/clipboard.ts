const NOT_SUPPORT_CLIPBOARD = "클립보드를 지원하지 않습니다";

export const clipboard = {
  writeText: (text: string) => {
    if (typeof navigator.clipboard === "undefined")
      return Promise.reject<string>(NOT_SUPPORT_CLIPBOARD);

    return navigator.clipboard.writeText(text);
  },
};
