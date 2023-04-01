import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

import { useAnalytics } from "@/application/hooks";
import { QueryClientProvider } from "@/application/queryClient";
import * as gtag from "@/application/util";
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

  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
  }, [router]);

  useAnalytics();

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script id="gtag-init">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "${gtag.GA_TRACKING_ID}", {
          page_path: window.location.pathname,
        });
        `}
      </Script>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager">
        {`
        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js",
          });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", ${process.env.NEXT_PUBLIC_GTM_ID});
        `}
      </Script>

      <Head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=yes"
          name="viewport"
        />
      </Head>

      <QueryClientProvider hydrateState={pageProps.hydrateState}>
        <ToastProvider>
          <SignUpModalProvider>
            <Layout>
              <QueryErrorBoundary>
                <ToastContainer />
                <SignUpModal />
                <Component {...pageProps} />
              </QueryErrorBoundary>
            </Layout>
          </SignUpModalProvider>
        </ToastProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
