const NOT_EXISTED_KAKAO_SDK = "kakao SDK가 설치되지 않았습니다";

export class KakaoSDK {
  private static sdk: typeof window.Kakao;
  private constructor() {}

  public static getInstance() {
    if (this.sdk) return this.sdk;
    if (!window.Kakao) throw new Error(NOT_EXISTED_KAKAO_SDK);

    this.sdk = window.Kakao;
    this.sdk.init(process.env.NEXT_PUBLIC_KAKAO_SDK);

    return this.sdk;
  }
}
