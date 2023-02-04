import { useMemeDetailById, useToast } from "@/application/hooks";
import { PAGE_URL } from "@/application/util";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Modal } from "@/components/common/Modal";
import { Photo } from "@/components/common/Photo";
import {
  ClipboardCopyButton,
  KakaoShareButton,
  NativeShareButton,
} from "@/components/meme/MemeInfo/Button";

interface Props {
  id: string;
}
export const MemeShareModal = ({ id }: Props) => {
  const { show } = useToast();

  const {
    name,
    description,
    image: { images },
  } = useMemeDetailById(id);

  const src = images[0].imageUrl;

  const handleKakaoShare = () => show("카카오톡 공유를 완료했습니다!");
  const handleClipboardCopy = () => show("링크를 복사했습니다!");
  const handleNativeShare = () => show("공유를 완료했습니다!");

  return (
    <Modal>
      <Modal.Trigger>
        <Button className="h-52 w-52 shrink-0 rounded-10 bg-gray-900">
          <Icon color="stroke-white" name="memeShare" />
        </Button>
      </Modal.Trigger>
      <Modal.Header />
      <Photo className="h-187 w-300 py-24" src={src} />
      <div className="mb-32 flex w-full flex-col items-center gap-16">
        <ul className="flex gap-10">
          <KakaoShareButton
            resource={{
              url: PAGE_URL,
              imageUrl: src,
              title: name,
              description,
            }}
            onSuccess={handleKakaoShare}
          />
          <ClipboardCopyButton target={PAGE_URL} onSuccess={handleClipboardCopy} />
          <NativeShareButton
            text={description}
            title={name}
            url={PAGE_URL}
            onSuccess={handleNativeShare}
          />
        </ul>
        <span className="font-suit text-16-semibold-140 text-gray-900">Share this meme!</span>
      </div>
    </Modal>
  );
};
