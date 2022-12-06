import "@/styles/globals.css";

import localFont from "@next/font/local";
import type { AppProps } from "next/app";
import type { ComponentProps } from "react";
import { Suspense } from "react";

import QueryClientProvider from "@/application/queryClient";
import { QueryErrorBoundary } from "@/components/common/ErrorBoundary";

const myFont = localFont({
  src: "../styles/fonts/PretendardVariable.woff2",
  variable: "--font-pretendardVariable",
});

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
        <main className={`${myFont.variable} font-sans`}>
          <Suspense fallback={<>hello</>}>
            <Component {...pageProps} />
          </Suspense>
        </main>
      </QueryErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
