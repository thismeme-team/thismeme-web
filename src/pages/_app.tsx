import "@/styles/globals.css";

import { App as KonstaStyle } from "konsta/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useWindowSize } from "@/application/hooks";
import { QueryClientProvider } from "@/application/queryClient";
import { android } from "@/application/util";
import { QueryErrorBoundary } from "@/components/common/ErrorBoundary";
import { Layout } from "@/components/common/Layout";
import { SignUpModal, SignUpModalProvider } from "@/components/common/Modal";
import { ToastContainer, ToastProvider } from "@/components/common/Toast";
import type { DefaultPageProps } from "@/types";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  await import("../../mocks");
}

const App = ({ Component, pageProps }: AppProps<DefaultPageProps>) => {
  const router = useRouter();

  const windowSize = useWindowSize();

  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
  }, [router]);

  useEffect(() => {
    // NOTE: iOS PWA vh 이슈 대응 - 기본 vh 값 대신 window.innerHeight/100 값으로 재설정 합니다
    const vh = windowSize.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [windowSize.height]);

  return (
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=yes"
          name="viewport"
        />
      </Head>
      <QueryClientProvider hydrateState={pageProps.hydrateState}>
        <ToastProvider>
          <SignUpModalProvider>
            <KonstaStyle theme={android ? "material" : "ios"}>
              <Layout>
                <QueryErrorBoundary>
                  <ToastContainer />
                  <SignUpModal />
                  <Component {...pageProps} />
                </QueryErrorBoundary>
              </Layout>
            </KonstaStyle>
          </SignUpModalProvider>
        </ToastProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
