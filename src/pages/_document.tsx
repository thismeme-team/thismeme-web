import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => {
  return (
    <Html>
      <Head>
        <link href="/public/favicon.ico" rel="icon" />
        <Script
          crossOrigin="anonymous"
          id="kakao"
          integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
          strategy="lazyOnload"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default Document;
