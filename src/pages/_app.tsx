import "@/styles/globals.css";

import { App } from "konsta/react";
import type { AppProps } from "next/app";
import type { ComponentProps } from "react";
import { Suspense } from "react";

import { QueryClientProvider } from "@/application/queryClient";
import { android, mobile } from "@/application/util/device";
import { QueryErrorBoundary } from "@/components/common/ErrorBoundary";
import { Layout } from "@/components/common/Layout";
import { ToastContainer, ToastProvider } from "@/components/common/Toast";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  await import("../../mocks");
}

interface PageProps {
  hydrateState: ComponentProps<typeof QueryClientProvider>["hydrateState"];
}

const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {
  console.log(android, mobile);

  return (
    <QueryClientProvider hydrateState={pageProps.hydrateState}>
      <QueryErrorBoundary>
        <ToastProvider>
          <App theme="ios">
            <Layout>
              <Suspense fallback={<>hello</>}>
                <ToastContainer />
                <Component {...pageProps} />
              </Suspense>
            </Layout>
          </App>
        </ToastProvider>
      </QueryErrorBoundary>
    </QueryClientProvider>
  );
};

export default MyApp;
