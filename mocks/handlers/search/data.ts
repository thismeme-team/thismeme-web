export const tags = [
  ...new Array(5).fill(null).map(() => ({
    tagId: Math.random().toString(36).slice(2),
    name: "무",
    categoryName: "예능",
    viewCount: Math.round(Math.random() * 10),
  })),
  ...new Array(5).fill(null).map(() => ({
    tagId: Math.random().toString(36).slice(2),
    name: "무한",
    categoryName: "예능",
    viewCount: Math.round(Math.random() * 10),
  })),
  ...new Array(5).fill(null).map(() => ({
    tagId: Math.random().toString(36).slice(2),
    name: "무한도",
    categoryName: "예능",
    viewCount: Math.round(Math.random() * 10),
  })),
  ...new Array(10).fill(null).map(() => ({
    tagId: Math.random().toString(36).slice(2),
    name: "무한도전",
    categoryName: "예능",
    viewCount: Math.round(Math.random() * 10),
  })),
  ...new Array(10).fill(null).map(() => ({
    tagId: Math.random().toString(36).slice(2),
    name: "박명수",
    categoryName: "인물",
    viewCount: Math.round(Math.random() * 10),
  })),
  ...new Array(10).fill(null).map(() => ({
    tagId: Math.random().toString(36).slice(2),
    name: "물",
    categoryName: "인물",
    viewCount: Math.round(Math.random() * 10),
  })),
  ...new Array(10).fill(null).map(() => ({
    tagId: Math.random().toString(36).slice(2),
    name: "물통",
    categoryName: "인물",
    viewCount: Math.round(Math.random() * 10),
  })),
  ...new Array(10).fill(null).map(() => ({
    tagId: Math.random().toString(36).slice(2),
    name: "휴지",
    categoryName: "인물",
    viewCount: Math.round(Math.random() * 10),
  })),
];

const sampleImages = [
  // NOTE: ErrorBoundary 에서 잡음
  /*{ url: "https://picsum.photos/..400/700", width: 400, height: 700 },*/
  // NOTE: 정상 이미지
  { url: "https://picsum.photos/400", width: 400, height: 400 },
  { url: "https://picsum.photos/200/300", width: 200, height: 300 },
  { url: "https://picsum.photos/500/200", width: 500, height: 200 },
  { url: "https://picsum.photos/500/400", width: 500, height: 400 },
  { url: "https://picsum.photos/700/400", width: 700, height: 400 },
  { url: "https://picsum.photos/235/294", width: 235, height: 294 },
  { url: "https://picsum.photos/236/354", width: 236, height: 354 },
];

const sampleTags = ["무한도전", "도전", "무한", "박명수", "유재석", "명수", "재석", "예시"];

export const memes = Array.from(Array(1024).keys()).map((id) => {
  const randomIndex = Math.floor(Math.random() * sampleImages.length);
  const { url, width, height } = sampleImages[randomIndex];
  const randomTags = sampleTags.filter(() => Math.random() > 0.5);
  return {
    memeId: id,
    name: "무난한도전",
    description: "무난한도전 무난한도전 무난한 무난한도전 무난한도전",
    viewCount: 132,
    shareCount: 1000,
    createdDate: new Date().toString(),
    modifiedDate: new Date().toString(),
    image: {
      images: [
        {
          imageId: 1,
          imageUrl: url,
          imageWidth: width,
          imageHeight: height,
        },
      ],
      count: 1,
    },
    tags: randomTags,
  };
});
