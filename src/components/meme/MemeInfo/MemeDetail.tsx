import { useMemeDetailById } from "@/application/hooks";
import { Photo } from "@/components/common/Photo";
import { MemeExport } from "@/components/meme/MemeInfo/DropDown/MemeExport";

interface Props {
  id: string;
}

export const MemeDetail = ({ id }: Props) => {
  const {
    viewCount,
    createdDate,
    shareCount,
    name,
    description,
    image: { images },
  } = useMemeDetailById(id);

  const { imageUrl, imageWidth, imageHeight } = images[0];

  return (
    <article>
      <section className="relative mt-10 flex flex-col gap-8">
        <Photo
          className="max-h-[70vh] min-h-[25vh] w-full rounded-15"
          height={imageHeight}
          src={imageUrl}
          width={imageWidth}
        />
        <div className="absolute right-16 top-16">
          <MemeExport id={id} />
        </div>
        <div className="flex items-center justify-between pt-4 pb-16 text-12-bold-160 text-gray-500">
          <span>{createdDate.split("T")[0]}</span>
          <span className="flex gap-15">
            <span>{`조회수 ${viewCount}`}</span>
            <span>{`공유 ${shareCount}`}</span>
          </span>
        </div>
      </section>
      <section className="mb-16 font-suit">
        {name && <h1 className="py-16 text-22-bold-140">{name}</h1>}
        {description && <p className="text-16-regular-140">{description}</p>}
      </section>
    </article>
  );
};
