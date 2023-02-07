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

  // TODO Image interface 정의 필요
  image: {
    images: {
      imageId: number;
      imageUrl: string;
      imageWidth: number;
      imageHeight: number;
    }[];
    count: number;
  };

  tags?: string[];
  author?: string;
}
