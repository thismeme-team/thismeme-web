import "@/styles/globals.css";

import type { AppProps } from "next/app";
import type { ComponentProps } from "react";
import { Suspense } from "react";

import { QueryClientProvider } from "@/application/queryClient";
import { QueryErrorBoundary } from "@/components/common/ErrorBoundary";
import { Layout } from "@/components/common/Layout";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../../mocks");
}

interface PageProps {
  hydrateState: ComponentProps<typeof QueryClientProvider>["hydrateState"];
}

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
  return (
    <QueryClientProvider hydrateState={pageProps.hydrateState}>
      <QueryErrorBoundary>
        <Layout>
          <Suspense fallback={<>hello</>}>
            <Component {...pageProps} />
          </Suspense>
        </Layout>
      </QueryErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
