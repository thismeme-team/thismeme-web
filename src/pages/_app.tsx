import "@/styles/globals.css";

import type { AppProps } from "next/app";
import type { ComponentProps } from "react";
import { Suspense } from "react";

import ContextProvider from "@/application/context";
import QueryClientProvider from "@/application/queryClient";
import { QueryErrorBoundary } from "@/components/common/ErrorBoundary";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../../mocks");
}

interface PageProps {
  hydrateState: ComponentProps<typeof QueryClientProvider>["hydrateState"];
}

function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <QueryClientProvider hydrateState={pageProps.hydrateState}>
      <QueryErrorBoundary>
        <ContextProvider>
          <Suspense fallback={<>hello</>}>
            <Component {...pageProps} />
          </Suspense>
        </ContextProvider>
      </QueryErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
