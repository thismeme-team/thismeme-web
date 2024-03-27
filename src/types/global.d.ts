declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CANONICAL_URL: string;

    NEXT_PUBLIC_KAKAO_SDK: string;
    NEXT_PUBLIC_API_MOCKING: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_SEARCH_API_URL: string;
    NEXT_PUBLIC_CHANNEL_IO_KEY: string;
    NEXT_PUBLIC_GA_ID: string;
    NEXT_PUBLIC_GTM_ID: string;

    NEXT_PUBLIC_KAKAO_OAUTH2_URL: string;

    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
  }
}

declare namespace Kakao {
  /**
   * FIXME kakao-js-sdk의 Link namespace를 Share로 재선언 해야 함
   * @link https://devtalk.kakao.com/t/notice-name-changed-kakao-link-kakao-talk-sharing/123149
   */
  declare const Share: any;
}

interface Window {
  ChannelIO?: IChannelIO;
  ChannelIOInitialized?: boolean;
  gtag: any;
}

interface IChannelIO {
  c?: (...args: any) => void;
  q?: [methodName: string, ...args: any[]][];
  (...args: any): void;
}
