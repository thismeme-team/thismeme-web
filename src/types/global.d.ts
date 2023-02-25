declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_KAKAO_SDK: string;
    NEXT_PUBLIC_API_MOCKING: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_SEARCH_API_URL: string;
    NEXT_PUBLIC_CHANNEL_IO_KEY: string;
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
}

interface IChannelIO {
  c?: (...args: any) => void;
  q?: [methodName: string, ...args: any[]][];
  (...args: any): void;
}
