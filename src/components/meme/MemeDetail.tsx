import { Suspense } from "react";

import { useMemeDetailById } from "@/application/hooks/api/meme";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

interface Props {
  id?: string;
}

export const MemeDetailView = ({ id }: Props) => {
  const { views, date, title, description, src } = useMemeDetailById(id);

  return (
    <>
      <Photo className="mt-16 max-h-[70vh] min-h-[25vh] w-full rounded-15" src={src} />
      <section className="mt-10 flex flex-col gap-10">
        <div className="flex gap-14 text-label text-gray-10">
          <span>조회수 {views}</span>
          {date}
        </div>
        <div className="flex w-full items-center justify-between text-title">
          {title} <Icon name="warn" />
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-regular">{description}</p>
          <button className="text-label text-gray-10">...더보기</button>
        </div>
      </section>
    </>
  );
};

export const MemeDetail = ({ id }: Props) => (
  // FIXME replace spinner fallback
  <Suspense fallback={<span className="text-title">fallback</span>}>
    <MemeDetailView id={id} />
  </Suspense>
);
