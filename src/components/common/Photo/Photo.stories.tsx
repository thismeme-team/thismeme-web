import type { ComponentMeta } from "@storybook/react";

import { Photo } from "@/components/common/Photo";

export default {
  title: "components/common/Photo",
  component: Photo,
} as ComponentMeta<typeof Photo>;

const IMAGE_SRC = "https://picsum.photos/100/200";

export const Default = () => (
  <>
    <h1 className="text-title">Resizeable Photo</h1>
    <h2>width: 100, height: 100</h2>
    <Photo className="h-100 w-100" src={IMAGE_SRC} />
    <hr />
    <h2>width: 100, height: 200</h2>
    <Photo className="h-200 w-100" src={IMAGE_SRC} />
  </>
);
