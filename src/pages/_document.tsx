import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <title>JJM</title>
        <meta content="네가 찾던 ‘그 밈’ 그 집이 내 집이였어야 해" name="description" />
        <link href="/public/favicon.ico" rel="icon" />
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
