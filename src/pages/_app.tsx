import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { QueryClientProvider } from "@/application/queryClient";
import { QueryErrorBoundary } from "@/components/common/ErrorBoundary";
import { Layout } from "@/components/common/Layout";
import { ToastContainer, ToastProvider } from "@/components/common/Toast";
import type { DefaultPageProps } from "@/types";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  await import("../../mocks");
}

const App = ({ Component, pageProps }: AppProps<DefaultPageProps>) => {
  return (
    <QueryErrorBoundary>
      <QueryClientProvider hydrateState={pageProps.hydrateState}>
        <ToastProvider>
          <Layout>
            <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
      </QueryClientProvider>
    </QueryErrorBoundary>
  );
};

export default App;
