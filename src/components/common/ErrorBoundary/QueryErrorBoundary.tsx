import { QueryErrorResetBoundary } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

const QueryErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              There was an error!
              <button onClick={() => resetErrorBoundary()}>Try again</button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default QueryErrorBoundary;
