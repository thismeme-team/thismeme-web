import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { rest } from "msw";
import React from "react";

import { PostList } from "./PostList";

export default {
  title: "Example/PostList",
  component: PostList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PostList>;

const MockTemplate: ComponentStory<typeof PostList> = () => <PostList />;

export const MockedSuccess = MockTemplate.bind({});

export const MockedError = MockTemplate.bind({});
MockedError.parameters = {
  msw: {
    handlers: [
      rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
        return res(ctx.delay(800), ctx.status(403));
      }),
    ],
  },
};
