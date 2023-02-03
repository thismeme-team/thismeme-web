import { css } from "twin.macro";

import { useMemeDetailById, useModal, useToast } from "@/application/hooks";
import { PAGE_URL } from "@/application/util";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { ModalBase } from "@/components/common/Modal/ModalBase";
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
  const { open, onOpen, onClose } = useModal();

  const {
    name,
    description,
    image: { images },
  } = useMemeDetailById(id);

  const src = images[0].imageUrl;

  const handleKakaoShare = () => show("카카오톡 공유를 완료했습니다!");
  const handleClipboardCopy = () => show("링크를 복사했습니다!");
  const handleNativeShare = () => show("공유를 완료했습니다!");

  if (!open)
    return (
      <Button className="h-52 w-52 shrink-0 rounded-10 bg-gray-900" onClick={onOpen}>
        <Icon
          name="memeShare"
          css={css`
            path {
              stroke: white;
            }
          `}
        />
      </Button>
    );

  return (
    <>
      <Button className="h-52 w-52 shrink-0 rounded-10 bg-gray-900" onClick={onOpen}>
        <Icon name="memeShare" />
      </Button>
      <ModalBase onClose={onClose}>
        <div className="rounded-10 border border-gray-400 bg-white px-16">
          <header className="flex h-72 items-center justify-between">
            <Icon name="modalLogo" />
            <button onClick={onClose}>
              <Icon name="cancel" />
            </button>
          </header>
          <Photo className="h-187 w-300 py-24" src={src} />
          <div className="mb-32 flex w-full flex-col items-center gap-16">
            <ul className="flex gap-10">
              <KakaoShareButton
                resource={{
                  url: PAGE_URL,
                  imageUrl: src,
                  title: name,
                  description: description,
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
        </div>
      </ModalBase>
    </>
  );
};
