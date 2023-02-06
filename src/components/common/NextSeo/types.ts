interface OpenGraph {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface NextSeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: OpenGraph;
}
