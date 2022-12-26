export interface SearchResult {
  tagId: number;
  name: string;
  categoryName: string;
  viewCount: number;
}

export interface SearchKeyword {
  id: number;
  text: string;
}

export interface Meme {
  id: number;
  src: string;
  title: string;
  description: string;
  views: number;
  date: string;
}
