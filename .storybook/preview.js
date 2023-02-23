import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswDecorator } from "msw-storybook-addon";
import "@/styles/globals.css";
import { handlers } from "../mocks/handlers";
import * as NextImage from "next/image";
import { QueryClientProvider } from "../src/application/queryClient";
import { Suspense } from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { ToastContainer, ToastProvider } from "../src/components/common/Toast";
import { SignUpModal, SignUpModalProvider } from "../src/components/common/Modal";

// Initialize MSW
initialize();

export const decorators = [
  mswDecorator,
  (Story) => (
    <QueryClientProvider>
      <ToastProvider>
        <SignUpModalProvider>
          <Suspense fallback="loading...">
            <div className="__font_family_variables font-pretendard">
              <ToastContainer />
              <SignUpModal />
              <Story />
            </div>
          </Suspense>
        </SignUpModalProvider>
      </ToastProvider>
    </QueryClientProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  layout: "fullscreen",
  msw: {
    handlers,
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
