import { useCallback } from "react";

const NOT_SUPPORT_CLIPBOARD = "클립보드를 지원하지 않습니다";

interface WriteTextOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useClipboard = () => {
  const writeText = useCallback((text: string, options?: WriteTextOptions) => {
    if (typeof navigator.clipboard === "undefined")
      return Promise.reject(NOT_SUPPORT_CLIPBOARD).catch(options?.onError);

    return navigator.clipboard.writeText(text).then(options?.onSuccess).catch(options?.onError);
  }, []);

  return { writeText };
};
