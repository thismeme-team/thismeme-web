import type { ComponentProps } from "react";

import type { QueryClientProvider } from "@/application/queryClient";

export interface DefaultPageProps {
  hydrateState: ComponentProps<typeof QueryClientProvider>["hydrateState"];
}

export interface Meme {
  memeId: number;
  name: string;
  description: string;
  viewCount: number;
  shareCount: number;

  createdDate: string;
  modifiedDate: string;

  image: Image;

  author?: string;

  tags?: string[];
}

export interface Image {
  images: {
    imageId: number;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
  }[];
  count: number;
}
