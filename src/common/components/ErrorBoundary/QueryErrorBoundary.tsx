import { QueryErrorResetBoundary } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { GlobalError } from "../Error/GlobalError";

export const QueryErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={<GlobalError />} onReset={reset}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
