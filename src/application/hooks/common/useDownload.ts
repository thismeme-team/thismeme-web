import { useCallback, useState } from "react";

interface DownloadOptions {
  target: string;
  name: string;
  onSuccess?: () => void;
  onError?: () => void;
}

/**
 * NOTE 이미지 URL 다운로드만 구현
 * - 다른 형식의 파일은 추가 구현 필요
 */
export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const download = useCallback(
    async ({ target, name, onSuccess, onError }: DownloadOptions) => {
      if (!target || isDownloading) return;

      try {
        setIsDownloading(true);

        /**
         * NOTE Optimistic UI
         * 로딩, 실패 케이스도 고려해야 한다면
         * react-hot-toast의 promise 버전 toast를 구현해야 함
         */
        onSuccess?.();

        const blob = await fetch(target).then((response) => response.blob());
        const blobURL = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobURL;
        a.download = name;
        a.rel = "noopener noreferrer";

        a.click();

        URL.revokeObjectURL(blobURL);

        setIsDownloading(false);
      } catch (e) {
        onError?.();
      }
    },
    [isDownloading],
  );

  return { isDownloading, download };
};
