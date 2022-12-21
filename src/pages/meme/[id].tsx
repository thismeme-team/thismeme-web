import type { NextPage } from "next";
import Image from "next/image";

import { Icon } from "@/components/common/Icon";
import { Navigation } from "@/components/common/Navigation";

const base64Blur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/Z8BAzAOZUEAQ+ESj6kXXm0AAAAASUVORK5CYII=";

// 서버 데이터 스키마에 따라 바뀔 예정
interface Meme {
  id: number;
  src: string;
  title: string;
  description: string;
  views: number;
  date: string;
}

const MOCK_MEME: Meme = {
  id: 1,
  src: "https://picsum.photos/444/200",
  title: "제목",
  description: "밈 설명 밈 설명",
  views: 1,
  date: "2022.12.22",
};

const MemeDetail: NextPage = () => {
  return (
    <>
      <Navigation page="result" />
      <div className="relative mt-16 max-h-[70vh] min-h-[25vh] w-full overflow-hidden rounded-15 [&>img]:!static">
        <Image
          fill
          priority
          alt="thumbnail"
          blurDataURL={base64Blur}
          placeholder="blur"
          src={MOCK_MEME.src}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <section className="mt-10 flex flex-col gap-10">
        <div className="flex gap-14 text-label text-gray-10">
          <span>조회수 {MOCK_MEME.views}</span>
          {MOCK_MEME.date}
        </div>
        <div className="flex w-full items-center justify-between text-title">
          {MOCK_MEME.title} <Icon name="warn" />
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-regular">{MOCK_MEME.description}</p>
          <button className="text-label text-gray-10">...더보기</button>
        </div>
      </section>
    </>
  );
};

export default MemeDetail;
