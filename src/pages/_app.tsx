import "@/styles/globals.css";

import { App as KonstaStyle } from "konsta/react";
import type { AppProps } from "next/app";
import type { ComponentProps } from "react";
import { Suspense } from "react";

import { QueryClientProvider } from "@/application/queryClient";
import { android } from "@/application/util";
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
  return (
    <QueryClientProvider hydrateState={pageProps.hydrateState}>
      <ToastProvider>
        <KonstaStyle theme={android ? "material" : "ios"}>
          <Layout>
            <QueryErrorBoundary>
              <Suspense fallback={<>hello</>}>
                <ToastContainer />
                <Component {...pageProps} />
              </Suspense>
            </QueryErrorBoundary>
          </Layout>
        </KonstaStyle>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
