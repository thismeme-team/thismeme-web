import Link from "next/link";
import type { HTMLAttributes, LiHTMLAttributes } from "react";

import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

const image1URL = "https://picsum.photos/400";
const image2URL = "https://picsum.photos/300/200";
const image3URL = "https://picsum.photos/1600/400";
const image4URL = "https://picsum.photos/500/200";
const memeList = [
  {
    id: 1,
    src: image1URL,
    title: "제목",
    description: "밈 설명 밈 설명".repeat(10),
    views: 1,
    date: "2022.12.22",
  },
  {
    id: 2,
    src: image2URL,
    title: "제목",
    description: "밈 설명 밈 설명".repeat(10),
    views: 1,
    date: "2022.12.22",
  },
  {
    id: 3,
    src: image3URL,
    title: "제목",
    description: "밈 설명 밈 설명".repeat(10),
    views: 1,
    date: "2022.12.22",
  },
  {
    id: 10,
    src: image1URL,
    title: "제목",
    description: "밈 설명 밈 설명".repeat(10),
    views: 1,
    date: "2022.12.22",
  },
  {
    id: 20,
    src: image2URL,
    title: "제목",
    description: "밈 설명 밈 설명".repeat(10),
    views: 1,
    date: "2022.12.22",
  },
  {
    id: 30,
    src: image3URL,
    title: "제목",
    description: "밈 설명 밈 설명".repeat(10),
    views: 1,
    date: "2022.12.22",
  },
  {
    id: 4,
    src: image4URL,
    title: "제목",
    description: "밈 설명 밈 설명".repeat(10),
    views: 1,
    date: "2022.12.22",
  },
  {
    id: 5,
    src: image1URL,
    title: "제목",
    description: "밈 설명 밈 설명".repeat(10),
    views: 1,
    date: "2022.12.22",
  },
];
interface MemeItemProps extends LiHTMLAttributes<HTMLLIElement> {
  meme: any;
}
export const MemeItem = (props: MemeItemProps) => {
  return (
    <li>
      <Link className="mb-9 flex break-inside-avoid flex-col gap-6" href={`/meme/${props.meme.id}`}>
        <Photo className="rounded-15" src={props.meme.src} />
        <div className="flex items-center justify-between">
          <span>{props.meme.id}밈 제목</span>
          <span className="flex items-center">
            <Icon name="memeShare" />
            공유수
          </span>
        </div>
      </Link>
    </li>
  );
};

type MemeListProps = HTMLAttributes<HTMLUListElement>;
export const MemeList = (props: MemeListProps) => {
  //   const { memeList } = useFetchMemeList();

  return (
    <ul className="columns-3xs gap-x-16">
      {memeList.map((meme) => (
        <MemeItem key={meme.id} meme={meme} />
      ))}
    </ul>
  );
};
