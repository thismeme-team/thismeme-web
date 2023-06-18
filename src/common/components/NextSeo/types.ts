interface OpenGraph {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
}

interface Twitter {
  handle?: string;
  site?: string;
  cardType?: string;
}
export interface NextSeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: OpenGraph;
  twitter?: Twitter;
}
