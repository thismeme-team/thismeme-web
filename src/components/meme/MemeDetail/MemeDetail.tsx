import { useMemeDetailById, useToast } from "@/application/hooks";
import { PAGE_URL } from "@/application/util";
import { IconButton } from "@/components/common/Button";
import { Chip } from "@/components/common/Chip";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";
import {
  ClipboardCopyButton,
  DownloadButton,
  KakaoShareButton,
  MemeShareList,
} from "@/components/meme/MemeShare";

interface Props {
  id: string;
}

export const MemeDetail = ({ id }: Props) => {
  const { views, date, title, description, src, tags } = useMemeDetailById(id);
  const { show } = useToast();

  const handleShare = () => show("카카오톡 공유");
  const handleClipboardCopy = () => show("링크가 복사되었습니다", { icon: "share" });
  const handleDownload = () => show("앨범에 저장하였습니다", { icon: "cake" });

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
        <KakaoShareButton
          resource={{ url: PAGE_URL, imageUrl: src, title, description }}
          onSuccess={handleShare}
        />
        <DownloadButton name={title} target={src} onSuccess={handleDownload} />
        <ClipboardCopyButton target={PAGE_URL} onSuccess={handleClipboardCopy} />
        <IconButton as="li" className="bg-light-gray-10" icon="meatball" size="medium" />
      </MemeShareList>
      <section>
        <span className="text-16-semibold-130">태그</span>
        <ul className="mt-16 flex flex-wrap gap-8">
          {tags.map((tag, idx) => (
            <Chip as="li" color="lightGray" key={idx} label={tag} size="medium" />
          ))}
        </ul>
      </section>
    </>
  );
};
