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

export interface Image {
  images: {
    imageId: number;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
  }[];
  count: number;
}
