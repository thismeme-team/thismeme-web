import { useCallback } from "react";

const NOT_SUPPORT_CLIPBOARD = "클립보드를 지원하지 않습니다";

interface Options {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useClipboard = () => {
  const writeText = useCallback((text: string, options?: Options) => {
    if (typeof navigator.clipboard === "undefined")
      return Promise.reject<string>(NOT_SUPPORT_CLIPBOARD);

    return navigator.clipboard.writeText(text).then(options?.onSuccess).catch(options?.onError);
  }, []);

  return { writeText };
};
