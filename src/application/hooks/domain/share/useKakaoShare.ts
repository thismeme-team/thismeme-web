import { useCallback } from "react";

import { KakaoSDK } from "@/infra/sdk";

export interface KakaoShareOptions {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  onSuccess?: () => void;
  onError?: () => void;
}

/**
 * @throws chrome devtools 모바일 모드가 켜져있으면 scheme does not registered 에러 발생
 * @link https://devtalk.kakao.com/t/scheme-does-not-have-a-registered-handler/112757
 */
export const useKakaoShare = () => {
  const share = useCallback(
    ({ title, description, url, imageUrl, onError, onSuccess }: KakaoShareOptions) => {
      try {
        const kakao = KakaoSDK.getInstance();
        kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title,
            description,
            imageUrl,
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          buttons: [
            {
              title: "웹으로 보기",
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
          ],
        });

        /**
         * NOTE
         * 서비스에서 전송 성공 여부를 직접 확인할 수 없어 Optimistic UI가 됨
         * @link https://developers.kakao.com/docs/latest/ko/message/js-link#set-kakaotalk-sharing-callback
         */
        onSuccess?.();
      } catch (e) {
        onError?.();
      }
    },
    [],
  );

  return { share };
};
