export const popularTag = [
  {
    tagId: 1,
    name: "무",
    categoryName: "sample",
    viewCount: 3,
  },
  {
    tagId: 2,
    name: "무한",
    categoryName: "sample",
    viewCount: 3,
  },
  {
    tagId: 3,
    name: "무한도",
    categoryName: "sample",
    viewCount: 3,
  },
  {
    tagId: 4,
    name: "무한도전",
    categoryName: "sample",
    viewCount: 3,
  },
  {
    tagId: 5,
    name: "무한도전전전전",
    categoryName: "sample",
    viewCount: 3,
  },
  {
    tagId: 6,
    name: "무한도전전전전전전전전",
    categoryName: "sample",
    viewCount: 3,
  },
  {
    tagId: 7,
    name: "무한도전전전전전전전전",
    categoryName: "sample",
    viewCount: 3,
  },
];

export const mainCategories = [
  {
    mainCategoryId: 1,
    name: "사용자",
    icon: "https://raw.githubusercontent.com/toss/tossface/cec7ea0420b7f17d6f546fd7359da9bd4cb3315c/dist/svg/u1F364.svg",
    priority: 100,
    hasSub: true,
    categories: [
      {
        categoryId: 2,
        name: "성격",
        priority: 200,
        tags: [
          {
            tagId: 3,
            name: "거짓말쟁이",
          },
          {
            tagId: 4,
            name: "귀요미",
          },
        ],
      },
      {
        categoryId: 1,
        name: "직업",
        priority: 100,
        tags: [
          {
            tagId: 1,
            name: "개발자",
          },
          {
            tagId: 2,
            name: "디자이너",
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 2,
    name: "감정",
    icon: "https://raw.githubusercontent.com/toss/tossface/cec7ea0420b7f17d6f546fd7359da9bd4cb3315c/dist/svg/u1F364.svg",
    priority: 200,
    hasSub: true,
    categories: [
      {
        categoryId: 3,
        name: "긍정적",
        priority: 300,
        tags: [
          {
            tagId: 2,
            name: "기쁨",
          },
          {
            tagId: 3,
            name: "고마움",
            viewCount: 34,
            isFav: false,
          },
        ],
      },
      {
        categoryId: 4,
        name: "부정적",
        priority: 300,
        tags: [
          {
            tagId: 13,
            name: "미안함",
          },
          {
            tagId: 14,
            name: "짜증",
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 3,
    name: "행위",
    icon: "https://github.com/toss/tossface/blob/main/dist/svg/u1F363.svg",
    priority: 300,
    hasSub: true,
    categories: [
      {
        categoryId: 5,
        name: "행동",
        priority: 300,
        tags: [
          {
            tagId: 3,
            name: "결심할때",
          },
          {
            tagId: 12,
            name: "기다릴때",
          },
        ],
      },
      {
        categoryId: 6,
        name: "성향",
        priority: 400,
        tags: [
          {
            tagId: 3,
            name: "개발할때",
          },
          {
            tagId: 12,
            name: "더울때",
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 4,
    name: "콘텐츠",
    icon: "https://github.com/toss/tossface/blob/main/dist/svg/u1F364.svg",
    priority: 300,
    hasSub: true,

    categories: [
      {
        categoryId: 7,
        name: "애니메이션",
        priority: 500,
        tags: [
          {
            tagId: 2,
            name: "핀과 제이크",
          },
        ],
      },
      {
        categoryId: 8,
        name: "예능",
        priority: 500,
        tags: [
          {
            tagId: 3,
            name: "런닝맨",
          },
          {
            tagId: 12,
            name: "무한도전",
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 5,
    name: "캐릭터",
    icon: "https://raw.githubusercontent.com/toss/tossface/cec7ea0420b7f17d6f546fd7359da9bd4cb3315c/dist/svg/u1F60E.svg",
    priority: 5,
    hasSub: true,
    categories: [
      {
        categoryId: 31,
        name: "인물",
        priority: 5,
        tags: [
          {
            tagId: 321,
            name: "박명수",
          },
          {
            tagId: 343,
            name: "유재석",
          },
          {
            tagId: 356,
            name: "정준하",
          },
          {
            tagId: 463,
            name: "정형돈",
          },
          {
            tagId: 355,
            name: "하하",
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 6,
    name: "기타",
    icon: "https://github.com/toss/tossface/blob/main/dist/svg/u1F365.svg",
    priority: 400,
    hasSub: false,
    categories: [
      {
        categoryId: 9,
        name: "기타",
        priority: 500,
        tags: [
          {
            tagId: 2,
            name: "박명수",
          },
        ],
      },
    ],
  },
];

export const mainTags = [
  [
    {
      tagId: 384,
      name: "ISTJ",
    },
    {
      tagId: 394,
      name: "디자이너",
    },
  ],
  [
    {
      tagId: 384,
      name: "서러움",
    },
    {
      tagId: 394,
      name: "측은함",
    },
  ],
  [
    {
      tagId: 384,
      name: "거절할때",
    },
    {
      tagId: 394,
      name: "서운할때",
    },
  ],
];

export const favoriteTags = [
  {
    tagId: 321,
    name: "박명수",
    isFav: true,
  },
  {
    tagId: 322,
    name: "무한도전",
    isFav: true,
  },
];
