import type { DehydratedState } from "@tanstack/react-query";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { useState } from "react";

interface Props {
  hydrateState?: DehydratedState;
  children: ReactNode;
}

export const QueryClientProvider = ({ hydrateState, children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
            retry: 0,
            refetchOnWindowFocus: false,
            useErrorBoundary: false,
            staleTime: 1000 * 20, // 20초
          },
        },
      }),
  );

  return (
    <TanStackQueryClientProvider client={queryClient}>
      <Hydrate state={hydrateState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </TanStackQueryClientProvider>
  );
};
