import { useMemeDetailById, useToast } from "@/application/hooks";
import { PAGE_URL } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

import { ClipboardCopyButton, DownloadButton, KakaoShareButton, NativeShareButton } from "./Button";

interface Props {
  id: string;
}

export const MemeDetail = ({ id }: Props) => {
  const {
    viewCount,
    createdDate,
    name,
    description,
    image: { images },
  } = useMemeDetailById(id);

  const { show } = useToast();

  const { imageUrl: src, imageWidth: width, imageHeight: height } = images[0];

  const handleKakaoShare = () => show("카카오톡 공유를 완료했습니다!");
  const handleClipboardCopy = () => show("링크를 복사했습니다!");
  const handleDownload = () => show("이미지를 다운로드 했습니다!");

  // TODO 따로 공유 토스트는 없는 듯? 담기 핸들러로 대체 예정
  const handleNativeShare = () => show("콜렉션에 저장했습니다!");

  return (
    <article>
      <Photo
        className="mt-16 max-h-[70vh] min-h-[25vh] w-full rounded-15"
        height={height}
        src={src}
        width={width}
      />
      <section className="mt-10 flex flex-col gap-8">
        <div className="flex items-center gap-14 text-12-regular-160 text-gray-10">
          <span>{`조회수 ${viewCount}`}</span>
          <span>{createdDate.split("T")[0]}</span>
        </div>
        <div className="flex w-full items-center justify-between text-20-bold-140">
          {name} <Icon name="warn" />
        </div>
        <p className="text-16-regular-130">{description}</p>
      </section>

      <div className="flex w-full flex-col items-center gap-16 py-50">
        <ul className="flex gap-10">
          <KakaoShareButton
            resource={{ url: PAGE_URL, imageUrl: src, title: name, description }}
            onSuccess={handleKakaoShare}
          />
          <DownloadButton name={name} target={src} onSuccess={handleDownload} />
          <ClipboardCopyButton target={PAGE_URL} onSuccess={handleClipboardCopy} />
          <NativeShareButton
            text={description}
            title={name}
            url={PAGE_URL}
            onSuccess={handleNativeShare}
          />
        </ul>
        <span className="text-16-semibold-130 text-dark-gray-20">친구에게 밈을 공유해 보세요</span>
      </div>
    </article>
  );
};
