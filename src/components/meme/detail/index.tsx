import { useEllipsis, useMemeDetailById } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

interface Props {
  id: string;
}

export const MemeDetail = ({ id }: Props) => {
  const { views, date, title, description, src } = useMemeDetailById(id);

  const { ref, onToggle, isExpanded } = useEllipsis({ lineClamp: 1 });

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
        <div className={`flex w-full ${isExpanded ? "flex-wrap" : ""} items-center justify-end`}>
          <p className="text-regular" ref={ref}>
            {description}
          </p>
          <button className="shrink-0 text-label text-gray-10" onClick={onToggle}>
            {isExpanded ? "닫기" : "더보기"}
          </button>
        </div>
      </section>
    </>
  );
};
