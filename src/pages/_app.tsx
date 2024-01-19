import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import tw from "twin.macro";

import type { DefaultPageProps } from "@/api/core";
import { QueryClientProvider } from "@/api/core";
import { QueryErrorBoundary } from "@/common/components/ErrorBoundary";
import { Layout } from "@/common/components/Layout";
import { SignUpModal, SignUpModalProvider } from "@/common/components/Modal";
import { ToastContainer, ToastProvider } from "@/common/components/Toast";
import { OverlayProvider, RouteTrackingProvider, useAnalytics } from "@/common/hooks";
import { GoogleTagManagerScript, GTagScript } from "@/common/libs";
import { PATH } from "@/common/utils";
import { TagCategoryProvider } from "@/features/common";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  await import("../../mocks");
}

const App = ({ Component, pageProps }: AppProps<DefaultPageProps>) => {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
  }, [router]);

  useAnalytics();

  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <>
          <GTagScript />
          <GoogleTagManagerScript />
        </>
      )}

      <Head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=yes"
          name="viewport"
        />
      </Head>

      <QueryClientProvider hydrateState={pageProps.hydrateState}>
        <RouteTrackingProvider>
          <ToastProvider>
            <SignUpModalProvider>
              <TagCategoryProvider>
                <Layout css={router.pathname === PATH.getUploadPage() ? tw`bg-gray-100` : ""}>
                  <OverlayProvider>
                    <QueryErrorBoundary>
                      <ToastContainer />
                      <SignUpModal />
                      <Component {...pageProps} />
                    </QueryErrorBoundary>
                  </OverlayProvider>
                </Layout>
              </TagCategoryProvider>
            </SignUpModalProvider>
          </ToastProvider>
        </RouteTrackingProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
