import { useMemeDetailById, useToast } from "@/application/hooks";
import { CURRENT_URL } from "@/application/util/url";
import { IconButton } from "@/components/common/Button";
import { Chip } from "@/components/common/Chip";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";
import { ClipboardCopyButton, MemeShareList } from "@/components/meme/MemeShare";

interface Props {
  id: string;
}

export const MemeDetail = ({ id }: Props) => {
  const { views, date, title, description, src, tags } = useMemeDetailById(id);
  const { show } = useToast();

  return (
    <>
      <Photo className="mt-16 max-h-[70vh] min-h-[25vh] w-full rounded-15" src={src} />
      <section className="mt-10 flex flex-col gap-8">
        <div className="flex items-center gap-14 text-12-regular-160 text-gray-10">
          <span>{`조회수 ${views}`}</span>
          <span>{date}</span>
        </div>
        <div className="flex w-full items-center justify-between text-20-bold-140">
          {title} <Icon name="warn" />
        </div>
        <p className="text-16-regular-130">{description}</p>
      </section>
      <MemeShareList className="w-full py-50">
        <IconButton
          as="li"
          className="bg-[#FFE812]"
          icon="kakao"
          size="medium"
          onClick={() =>
            show((id) => <span>Render Props Test {id}</span>, {
              color: "white",
            })
          }
        />
        <IconButton
          as="li"
          className="bg-light-gray-10"
          icon="download"
          size="medium"
          onClick={() => show("앨범에 저장했습니다", { icon: "cake" })}
        />
        <ClipboardCopyButton target={CURRENT_URL} />
        <IconButton as="li" className="bg-light-gray-10" icon="meatball" size="medium" />
      </MemeShareList>
      <section>
        <span className="text-16-semibold-130">태그</span>
        <ul className="mt-16 flex flex-wrap gap-8">
          {tags?.map((tag, idx) => (
            <Chip as="li" color="lightGray" key={idx} label={tag} size="medium" />
          ))}
        </ul>
      </section>
    </>
  );
};
