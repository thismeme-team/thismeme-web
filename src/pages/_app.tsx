import "@/styles/globals.css";

import type { AppProps } from "next/app";
import type { ComponentProps } from "react";
import { Suspense } from "react";

import { QueryClientProvider } from "@/application/queryClient";
import { QueryErrorBoundary } from "@/components/common/ErrorBoundary";
import { Layout } from "@/components/common/Layout";
import { ToastContainer, ToastProvider } from "@/components/common/Toast";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  await import("../../mocks");
}

interface PageProps {
  hydrateState: ComponentProps<typeof QueryClientProvider>["hydrateState"];
}

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
  return (
    <QueryClientProvider hydrateState={pageProps.hydrateState}>
      <QueryErrorBoundary>
        <ToastProvider>
          <Layout>
            <Suspense fallback={<>hello</>}>
              <ToastContainer />
              <Component {...pageProps} />
            </Suspense>
          </Layout>
        </ToastProvider>
      </QueryErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
