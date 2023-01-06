import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta content="네가 찾던 ‘그 밈’ 그 집이 내 집이였어야 해" name="description" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <link href="/public/favicon.ico" rel="icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js" />
      </body>
    </Html>
  );
};
export default Document;
