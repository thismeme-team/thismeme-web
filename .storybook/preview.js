import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswDecorator } from "msw-storybook-addon";
import "@/styles/globals.css";
import { handlers } from "../mocks/handlers";
import * as NextImage from "next/image";

// Initialize MSW
initialize();

export const decorators = [mswDecorator, (Story) => <Story />];

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
    handlers: {
      handlers,
    },
  },
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
