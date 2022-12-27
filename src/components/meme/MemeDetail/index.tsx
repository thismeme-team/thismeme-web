import { useMemeDetailById } from "@/application/hooks";
import { Chip } from "@/components/common/Chip";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";
import { MemeShareList } from "@/components/meme/MemeShare";

interface Props {
  id: string;
}

export const MemeDetail = ({ id }: Props) => {
  const { views, date, title, description, src, tags } = useMemeDetailById(id);

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
        <p className="text-regular">{description}</p>
      </section>
      <MemeShareList className="w-full py-50" />
      <section>
        <span className="text-title">태그</span>
        <ul className="mt-16 flex flex-wrap gap-8">
          {tags?.map((tag, idx) => (
            <Chip as="li" key={idx} label={tag} size="medium" type="recent" />
          ))}
        </ul>
      </section>
    </>
  );
};
