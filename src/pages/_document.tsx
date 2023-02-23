import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <link href="/favicon.ico" rel="shortcut icon" />
        <link href="/apple-icon-120x120.png" rel="apple-touch-icon" />
        <link href="/apple-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="https://server.thismeme.me" rel="preconnect" />
        <script
          defer
          crossOrigin="anonymous"
          integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
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
